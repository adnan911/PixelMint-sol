import { createUmi } from "@metaplex-foundation/umi-bundle-defaults";
import { keypairIdentity, publicKey } from "@metaplex-foundation/umi";
import { createTree, mplBubblegum } from "@metaplex-foundation/mpl-bubblegum";
import { Connection, Keypair } from "@solana/web3.js";
import fs from "fs";
import bs58 from "bs58";

// Mainnet RPC
const RPC_URL = "https://api.mainnet-beta.solana.com";

async function main() {
  console.log("Initializing Umi...");
  const umi = createUmi(RPC_URL).use(mplBubblegum());

  // Load Authority
  const secret = new Uint8Array(JSON.parse(fs.readFileSync("mint-authority.json", "utf-8")));
  const keypair = umi.eddsa.createKeypairFromSecretKey(secret);
  umi.use(keypairIdentity(keypair));

  console.log("Authority:", keypair.publicKey);

  // Check Balance
  const balance = await umi.rpc.getBalance(keypair.publicKey);
  console.log("Balance:", Number(balance.basisPoints) / 1e9, "SOL");

  if (Number(balance.basisPoints) < 0.05 * 1e9) {
    console.error("❌ Insufficient balance! Please fund the wallet with at least 0.05 SOL.");
    process.exit(1);
  }

  console.log("Creating Merkle Tree...");
  
  // Create Tree Logic
  // Using generic "Bubblegum" default parameters for a small/medium tree
  // Max Depth 14, Max Buffer 64 -> Capacity: 16,384 cNFTs
  // Cost: ~0.02 - 0.03 SOL (approx)
  
  const merkleTree = umi.eddsa.generateKeypair();
  console.log("New Merkle Tree Address:", merkleTree.publicKey);

  const builder = await createTree(umi, {
    merkleTree,
    maxDepth: 14,
    maxBufferSize: 64,
  });

  const { signature } = await builder.sendAndConfirm(umi);
  console.log("✅ Tree Created! Signature:", bs58.encode(signature));
  console.log("\n*** ACTION REQUIRED ***");
  console.log("Add this to your Vercel Environment Variables:");
  console.log("CNFT_TREE_ADDRESS=" + merkleTree.publicKey);
}

main().catch(console.error);
