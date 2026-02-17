import { Keypair } from '@solana/web3.js';
import fs from 'fs';

const keypair = Keypair.generate();
fs.writeFileSync('mint-authority.json', JSON.stringify(Array.from(keypair.secretKey)));
const pubkey = keypair.publicKey.toString();
console.log('Public Key:', pubkey);
fs.writeFileSync('mint-authority-pubkey.txt', pubkey);
