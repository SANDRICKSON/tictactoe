import React from 'react';
import './TicTacToe.css';
import circle_icon from '../circle.png';
import cross_icon from '../cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = React.useState(0);
    const [lock, setLock] = React.useState(false);
    const titleRef = React.useRef(null);

    // ინდივიდუალური useRef-ები
    const box1 = React.useRef(null);
    const box2 = React.useRef(null);
    const box3 = React.useRef(null);
    const box4 = React.useRef(null);
    const box5 = React.useRef(null);
    const box6 = React.useRef(null);
    const box7 = React.useRef(null);
    const box8 = React.useRef(null);
    const box9 = React.useRef(null);

    const boxRefs = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

    const toggle = (e, num) => {
        if (lock || data[num] !== "") {
            return;
        }

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='X' />`;
            data[num] = "x";
        } else {
            e.target.innerHTML = `<img src='${circle_icon}' alt='O' />`;
            data[num] = "o";
        }

        setCount(prev => prev + 1);
        checkwin();
    };

    const checkwin = () => {
        const wins = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let combo of wins) {
            const [a, b, c] = combo;
            if (data[a] && data[a] === data[b] && data[b] === data[c]) {
                won(data[a]);
                return;
            }
        }

        if (!data.includes("")) {
            draw();
        }
    };

    const won = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Congratulations! Winner is <img src=${winner === "x" ? cross_icon : circle_icon} alt='winner' />`;
    };

    const draw = () => {
        setLock(true);
        titleRef.current.innerHTML = `It's a Draw!`;
    };

    const reset = () => {
        setLock(false);
        data = ["", "", "", "", "", "", "", "", ""];
        titleRef.current.innerHTML = 'TIC TAC TOE In <span>React</span>';
        boxRefs.forEach(box => {
            box.current.innerHTML = "";
        });
        setCount(0);
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>TIC TAC TOE In <span>React</span></h1>
            <div className="board">
                <div className="row1">
                    <div className="boxes" ref={box1} onClick={(e) => toggle(e, 0)}></div>
                    <div className="boxes" ref={box2} onClick={(e) => toggle(e, 1)}></div>
                    <div className="boxes" ref={box3} onClick={(e) => toggle(e, 2)}></div>
                </div>
                <div className="row2">
                    <div className="boxes" ref={box4} onClick={(e) => toggle(e, 3)}></div>
                    <div className="boxes" ref={box5} onClick={(e) => toggle(e, 4)}></div>
                    <div className="boxes" ref={box6} onClick={(e) => toggle(e, 5)}></div>
                </div>
                <div className="row3">
                    <div className="boxes" ref={box7} onClick={(e) => toggle(e, 6)}></div>
                    <div className="boxes" ref={box8} onClick={(e) => toggle(e, 7)}></div>
                    <div className="boxes" ref={box9} onClick={(e) => toggle(e, 8)}></div>
                </div>
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
