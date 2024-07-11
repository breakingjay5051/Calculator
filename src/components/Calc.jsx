// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";
import { create, all } from "mathjs";
import styles from "./Calc.module.css";

const math = create(all);

// eslint-disable-next-line react/prop-types
const CalculatorButton = ({ value, onClick }) => {
  return <button onClick={() => onClick(value)}>{value}</button>;
};

// eslint-disable-next-line react/prop-types
const CalculatorDisplay = ({ displayValue }) => {
  return (
    <div className={styles.display}>
      <input type="text" value={displayValue} readOnly />
    </div>
  );
};

const Calc = () => {
  const [displayValue, setDisplayValue] = useState("0");

  const handleButtonClick = (value) => {
    let newDisplayValue = displayValue;

    if (value === "⌫") {
      newDisplayValue = displayValue.slice(0, -1);
    } else if (value === "%") {
      newDisplayValue = String(parseFloat(displayValue) / 100);
    } else if (value === "C") {
      newDisplayValue = "0";
    } else if (value === "=") {
      try {
        const result = math.evaluate(displayValue);
        newDisplayValue = String(result);
      } catch (error) {
        newDisplayValue = "Error";
      }
    } else {
      if (displayValue === "0" || displayValue === "Error") {
        newDisplayValue = value;
      } else {
        newDisplayValue += value;
      }
    }

    setDisplayValue(newDisplayValue);
  };

  const numberButtons = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    "",
    "0",
    "",
    ".",
  ];
  const operatorButtons = ["+", "-", "*", "/", "⌫", "%"];

  return (
    <div className={styles.calculatorWrapper}>
      <div className={styles.calculator}>
        <CalculatorDisplay displayValue={displayValue} />
        <div className={styles.buttons}>
          {numberButtons.map((buttonValue) => (
            <CalculatorButton
              key={buttonValue}
              value={buttonValue}
              onClick={handleButtonClick}
            />
          ))}
          {operatorButtons.map((buttonValue) => (
            <CalculatorButton
              key={buttonValue}
              value={buttonValue}
              onClick={handleButtonClick}
            />
          ))}
          <CalculatorButton value="C" onClick={handleButtonClick} />
          <CalculatorButton value="=" onClick={handleButtonClick} />
        </div>
      </div>
    </div>
  );
};

export default Calc;
