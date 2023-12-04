import React, { useState } from "react";
import "./App.css";
import gptLogo from "./assets/chatgpt.svg";
import addBnt from "./assets/add-30.png";
import msgIcon from "./assets/message.svg";
import home from "./assets/home.svg";
import saved from "./assets/bookmark.svg";
import rocket from "./assets/rocket.svg";
import sendBtn from "./assets/send.svg";
import userIcon from "./assets/mylogo.jpg";
import gptimglogo from "./assets/chatgptLogo.svg";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});
const App = () => {
  const [userInput, setUserInput] = useState("");
  const [history, setHistory] = useState([]);
  const [isloading, setIsloading] = useState(false);
  const handleUserInput = async () => {
    setIsloading(true);

    const userMessage = { role: "user", content: userInput };

    setHistory((prevchat) => [...prevchat, userMessage]);

    try {
      // Pass the entire chat history (including the user message) to the OpenAI API
      const chatCompletion = await openai.chat.completions.create({
        messages: [...history, userMessage],
        model: "gpt-3.5-turbo",
      });

      // Include the assistant's response in the chat history
      setHistory((prevchat) => [
        ...prevchat,
        {
          role: "assistant",
          content: chatCompletion.choices[0].message.content,
        },
      ]);
      // console.log(history);

      setUserInput("");
    } catch (error) {
      console.error("Error while interacting with OpenAI API:", error);
    }

    setIsloading(false);
  };

  return (
    <div className="App">
      <div className="sideBar">
        <div className="upperSide">
          <div className="upperSideTop">
            <img src={gptLogo} alt="" className="logo" />
            <span className="brand"> ChatGpt </span>{" "}
          </div>
          <button className="midBtn">
            <img className="addBtn" src={addBnt} alt="" />
            New Chat
          </button>

          <div className="upperSideBottom">
            <button className="query">
              <img src={msgIcon} alt="" />
              What Is Programming ?
            </button>
            <button className="query">
              <img src={msgIcon} alt="" />
              How To use Api ?
            </button>
          </div>
        </div>
        <div className="LowerSide">
          <div className="listItems">
            <img src={home} className="listItemsImg" alt="" />
            Home
          </div>
          <div className="listItems">
            <img src={saved} className="listItemsImg" alt="" />
            Saved
          </div>{" "}
          <div className="listItems">
            <img src={rocket} className="listItemsImg" alt="" />
            Upgrade To Pro
          </div>
        </div>
      </div>
      <div className="main">
      <div className="chats">
          {history.map((msg, index) => (
            <div key={index} className={`chat ${msg.role === 'assistant' ? 'bot' : ''}`}>
              <img className="chatImg" src={msg.role === 'assistant' ? gptimglogo : userIcon} alt="" />
              <div className="txt">{msg.content}</div>
            </div>
          ))}
        </div>
        <div className="chatsFooter">
          <div className="input">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              placeholder="Ask For AnyThing"
            />
            <button className="send" onClick={handleUserInput}>
              <img src={sendBtn} alt="" />
            </button>
          </div>
          <p>ChatGpt may produce ........................</p>
        </div>
      </div>
    </div>
  );
};

export default App;
