import { createContext, useState } from "react";
import runChat from "../config/gemini"; // Ensure the path is correct

export const Context = createContext();

const ContextProvider = (props) => {
  const [input, setInput] = useState("");
  const [recentPrompt, setRecentPrompt] = useState("");
  const [prevPrompts, setPrevPrompts] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [loading, setLoading] = useState(false);
  const [resultData, setResultData] = useState("");

  const delayPara = (index, nextWord) => {
    setTimeout(() => {
      setResultData((prev) => prev + nextWord);
    }, 75 * index);
  };

  const newChat = () => {
    setLoading(false);
    setShowResult(false);
  };

  const onSent = async (prompt) => {
    setResultData("");
    setLoading(true);
    setShowResult(true);

    let response;
    const activePrompt = prompt !== undefined ? prompt : input;

    if (activePrompt !== undefined) {
      setRecentPrompt(activePrompt);
      setPrevPrompts((prev) => [...prev, activePrompt]);
      response = await runChat(activePrompt);
    }

    let formattedResponse = response
      .split("**")
      .map((segment, index) => (index % 2 === 1 ? `<b>${segment}</b>` : segment))
      .join("")
      .split("*")
      .join("<br/>");

    const formattedResponseArray = formattedResponse.split("");
    formattedResponseArray.forEach((char, i) => delayPara(i, char));

    setLoading(false);
    setInput("");
  };

  const contextValue = {
    prevPrompts,
    setPrevPrompts,
    onSent,
    setRecentPrompt,
    recentPrompt,
    showResult,
    loading,
    resultData,
    input,
    setInput,
    newChat,
  };

  return <Context.Provider value={contextValue}>{props.children}</Context.Provider>;
};

export default ContextProvider;
