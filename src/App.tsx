import './App.css'; // Agar CSS qo'shmoqchi bo'lsangiz

function App() {
  const [display, setDisplay] = useState('0');
  const [previousValue, setPreviousValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<string | null>(null);
  const [waitingForNewValue, setWaitingForNewValue] = useState(false);

  const inputNumber = (num: string) => {
    if (waitingForNewValue) {
      setDisplay(num);
      setWaitingForNewValue(false);
    } else {
      setDisplay(display === '0' ? num : display + num);
    }
  };

  const inputDecimal = () => {
    if (waitingForNewValue) {
      setDisplay('0.');
      setWaitingForNewValue(false);
    } else if (display.indexOf('.') === -1) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPreviousValue(null);
    setOperation(null);
    setWaitingForNewValue(false);
  };

  const performOperation = (nextOperation: string) => {
    const inputValue = parseFloat(display);

    if (previousValue === null) {
      setPreviousValue(inputValue);
    } else if (operation) {
      const currentValue = previousValue || 0;
      const newValue = calculate(currentValue, inputValue, operation);

      setDisplay(String(newValue));
      setPreviousValue(newValue);
    }

    setWaitingForNewValue(true);
    setOperation(nextOperation);
  };

  const calculate = (firstValue: number, secondValue: number, operation: string) => {
    switch (operation) {
      case '+':
        return firstValue + secondValue;
      case '-':
        return firstValue - secondValue;
      case '×':
        return firstValue * secondValue;
      case '÷':
        return secondValue !== 0 ? firstValue / secondValue : 0;
      case '=':
        return secondValue;
      default:
        return secondValue;
    }
  };

  const performCalculation = () => {
    const inputValue = parseFloat(display);
    if (previousValue !== null && operation) {
      const newValue = calculate(previousValue, inputValue, operation);
      setDisplay(String(newValue));
      setPreviousValue(null);
      setOperation(null);
      setWaitingForNewValue(true);
    }
  };

  return (
    <div className="calculator">
      <h1>Kalkulyator</h1>
      <div className="display">{display}</div>
      <div className="buttons">
        <button onClick={clear} className="btn clear">C</button>
        <button onClick={() => performOperation('÷')} className="btn operation">÷</button>
        <button onClick={() => performOperation('×')} className="btn operation">×</button>
        <button onClick={() => performOperation('-')} className="btn operation">−</button>

        <button onClick={() => inputNumber('7')} className="btn">7</button>
        <button onClick={() => inputNumber('8')} className="btn">8</button>
        <button onClick={() => inputNumber('9')} className="btn">9</button>
        <button onClick={() => performOperation('+')} className="btn operation">+</button>

        <button onClick={() => inputNumber('4')} className="btn">4</button>
        <button onClick={() => inputNumber('5')} className="btn">5</button>
        <button onClick={() => inputNumber('6')} className="btn">6</button>
        <button onClick={performCalculation} className="btn equal">=</button>

        <button onClick={() => inputNumber('1')} className="btn">1</button>
        <button onClick={() => inputNumber('2')} className="btn">2</button>
        <button onClick={() => inputNumber('3')} className="btn">3</button>

        <button onClick={() => inputNumber('0')} className="btn zero">0</button>
        <button onClick={inputDecimal} className="btn">.</button>
      </div>
    </div>
  );
}

export default App;
