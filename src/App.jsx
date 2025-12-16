import {useEffect, useState} from 'react'
import './App.css'

function App() {
    const [list, setList] = useState(() => {
        const saved = localStorage.getItem('list');
        return saved ? JSON.parse(saved) : [];
    });

    const [current, setCurrent] = useState(() => {
        const saved = localStorage.getItem('current');
        return saved ? JSON.parse(saved) : "";
    });

    useEffect(() => {
        localStorage.setItem('list', JSON.stringify(list));
        console.log(list);
        // Auto-scroll history to the bottom only if content overflows
        const historyDiv = document.querySelector('.history');
        if (historyDiv && historyDiv.scrollHeight > historyDiv.clientHeight) {
            historyDiv.scrollTop = historyDiv.scrollHeight;
        }
    }, [list]);

    useEffect(() => {
        localStorage.setItem('current', JSON.stringify(current));
        console.log(current);
    }, [current]);

    function add() {
        if (current != "") {
            setList([...list, current]);
            setCurrent("");
        }
    }

    function sub() {
        if (current != "") {
            setList([...list, "-" + current]);
            setCurrent("");
        }
    }

    function remove(indexToRemove) {
        setList(prev => prev.filter((_, idx) => idx !== indexToRemove))
    }

    function isSomething(current) {
        return current && !current.match(/^0*$/g);
    }

    function times() {
        if (current.indexOf("x") === -1 && isSomething(current)) {
            setCurrent(current.toString() + "x")
        }
    }

    function backspace() {
        setCurrent(current.slice(0, -1));
    }

    function clear() {
        setCurrent("");
    }

    function reset() {
        setCurrent("")
        setList([])
    }


    function digit(n) {
        return function () {
            if(n != 0 || isSomething(current)){
              setCurrent(current.toString() + n);
            }
        }
    }


    function getTotal() {
        return list.reduce((previousValue, currentValue) =>{
            let val = currentValue.split("x");
            return previousValue + val[0] * (val[1] || 1) / 100
                 } , 0)
    }

    function formatAmount(amount, absolute = false){
        let amountNumber = parseInt(amount || 0);
        if(absolute){
            amountNumber = Math.abs(amountNumber);
        }
        // Format to 2 decimals
        let formatted = (amountNumber / 100).toFixed(2);
        // Split integer and decimal part
        let [intPart, decPart] = formatted.split(".");
        // Add up to 3 leading spaces to align integer part to 3 digits
        let paddedInt = intPart.padStart(5, ' ');
        return paddedInt + "." + decPart;
    }

    /**
     * Formats a row string by splitting it into parts, formatting the first part,
     * and appending additional components if applicable. Will force the first part to be positive.
     *
     * @param {string} row - The input string to be formatted. Expected to contain segments separated by "x".
     * @return {string} The formatted string after processing the input.
     */
    function formatRow(row) {
        let splitRow = row.split("x");
        let ret = "";
        ret = formatAmount(splitRow[0], true);
        if(row.indexOf("x") !== -1 && splitRow[0] != 0){
            ret += " x ";
        }
        if(splitRow[1] && splitRow[0] != 0){
            ret += splitRow[1];
        }

        return  ret;
    }

    return (
        <>
            <div className={"display"}>
                <div className={"history"}>
                    {list.map((v, i) => <div className="row" key={i}>
                        <span className={"sign " + (v.startsWith("-") ? "minus" : "plus")}>{v.startsWith("-") ? "−" : "+"}</span>
                        <span className="amount">{formatRow(v)}</span>
                        <button className="remove" onClick={() => remove(i)}>DEL</button>
                    </div>)}
                </div>
                <div className={"total"}>
                    <span className={"equals"}>TOTAL</span>
                    <span className={"digit"}>{getTotal().toFixed(2)}</span>
                </div>
                <div className={"current"}>{formatRow(current)}</div>
            </div>
            <div className="calculator">
                <button onClick={backspace}>⌫</button>
                <button onClick={clear}>CLR</button>
                <button className="red" onClick={reset}>RST</button>

                <button onClick={digit(7)}>7</button>
                <button onClick={digit(8)}>8</button>
                <button onClick={digit(9)}>9</button>

                <button onClick={digit(4)}>4</button>
                <button onClick={digit(5)}>5</button>
                <button onClick={digit(6)}>6</button>

                <button onClick={digit(1)}>1</button>
                <button onClick={digit(2)}>2</button>
                <button onClick={digit(3)}>3</button>

                <button onClick={digit(0)}>0</button>
                <button className="w2" onClick={times}>TIMES</button>
                <button className="w2" onClick={add}>️ADD</button>
                <button onClick={sub}>SUB</button>
            </div>
        </>
    )
}

export default App
