import { useState } from 'react';

function App() {
  // 数字か空文字を入れる部屋にする（初期値は空文字）
  const [num, setNum] = useState<number | "">("");

  return (
    <div>
      <input type="number" value={num} onChange={(e) => setNum(Number(e.target.value))} />
      <span>{num}</span>
    </div>
  );
}

export default App;