import React from "react";
import ReactDOM from "react-dom/client";
import App from "./chat1/App";
const Index = () => {
  return <div>

    <App/>
  </div>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
