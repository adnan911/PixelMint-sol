import fs from 'fs';
import { Keypair } from '@solana/web3.js';
import bs58 from 'bs58';

// Generate new keypair
const keypair = Keypair.generate();

// Save as JSON array (standard Solana format)
const secretKey = Array.from(keypair.secretKey);
fs.writeFileSync('mint-authority.json', JSON.stringify(secretKey));

console.log('Mint Authority Keypair generated!');
console.log('Public Key:', keypair.publicKey.toBase58());
console.log('Private Key (Base58):', bs58.encode(keypair.secretKey));
