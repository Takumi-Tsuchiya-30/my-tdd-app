import { useState } from 'react';

function App() {
  const [num, setNum] = useState<number | "">("");
  const [num2, setNum2] = useState<number | "">("");
  const [num3, setNum3] = useState<number | "">(""); // 追加の空ボックス
  

  const handleSum = () => {
  const a = Number(num);
  const b = Number(num2);
  setNum3(a + b);
  };

  return (
    <div>
      <input
        type="number"
        value={num}
        placeholder="0"
        onChange={(e) => setNum(Number(e.target.value))}
      />

      <input
        type="number"
        value={num2}
        placeholder="0"
        onChange={(e) => setNum2(Number(e.target.value))}
      />

      <input
        type="number"
        value={num3}
        placeholder="合計"
        readOnly
      />
       <button onClick={handleSum}>合計する</button>

      <div>1つ目: {num}</div>
      <div>2つ目: {num2}</div>
      <div>3つ目: {num3}</div>
    </div>
  );


export default App;