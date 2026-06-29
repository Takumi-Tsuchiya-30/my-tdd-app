import { useState } from 'react';

function App() {
  const [num, setNum] = useState<number | "">("");
  const [num2, setNum2] = useState<number | "">("");
  const [num3, setNum3] = useState<number | "">("");
  const [platform, setPlatform] = useState<string>("store");
  const [date, setDate] = useState<string>("");
  const [text, setText] = useState<string>(""); 

  const handleSum = () => {
  const a = Number(num);
  const b = Number(num2);
  setNum3(a + b);
  };

  return (
    <div>
      {/* プラットフォーム表示 */}
      <label htmlFor="Platform">プラットフォーム：</label>
      <select value={platform} onChange={(e) => setPlatform(e.target.value)}>
        <option value="merucari">メルカリ</option>
        <option value="yafuoku">ヤフオク</option>
        <option value="yafu-furima">ヤフーフリマ</option>
        <option value="amazon">Amazon</option>
        <option value="rakuma">ラクマ</option>
      </select>

      {/* 仕入れ日表示 */}
      <label htmlFor="PurchaseDate">仕入れ日：</label>
      <input
        id="PurchaseDate"
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      
      {/* 仕入れ価格表示 */}
      <label htmlFor="PurchasePrice">仕入れ価格：</label>
      <input
        id="PurchasePrice"
        type="number"
        value={num2}
        placeholder="0"
        onChange={(e) => setNum2(Number(e.target.value))}
      />

      {/* 商品名表示 */}
      <label htmlFor="ProductName">商品名：</label>
      <input
        id="ProductName"
        type="text"
        value={text}
        placeholder="商品名"
        onChange={(e) => setText(e.target.value)}
      />

      {/* 販売価格表示 */}
      <label htmlFor="SalesPrice">販売価格：</label>
      <input
        id="SalesPrice"
        type="number"
        value={num}
        placeholder="0"
        onChange={(e) => setNum(Number(e.target.value))}
      />
      


      {/* 合計表示 */}
      <label htmlFor="TotalPrice">合計：</label>
      <input
        id="TotalPrice"
        type="number"
        value={num3}
        placeholder="合計"
        readOnly
      />
      <button onClick={handleSum}>合計する</button>

      <div>日付: {date}</div>
      <div>プラットフォーム: {platform}</div>
      <div>テキスト: {text}</div>
      <div>1つ目: {num}</div>
      <div>2つ目: {num2}</div>
      <div>3つ目: {num3}</div>
    </div>
  );
}

export default App;