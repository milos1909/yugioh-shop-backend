import axios from "axios";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yugioh_shop"
}) ;

const response = await axios.get(
  "https://db.ygoprodeck.com/api/v7/cardsets.php"
);

const cardSets = response.data;

for (const set of cardSets) {
  await db.execute(
    `
    INSERT INTO \`set\`
      (set_code, set_name, num_of_cards, tcg_date, set_image)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      num_of_cards = VALUES(num_of_cards),
      tcg_date = VALUES(tcg_date)
    `,
    [
      set.set_code,
      set.set_name,
      set.num_of_cards,
      set.tcg_date || null
    ]
  );
}

console.log("Card sets imported successfully");

await db.end();