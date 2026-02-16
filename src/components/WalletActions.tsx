import React, { useMemo, useState } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

function short(s: string) {
  return s.slice(0, 4) + "…" + s.slice(-4);
}

export function WalletActions() {
  const { connection } = useConnection();
  const wallet = useWallet();
  const [status, setStatus] = useState<string>("");

  const pubkey = wallet.publicKey?.toBase58();

  const canSignMessage = !!wallet.signMessage && !!wallet.publicKey;
  const canSendTx = !!wallet.sendTransaction && !!wallet.publicKey;

  const domain = useMemo(() => window.location.host, []);

  async function handleLoginSignMessage() {
    try {
      setStatus("Preparing message…");
      if (!wallet.publicKey) throw new Error("Wallet not connected");
      if (!wallet.signMessage) throw new Error("Wallet does not support signMessage");

      const nonce = crypto.randomUUID();
      const message =
        `Pixel Mint Login\n\n` +
        `Domain: ${domain}\n` +
        `Wallet: ${wallet.publicKey.toBase58()}\n` +
        `Nonce: ${nonce}\n` +
        `Time: ${new Date().toISOString()}`;

      const encoded = new TextEncoder().encode(message);
      setStatus("Signing message in wallet…");
      const signature = await wallet.signMessage(encoded);

      // Store locally for now (Step 5 can verify on backend)
      const payload = {
        wallet: wallet.publicKey.toBase58(),
        message,
        signature: Array.from(signature),
        nonce,
      };
      localStorage.setItem("pixelmint_login", JSON.stringify(payload));

      setStatus(`✅ Signed. Saved login proof for ${short(payload.wallet)}.`);
      console.log("Login payload:", payload);
    } catch (e: any) {
      setStatus(`❌ ${e?.message || String(e)}`);
    }
  }

  async function handleSendTestTx() {
    try {
      setStatus("Preparing transaction…");
      if (!wallet.publicKey) throw new Error("Wallet not connected");
      if (!wallet.sendTransaction) throw new Error("Wallet cannot send transactions");

      // 0-lamport self-transfer: exercises signing & sending without moving funds
      const ix = SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: wallet.publicKey,
        lamports: 0,
      });

      const tx = new Transaction().add(ix);
      tx.feePayer = wallet.publicKey;

      setStatus("Requesting signature & sending…");
      const sig = await wallet.sendTransaction(tx, connection);

      setStatus("Confirming on-chain…");
      const latest = await connection.getLatestBlockhash();
      await connection.confirmTransaction(
        { signature: sig, ...latest },
        "confirmed"
      );

      setStatus(`✅ Confirmed: ${sig}`);
      console.log("Test tx signature:", sig);
    } catch (e: any) {
      setStatus(`❌ ${e?.message || String(e)}`);
    }
  }

  return (
    <div style={{ display: "grid", gap: 10, maxWidth: 520 }}>
      <div style={{ fontSize: 12, opacity: 0.8 }}>
        Connected: {pubkey ? short(pubkey) : "No"}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <button
          onClick={handleLoginSignMessage}
          disabled={!canSignMessage}
          style={{ padding: "10px 12px", borderRadius: 10 }}
        >
          Login (Sign Message)
        </button>

        <button
          onClick={handleSendTestTx}
          disabled={!canSendTx}
          style={{ padding: "10px 12px", borderRadius: 10 }}
        >
          Test Tx (0 SOL)
        </button>
      </div>

      {status ? (
        <div style={{ fontSize: 13, whiteSpace: "pre-wrap" }}>{status}</div>
      ) : null}
    </div>
  );
}
