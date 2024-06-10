import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import * as fs from "fs";
import * as path from "path";

const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(fs.readFileSync(path.join(__dirname, "..", "keypair.json"), "utf-8")))
);

const connection = new Connection(clusterApiUrl("devnet"));

(async () => {
  try {
    const airdropSignature = await connection.requestAirdrop(
      keypair.publicKey,
      2 * 10 ** 9
    );
    console.log(`Airdrop transaction signature: ${airdropSignature}`);
  } catch (err) {
    console.log(err);
  }
})();
