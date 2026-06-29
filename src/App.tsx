import { useState } from 'react';

function App() {
  const [managementNumber, setManagementNumber] = useState<string>(""); 
    const [date, setDate] = useState(() =>
    new Date().toISOString().slice(0, 10)
  );
  const [platform, setPlatform] = useState<string>("KinbleMiyoshi");
  const [productName, setProductName] = useState<string>("");
  const [pricenum, setPriceNum] = useState<number | "">("");
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
      PurchasePrice: pricenum
    }),
  });
};
  return (
    <div>
      {/* 商品管理番号 */}
      <label htmlFor="ManagementNumber">管理No：</label>
      <input
        id="ManagementNumber"
        type="text"
        value={managementNumber}
        placeholder="管理No"
        onChange={(e) => setManagementNumber(e.target.value)}
      />

      {/* 仕入れ日表示 */}
      <label htmlFor="PurchaseDate">仕入れ日：</label>
      <input
        id="PurchaseDate"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />

      {/* 購入店表示 */}
      <label htmlFor="Platform">購入店：</label>
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="KinbleMiyoshi">キンブル三好</option>
        <option value="KinbleOob">キンブル大府</option>
      </select>

      {/* 商品名表示 */}
      <label htmlFor="ProductName">商品名：</label>
      <input
        id="ProductName"
        type="text"
        value={productName}
        placeholder="商品名"
        onChange={(e) => setProductName(e.target.value)}
      />
      
      {/* 仕入れ価格表示 */}
      <label htmlFor="PurchasePrice">仕入れ価格：</label>
      <input
        id="PurchasePrice"
        type="number"
        value={pricenum}
        placeholder="0"
        onChange={(e) => setPriceNum(Number(e.target.value))}
      />

      <button onClick={handleSubmit}>DB登録</button>


 

      <div>日付: {date}</div>
      <div>テキスト: {productName}</div>
    </div>
  );
}

export default App;