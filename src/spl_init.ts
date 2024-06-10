import { Connection, clusterApiUrl, Keypair } from "@solana/web3.js";
import { createMint } from "@solana/spl-token";
import * as fs from "fs";
import * as path from "path";

const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(fs.readFileSync(path.join(__dirname, "..", "keypair.json"), "utf-8")))
);

const connection = new Connection(clusterApiUrl("devnet"));

(async () => {
  const mint = await createMint(
    connection,
    keypair,
    keypair.publicKey,
    null,
    6
  );

  fs.writeFileSync("./mint.json", JSON.stringify(mint.toJSON()));
  console.log("Mint Address:", mint.toBase58());
})();