import fs from "fs";
import db from "./data.json" assert { type: "json" };

// const db = getDb();

fs.mkdir("./dist/db", () => {
  for (let [key, value] of Object.entries(db)) {
    fs.writeFile(`./dist/db/${key}.json`, JSON.stringify(value), (err) => {
      if (err) throw err;
    });
  }
});
