import express from "express";
import cors from "cors";
import { Pool } from "pg";

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "ProductManagement",
});

app.get("/", (req, res) => {
  res.send("Hello");
});



app.post("/api/insert", async (req, res) => {
  try {
    // リクエストボディからデータを取得（idを自動生成）
    const { ManagementNumber, platform, PurchaseDate, ProductName, PurchasePrice } = req.body;
    // データベースに挿入する処理
    await pool.query(
        //(INSERT：DBカラム名と一致させる、$1,$2,$3,$4,$5はおなじ順番で値をセットする)
        "INSERT INTO productlist (management_no, purchase_store, purchase_date, product_name, purchase_price) VALUES ($1, $2, $3, $4, $5)",
        // 送信するデータを配列としてまとめる：上記＄1,$2,$3,$4,$5の順番で値をセットする
        // DBカラム名の配列に対して、1番目（$1）にフロントで定義しているidの値をセットする
        [ManagementNumber, platform, PurchaseDate, ProductName, PurchasePrice]);
    res.json({ ok: true });
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "DB挿入エラー" });
  }
});

app.listen(3001, () => {
  console.log("API server running on http:purchase_store//localhost:3001");
});

