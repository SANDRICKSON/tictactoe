import React from 'react';
import './TicTacToe.css';
import circle_icon from '../circle.png';
import cross_icon from '../cross.png';

const TicTacToe = () => {
    const [data, setData] = React.useState(Array(9).fill(""));
    const [isXTurn, setIsXTurn] = React.useState(true);
    const [lock, setLock] = React.useState(false);
    const titleRef = React.useRef(null);
    const boxRefs = Array(9).fill(null).map(() => React.useRef(null));

    const handleClick = (index) => {
        if (lock || data[index] !== "") return;

        const newData = [...data];
        newData[index] = isXTurn ? "x" : "o";
        boxRefs[index].current.innerHTML = `<img src='${isXTurn ? cross_icon : circle_icon}' />`;

        setData(newData);
        setIsXTurn(!isXTurn);
        checkWin(newData);
    };

    const checkWin = (currentData) => {
        const winPatterns = [
            [0,1,2], [3,4,5], [6,7,8],
            [0,3,6], [1,4,7], [2,5,8],
            [0,4,8], [2,4,6]
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (currentData[a] && currentData[a] === currentData[b] && currentData[b] === currentData[c]) {
                declareWinner(currentData[a]);
                return;
            }
        }

        if (!currentData.includes("")) {
            declareDraw();
        }
    };

    const declareWinner = (winner) => {
        setLock(true);
        titleRef.current.innerHTML = `Winner is <img src=${winner === "x" ? cross_icon : circle_icon} />`;
    };

    const declareDraw = () => {
        setLock(true);
        titleRef.current.innerHTML = `It's a Draw!`;
    };

    const reset = () => {
        setData(Array(9).fill(""));
        setIsXTurn(true);
        setLock(false);
        titleRef.current.innerHTML = 'TIC TAC TOE In <span>React</span>';
        boxRefs.forEach(ref => {
            if (ref.current) ref.current.innerHTML = "";
        });
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>TIC TAC TOE In <span>React</span></h1>
            <div className="board">
                {[0, 1, 2].map(row => (
                    <div key={row} className={`row${row + 1}`}>
                        {[0, 1, 2].map(col => {
                            const index = row * 3 + col;
                            return (
                                <div
                                    key={index}
                                    className="boxes"
                                    ref={boxRefs[index]}
                                    onClick={() => handleClick(index)}
                                ></div>
                            );
                        })}
                    </div>
                ))}
            </div>
            <button className="reset" onClick={reset}>Reset</button>
        </div>
    );
};

export default TicTacToe;
