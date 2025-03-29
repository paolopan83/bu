import {useState} from 'react'
import './App.css'

function App() {
    const [list, setList] = useState([]);
    const [current, setCurrent] = useState("");

    function add() {
        setList([...list, getCurrent()]);
        setCurrent("");
    }

    function backspace() {
        setCurrent(current.slice(0,-1));
    }

    function clear(){
        setCurrent("");
    }


    function digit(n){
        return function() {
            setCurrent(current.toString() + n);
        }
    }


    function getTotal() {
        return list.reduce((previousValue, currentValue) => previousValue + currentValue, 0)
    }

    function getCurrent() {
        return (parseInt(current || 0)/100);
    }

    return (
        <>
            <div className={"display"}>
                <div className={"history"}>
                    {list.map((v,i) => <div key={i}>{v.toFixed(2)}</div>)}
                </div>
                <div className={"total"}>
                    <span className={"equals"}>=</span>
                    <span className={"digit"}>{getTotal().toFixed(2)}</span>
                </div>
                <div className={"current"}>{getCurrent().toFixed(2)}</div>
            </div>
            <div className="calculator">
                <button onClick={backspace}>⌫</button>
                <button className="w2" onClick={clear}>CLR</button>

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
                <button className="w2">TIMES</button>
                <button className="w3" onClick={add}>ADD</button>
            </div>
        </>
    )
}

export default App
