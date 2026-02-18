import bs58 from "bs58";
import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import {
  generateSigner,
  publicKey,
  sol,
  transactionBuilder,
  type PublicKey,
} from "@metaplex-foundation/umi";
import { walletAdapterIdentity } from "@metaplex-foundation/umi-signer-wallet-adapters";
import { mplCore, create } from "@metaplex-foundation/mpl-core";
import { transferSol } from "@metaplex-foundation/mpl-toolbox";

type UploadResp = { ipfsUrl: string; cid?: string; gatewayUrl?: string };

const MAINTENANCE_FEE_SOL = 0.0015;

function mustEnv(name: string) {
  const v = import.meta.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return String(v);
}

export async function mintStandardNftWithFee(params: {
  wallet: any; // from useWallet()
  ownerBase58: string;
  name: string;
  description: string;
  imagePngBase64: string; // WITHOUT "data:image/png;base64,"
  attributes?: Array<{ trait_type: string; value: string }>;
}) {
  const rpc = mustEnv("VITE_SOLANA_RPC_URL");
  const treasury = mustEnv("VITE_TREASURY_PUBKEY");
  const treasuryPk = publicKey(treasury);

  // 1) Upload PNG to Pinata (server)
  const imgUp: UploadResp = await fetch("/api/upload-to-pinata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileBase64: params.imagePngBase64,
      fileName: `pixelmint-${Date.now()}.png`,
      contentType: "image/png",
    }),
  }).then(async (r) => {
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "Pinata image upload failed");
    return j;
  });

  // 2) Upload metadata JSON to Pinata (server)
  const metadata = {
    name: params.name,
    description: params.description,
    image: imgUp.ipfsUrl,
    attributes: params.attributes ?? [],
  };

  const metaBase64 = btoa(unescape(encodeURIComponent(JSON.stringify(metadata))));
  const metaUp: UploadResp = await fetch("/api/upload-to-pinata", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      fileBase64: metaBase64,
      fileName: `pixelmint-${Date.now()}.json`,
      contentType: "application/json",
    }),
  }).then(async (r) => {
    const j = await r.json().catch(() => ({}));
    if (!r.ok) throw new Error(j?.error || "Pinata metadata upload failed");
    return j;
  });

  // 3) Build tx: (A) your fee transfer + (B) Core mint
  const umi = createUmi(rpc)
    .use(walletAdapterIdentity(params.wallet))
    .use(mplCore());

  const asset = generateSigner(umi);
  const ownerPk: PublicKey = publicKey(params.ownerBase58);

  const builder = transactionBuilder()
    .add(
      transferSol(umi, {
        source: umi.identity,
        destination: treasuryPk,
        amount: sol(MAINTENANCE_FEE_SOL),
      })
    )
    .add(
      create(umi, {
        asset,
        name: params.name,
        uri: metaUp.ipfsUrl,
        owner: ownerPk,
      })
    );

  const result = await builder.sendAndConfirm(umi, {
    confirm: { commitment: "finalized" },
  });

  return {
    assetAddress: asset.publicKey.toString(),
    signature: bs58.encode(result.signature),
    imageIpfs: imgUp.ipfsUrl,
    metadataIpfs: metaUp.ipfsUrl,
    treasury,
    maintenanceFeeSol: MAINTENANCE_FEE_SOL,
  };
}
