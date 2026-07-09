import { useEffect, useState } from "react";

type SaleRow = {
  purchase_price?: number | string;
};

export default function Sample() {
  const [price, setPrice] = useState("");
  const [prices, setPrices] = useState<number[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/api/sales")
      .then((res) => res.json())
      .then((data: SaleRow[]) => {
        const values = data.map((row) => Number(row.purchase_price ?? 0));
        setPrices(values);

        if (values.length > 0) {
          setPrice(String(values[0]));
        }
      })
      .catch((err) => {
        console.error("sales fetch error:", err);
      });
  }, []);

  return (
    <div>
      <h3>テスト画面</h3>
      <input
        type="number"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        placeholder="仕入れ価格を表示"
      />
      <p>取得した価格一覧: {prices.length > 0 ? prices.join(", ") : "なし"}</p>
    </div>
  );
}
