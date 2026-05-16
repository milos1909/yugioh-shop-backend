import axios from "axios";
import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "yu-gi-oh"
}) ;

const response = await axios.get(
  "https://db.ygoprodeck.com/api/v7/cardsets.php"
);

const cardSets = response.data;

for (const set of cardSets) {
  await db.execute(
    `
    INSERT INTO card_set
      (set_name, set_code, num_of_cards, tcg_date, set_image)
    VALUES (?, ?, ?, ?, ?)
    ON DUPLICATE KEY UPDATE
      set_name = VALUES(set_name),
      num_of_cards = VALUES(num_of_cards),
      tcg_date = VALUES(tcg_date),
      set_image = VALUES(set_image)
    `,
    [
      set.set_name,
      set.set_code,
      set.num_of_cards,
      set.tcg_date || null,
      set.set_image || null
    ]
  );
}

console.log("Card sets imported successfully");

await db.end();