import type { VercelRequest, VercelResponse } from "@vercel/node";
import FormData from "form-data";
import fetch from "node-fetch";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const jwt = process.env.PINATA_JWT;
    if (!jwt) return res.status(500).json({ error: "Missing PINATA_JWT" });

    const { fileBase64, fileName, contentType } = req.body || {};
    if (!fileBase64 || !fileName || !contentType) {
      return res.status(400).json({ error: "Missing fileBase64/fileName/contentType" });
    }

    const buf = Buffer.from(fileBase64, "base64");

    const form = new FormData();
    form.append("file", buf, { filename: fileName, contentType });
    
    // Convert metadata and options to string if they are objects, or append correctly
    // Pinata expects these as strings for the multipart/form-data
    const metadata = JSON.stringify({ name: fileName });
    form.append("pinataMetadata", metadata);
    
    const options = JSON.stringify({ cidVersion: 1 });
    form.append("pinataOptions", options);

    const r = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
        ...form.getHeaders(),
      },
      body: form as any,
    });

    const text = await r.text();
    if (!r.ok) return res.status(500).json({ error: "Pinata upload failed", details: text });

    const j = JSON.parse(text);
    return res.status(200).json({
      cid: j.IpfsHash,
      ipfsUrl: `ipfs://${j.IpfsHash}`,
      gatewayUrl: `https://gateway.pinata.cloud/ipfs/${j.IpfsHash}`,
    });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
}
