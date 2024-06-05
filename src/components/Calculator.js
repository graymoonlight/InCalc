import React, { useState, useEffect } from 'react';
import '../styles/Calculator.css';
import * as math from 'mathjs';

function Calculator() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [logBase, setLogBase] = useState('');
  const [sqrtValue, setSqrtValue] = useState('');
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('calcHistory'));
    console.log("Saved History:", savedHistory);
    if (savedHistory) {
      setHistory(savedHistory);
    }
  }, []);
  
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem('calcHistory', JSON.stringify(history));
    }
  }, [history]);

  const handleInput = (value) => {
    setInput(input + value);
  };

  const handleBackspace = () => {
    setInput(input.slice(0, -1));
  };

  const calculateResult = () => {
    try {
      const res = math.evaluate(input);
      setResult(res.toFixed(10));
      setHistory(prevHistory => [...prevHistory, `${input} = ${res.toFixed(10)}`]);
      console.log("Updated History:", [...history, `${input} = ${res.toFixed(10)}`]);
    } catch (error) {
      setResult('Error');
    }
  };

  const clearInput = () => {
    setInput('');
    setResult('');
    setLogBase('');
    setSqrtValue('');
  };

  const addLog = () => {
    if (logBase) {
      handleInput(`log(${logBase},`);
      setLogBase('');
    } else {
      handleInput('log(');
    }
  };

  const handleCommaInput = () => {
    handleInput(',');
  };

  const addSqrt = () => {
    if (sqrtValue) {
      handleInput(`sqrt(${sqrtValue})`);
      setSqrtValue('');
    } else {
      handleInput('sqrt(');
    }
  };

  const evaluateAndConvertToDegrees = (expression) => {
    try {
      const res = math.evaluate(expression);
      const degrees = math.unit(res, 'radian').toNumber('deg');
      return degrees.toFixed(2) + "°";
    } catch (error) {
      return 'Error';
    }
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.setItem('calcHistory', JSON.stringify([]));
  };

  return (
    <div className='container'>
      <div className="calculator">
        <input type="text" value={input} readOnly className="input-field" />
        <div className="buttons">
          <button onClick={() => handleInput('7')}>7</button>
          <button onClick={() => handleInput('8')}>8</button>
          <button onClick={() => handleInput('9')}>9</button>
          <button onClick={() => handleInput(' + ')}>+</button>
          <button onClick={() => handleInput('4')}>4</button>
          <button onClick={() => handleInput('5')}>5</button>
          <button onClick={() => handleInput('6')}>6</button>
          <button onClick={() => handleInput(' - ')}>-</button>
          <button onClick={() => handleInput('1')}>1</button>
          <button onClick={() => handleInput('2')}>2</button>
          <button onClick={() => handleInput('3')}>3</button>
          <button onClick={() => handleInput(' * ')}>*</button>
          <button onClick={() => handleInput('0')}>0</button>
          <button onClick={() => handleInput('.')}>.</button>
          <button onClick={calculateResult}>=</button>
          <button onClick={clearInput}>C</button>
          <button onClick={() => handleInput(' / ')}>/</button>
          <button onClick={() => handleInput(' ^ ')}>^</button>
          <button onClick={() => handleInput('sqrt(')}>√</button>
          <button onClick={() => handleInput('sin(')}>sin</button>
          <button onClick={() => handleInput('cos(')}>cos</button>
          <button onClick={() => handleInput('tan(')}>tan</button>
          <button onClick={() => handleInput('cot(')}>cot</button>
          <button onClick={() => handleInput('sec(')}>sec</button>
          <button onClick={() => handleInput('csc(')}>csc</button>
          <button onClick={() => handleInput('sinh(')}>sinh</button>
          <button onClick={() => handleInput('cosh(')}>cosh</button>
          <button onClick={() => handleInput('tanh(')}>tanh</button>
          <button onClick={() => handleInput('asin(')}>asin</button>
          <button onClick={() => handleInput('acos(')}>acos</button>
          <button onClick={() => handleInput('atan(')}>atan</button>
          <button onClick={() => handleInput('acot(')}>acot</button>
          <button onClick={() => handleInput('asec(')}>asec</button>
          <button onClick={() => handleInput('acsc(')}>acsc</button>
          <button onClick={() => handleInput('!')}>!</button>
          <button onClick={addLog}>log</button>
          <button onClick={handleCommaInput}>,</button>
          <button onClick={addSqrt}>sqrt</button>
          <button onClick={() => handleInput('(')}>(</button>
          <button onClick={() => handleInput(')')}>)</button>
          <button onClick={handleBackspace}>←</button>
        </div>
        <div className="result">{result}</div>
        {input.startsWith("sin(") && (
          <div className="result">sin {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("cos(") && (
          <div className="result">cos {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("tan(") && (
          <div className="result">tan {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("cot(") && (
          <div className="result">cot {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("sec(") && (
          <div className="result">sec {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("csc(") && (
          <div className="result">csc {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("asin(") && (
        <div className="result">asin {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("acos(") && (
        <div className="result">acos {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("atan(") && (
        <div className="result">atan {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("acot(") && (
        <div className="result">acot {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("asec(") && (
        <div className="result">asec {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        {input.startsWith("acsc(") && (
        <div className="result">acsc {result === 'Error' ? 'Error' : evaluateAndConvertToDegrees(result)}</div>
        )}
        </div>
        <div className="history-panel">
            <h2>История</h2>
            <ul>
                {history.map((item, index) => (
                    <p key={index}>{item}</p>
                ))}
            </ul>
            <button onClick={clearHistory}>Очистить историю</button>
        </div>
        <div className="name">InCalc</div>
    </div>
  );
}
        
export default Calculator;