import express from "express";
import cors from "cors";
import { Pool } from "pg";

//------------------------------------
// Expressアプリケーションの作成
const app = express();
app.use(cors());
app.use(express.json());
//------------------------------------

//------------------------------------
// PostgreSQLの接続設定
const pool = new Pool({
  host: "localhost",
  port: 5432,
  user: "postgres",
  password: "postgres",
  database: "ProductManagement",
});
//------------------------------------

//------------------------------------
// ルートエンドポイントの設定
app.get("/", (req, res) => {
  res.send("Hello");
});
//------------------------------------

//------------------------------------
// 商品登録のAPIエンドポイント
app.post("/api/insert", async (req, res) => {
  try {
    // リクエストボディからデータを取得（idを自動生成）
    const {
      ManagementNumber,
      platform,
      PurchaseDate,
      ProductName,
      PurchasePrice,
    } = req.body;
    // データベースに挿入する処理
    await pool.query(
      //(INSERT：DBカラム名と一致させる、$1,$2,$3,$4,$5はおなじ順番で値をセットする)
      "INSERT INTO productlist (management_no, purchase_store, purchase_date, product_name, purchase_price) VALUES ($1, $2, $3, $4, $5)",
      // 送信するデータを配列としてまとめる：上記＄1,$2,$3,$4,$5の順番で値をセットする
      // DBカラム名の配列に対して、1番目（$1）にフロントで定義しているidの値をセットする
      [ManagementNumber, platform, PurchaseDate, ProductName, PurchasePrice],
    );
    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, error: "DB挿入エラー" });
  }
});
//------------------------------------

//------------------------------------
// 購入店の一覧を取得するAPIエンドポイント
app.get("/api/stores", async (_req, res) => {
  try {
    // データベースから購入店の一覧を取得する処理
    const result = await pool.query(
      // 購入店の一覧を取得するSQLクエリ
      "SELECT DISTINCT store_name FROM store_master ORDER BY store_name ASC",
    );
    // 取得した購入店の一覧をレスポンスとして返す
    res.json(result.rows.map((row) => row.store_name));
  } catch (error) {
    // エラーが発生した場合の処理
    res.status(500).json({ error: "取得失敗" });
  }
});
//------------------------------------

//------------------------------------
// 購入価格の一覧を取得するAPIエンドポイント
app.get("/api/sales", async (_req, res) => {
  try {
    const result = await pool.query("SELECT purchase_price FROM productlist");

    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "取得失敗" });
  }
});
//------------------------------------

//------------------------------------
// サーバーを起動する
app.listen(3001, () => {
  console.log("API server running on http://localhost:3001/api/stores");
});
//------------------------------------

app.use((req, _res, next) => {
  console.log("Request:", req.method, req.path);
  next();
});
