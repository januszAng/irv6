import { createElement as ce, useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  return ce(
    "div",
    null,
    ce("h1", null, "Hello Frontend Master"),
    ce("p", null, "this is ssr"),
    ce("button", { onClick: () => setCount(count + 1) }, `Count: ${count}`),
  );
}

export default App;
