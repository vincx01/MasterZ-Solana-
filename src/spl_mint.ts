import { Connection, clusterApiUrl, Keypair, PublicKey } from "@solana/web3.js";
import { mintTo, getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import * as fs from "fs";
import * as path from "path";

const keypair = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(fs.readFileSync(path.join(__dirname, "..", "keypair.json"), "utf-8")))
);

const connection = new Connection(clusterApiUrl("devnet"));

const mintAddress = "5VuveU9vwvJ5w3QR4gnjh7xYeWYbQS8TvH3fseMCgrJj";
const mint = new PublicKey(mintAddress);

(async () => {
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    keypair,
    mint,
    keypair.publicKey
  );

  const ata = tokenAccount.address;
  console.log("Associated Token Account: ", ata.toBase58());

  const amount = 10e6;

  await mintTo(
    connection,
    keypair,
    mint,
    ata,
    keypair.publicKey,
    amount
  );

  console.log("Minted", amount, "to", ata.toBase58());
})();
