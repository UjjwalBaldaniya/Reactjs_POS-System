import "../../css/calculator.css";

import { useState } from "react";

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");

  const handleClick = (value) => {
    if (value === "=") {
      try {
        setResult(eval(input));
      } catch (e) {
        setResult("Error");
      }
    } else if (value === "C") {
      setInput("");
      setResult("");
    } else if (value === "+/-") {
      setInput((prev) => (prev.startsWith("-") ? prev.slice(1) : `-${prev}`));
    } else if (value === "%") {
      setInput((prev) => `${parseFloat(prev) / 100}`);
    } else {
      setInput((prev) => prev + value);
    }
  };

  const buttons = [
    { label: "AC", value: "C" },
    { label: "+/-", value: "+/-" },
    { label: "%", value: "%" },
    { label: "/", value: "/" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "*", value: "*" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "-", value: "-" },
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "+", value: "+" },
    { label: "0", value: "0", className: "zero" },
    { label: ".", value: "." },
    { label: "=", value: "=" },
  ];

  return (
    <div className="calculator">
      <div className="calc-display">
        <div className="calc-input">{input}</div>
        <div className="calc-result">{result}</div>
      </div>
      <div className="calc-buttons">
        {buttons?.map((button, index) => (
          <button
            key={index}
            onClick={() => handleClick(button?.value)}
            className={`calc-button ${button?.className || ""}`}
          >
            {button.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calculator;
