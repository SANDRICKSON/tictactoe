import React from 'react';
import './TicTacToe.css';
import circle_icon from '../circle.png';
import cross_icon from '../cross.png';

let data = ["", "", "", "", "", "", "", "", ""];

const TicTacToe = () => {
    const [count, setCount] = React.useState(0);
    const [lock, setLock] = React.useState(false);
    const [mode, setMode] = React.useState("pvp");
    const titleRef = React.useRef(null);

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
        if (lock || data[num] !== "") return;

        if (count % 2 === 0) {
            e.target.innerHTML = `<img src='${cross_icon}' alt='X' />`;
            data[num] = "x";
            setCount(prev => prev + 1);
            const result = checkwin();

            if (mode === "ai" && !result) {
                setTimeout(() => {
                    makeBestAIMove();
                }, 300);
            }
        } else if (mode === "pvp") {
            e.target.innerHTML = `<img src='${circle_icon}' alt='O' />`;
            data[num] = "o";
            setCount(prev => prev + 1);
            checkwin();
        }
    };

    const makeBestAIMove = () => {
        if (lock) return;

        let bestScore = -Infinity;
        let move = -1;

        for (let i = 0; i < 9; i++) {
            if (data[i] === "") {
                data[i] = "o";
                let score = minimax(data, 0, false);
                data[i] = "";
                if (score > bestScore) {
                    bestScore = score;
                    move = i;
                }
            }
        }

        if (move !== -1) {
            data[move] = "o";
            boxRefs[move].current.innerHTML = `<img src='${circle_icon}' alt='O' />`;
            setCount(prev => prev + 1);
            checkwin();
        }
    };

    const minimax = (board, depth, isMaximizing) => {
        const winner = checkSimulatedWin(board);
        if (winner !== null) {
            if (winner === "x") return -10 + depth;
            if (winner === "o") return 10 - depth;
            if (winner === "draw") return 0;
        }

        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "o";
                    let score = minimax(board, depth + 1, false);
                    board[i] = "";
                    bestScore = Math.max(score, bestScore);
                }
            }
            return bestScore;
        } else {
            let bestScore = Infinity;
            for (let i = 0; i < 9; i++) {
                if (board[i] === "") {
                    board[i] = "x";
                    let score = minimax(board, depth + 1, true);
                    board[i] = "";
                    bestScore = Math.min(score, bestScore);
                }
            }
            return bestScore;
        }
    };

    const checkSimulatedWin = (board) => {
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
            if (board[a] && board[a] === board[b] && board[b] === board[c]) {
                return board[a]; // "x" or "o"
            }
        }

        if (!board.includes("")) return "draw";

        return null;
    };

    const checkwin = () => {
        const result = checkSimulatedWin(data);
        if (result === "x" || result === "o") {
            won(result);
            return result;
        } else if (result === "draw") {
            draw();
            return "draw";
        }
        return null;
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

    const handleModeChange = (newMode) => {
        reset();
        setMode(newMode);
    };

    return (
        <div className="container">
            <h1 className="title" ref={titleRef}>TIC TAC TOE In <span>React</span></h1>

            <div className="mode-buttons">
                <button
                    className={mode === "pvp" ? "active-mode" : ""}
                    onClick={() => handleModeChange("pvp")}
                >Play vs Friend</button>
                <button
                    className={mode === "ai" ? "active-mode" : ""}
                    onClick={() => handleModeChange("ai")}
                >Play vs AI</button>
            </div>

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
