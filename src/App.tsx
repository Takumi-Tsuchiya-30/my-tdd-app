import { useEffect, useState } from "react";
import "./App.css";
import Sample from "./Pages/test.tsx";

type Tab = "register" | "inventory" | "test";

function App() {
  const [managementNumber, setManagementNumber] = useState<string>("");
  const [date, setDate] = useState(() => new Date().toISOString().slice(0, 10));
  const [platform, setPlatform] = useState<string>("KinbleMiyoshi");
  const [productName, setProductName] = useState<string>("");
  const [pricenum, setPriceNum] = useState<number | "">("");
  const [stores, setStores] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("register");

  useEffect(() => {
    fetch("http://localhost:3001/api/stores")
      .then((res) => res.json())
      .then((data: string[]) => {
        setStores(data);
        if (data.length > 0) {
          setPlatform(data[0]);
        }
      })
      .catch((err) => {
        console.error("stores fetch error:", err);
      });
  }, []);

  //DB登録
  const handleSubmit = async () => {
    await fetch("http://localhost:3001/api/insert", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // 送信するデータをオブジェクトとしてまとめる
        //id: valueのセット
        ManagementNumber: managementNumber,
        PurchaseDate: date,
        platform: platform,
        ProductName: productName,
        PurchasePrice: pricenum,
      }),
    });
  };
  return (
    <div>
      {activeTab === "test" ? (
        <Sample />
      ) : (
        <div className="form-group">
          <h4>商品登録</h4>
          <div className="input-container">
            {/* 商品管理番号 */}
            <label htmlFor="ManagementNumber">管理No：</label>
            <input
              id="ManagementNumber"
              type="text"
              value={managementNumber}
              placeholder="管理No"
              onChange={(e) => setManagementNumber(e.target.value)}
            />
          </div>
          {/* 仕入れ日表示 */}
          <div className="input-container">
            <label htmlFor="PurchaseDate">仕入れ日：</label>
            <input
              id="PurchaseDate"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          {/* 商品名表示 */}
          <div className="input-container">
            <label htmlFor="ProductName">商品名：</label>
            <input
              id="ProductName"
              type="text"
              value={productName}
              placeholder="商品名"
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          {/* 仕入れ価格表示 */}
          <div className="input-container">
            <label htmlFor="PurchasePrice">仕入れ価格：</label>
            <input
              id="PurchasePrice"
              type="number"
              value={pricenum}
              placeholder="0"
              onChange={(e) => setPriceNum(Number(e.target.value))}
            />
          </div>
          {/* 購入店表示 */}
          <div className="input-container">
            <label htmlFor="Platform">購入店：</label>
            <select
              value={platform}
              onChange={(e) => setPlatform(e.target.value)}
            >
              {stores.map((store) => (
                <option key={store} value={store}>
                  {store}
                </option>
              ))}
            </select>
          </div>
          <button className="Submit-button" onClick={handleSubmit}>
            登録
          </button>
          <nav className="global-nav">
            <button onClick={() => setActiveTab("register")}>新規登録</button>
            <button onClick={() => setActiveTab("inventory")}>在庫編集</button>
            <button onClick={() => setActiveTab("test")}>テスト</button>
          </nav>
          );
          {/* ここから下は表示用のコード*/}
          <div>日付: {date}</div>
          <div>テキスト: {productName}</div>
        </div>
      )}
    </div>
  );
}

export default App;
