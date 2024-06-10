import { Keypair } from "@solana/web3.js";
import * as fs from "fs";

const keypair = Keypair.generate();

// Converti la chiave privata in un array di byte
const secretKeyBytes = Array.from(keypair.secretKey);

// Scrivi l'array di byte nel file keypair.json
fs.writeFileSync("./keypair.json", JSON.stringify(secretKeyBytes));
