import type { VercelRequest, VercelResponse } from "@vercel/node";
import bs58 from "bs58";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, publicKey } from "@metaplex-foundation/umi";
import { mplBubblegum, mintV2 } from "@metaplex-foundation/mpl-bubblegum";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

    const rpc = process.env.SOLANA_RPC_MAINNET;
    const secret = process.env.MINT_AUTHORITY_SECRET;
    const treeAddr = process.env.CNFT_TREE_ADDRESS;

    if (!rpc) return res.status(500).json({ error: "Missing SOLANA_RPC_MAINNET" });
    if (!secret) return res.status(500).json({ error: "Missing MINT_AUTHORITY_SECRET" });
    if (!treeAddr) return res.status(500).json({ error: "Missing CNFT_TREE_ADDRESS" });

    const { owner, metadataUri, name } = req.body || {};
    if (!owner || !metadataUri) return res.status(400).json({ error: "Missing owner/metadataUri" });

    const umi = createUmi(rpc).use(mplBubblegum());

    // Fix: createKeypairFromSecretKey expects Uint8Array, bs58.decode returns Uint8Array
    const kp = umi.eddsa.createKeypairFromSecretKey(bs58.decode(secret));
    umi.use(keypairIdentity(kp));

    const builder = mintV2(umi, {
      leafOwner: publicKey(owner),
      merkleTree: publicKey(treeAddr),
      metadata: {
        name: name || "Pixel Mint",
        uri: metadataUri,
        symbol: "PXMT",
        sellerFeeBasisPoints: 0,
        creators: [{ address: kp.publicKey, verified: true, share: 100 }],
        collection: null, // explicit null if no collection for now
        isMutable: true,
      },
    });

    const tx = await builder.buildAndSign(umi);
    const b64 = Buffer.from(umi.transactions.serialize(tx)).toString("base64");

    return res.status(200).json({ tx: b64 });
  } catch (e: any) {
    return res.status(500).json({ error: e?.message || String(e) });
  }
}
