import { useState } from "react";
import "./App.css";

function generateBoard(size) {
    let board = [];
    let isDone = false;
    while (!isDone) {
        board = Array(size)
            .fill()
            .map(() => Array(size).fill(0));
        let row = Math.floor(Math.random() * size);
        for (let i = 0; i < size - 1; i++) {
            while (board[row][i] === "queen" || board[row][i] === "empty") {
                row = Math.floor(Math.random() * size);
            }
            board[row][i] = "queen";
            if (row - 1 >= 0 && i - 1 >= 0) board[row - 1][i - 1] = "empty";
            if (row - 1 >= 0 && i + 1 < size) board[row - 1][i + 1] = "empty";
            if (row + 1 < size && i - 1 >= 0) board[row + 1][i - 1] = "empty";
            if (row + 1 < size && i + 1 < size) board[row + 1][i + 1] = "empty";
            for (let j = 0; j < size; j++) {
                if (j !== row) board[j][i] = "empty";
                if (j !== i) board[row][j] = "empty";
            }
            row = Math.floor(Math.random() * size);
        }
        for (let i = 0; i < size; i++) {
            if (board[i][size - 1] !== "empty") {
                board[i][size - 1] = "queen";
                isDone = true;
                console.log(board);
                break;
            }
        }
    }
    return board;
}

function Square(props) {
    const [squareState, setSquareState] = useState("empty");

    const handleClick = () => {
        if (squareState === "empty") setSquareState("marked");
        else if (squareState === "marked") setSquareState("queen");
        else setSquareState("empty");
        console.log("Changed to: " + squareState);
    };
    return (
        <div
            className="square"
            style={{
                backgroundColor: props.type === "queen" ? "red" : "lightblue",
            }}
            onClick={handleClick}
        >
            {squareState === "empty" ? (
                ""
            ) : squareState === "marked" ? (
                "X"
            ) : (
                <i className="fa-solid fa-chess-queen"></i>
            )}
        </div>
    );
}

function App() {
    let size = 8;
    let board = generateBoard(size);
    return (
        <div className="grid">
            {board.map((row, index) => (
                <div key={index} className="row">
                    {row.map((item, index) => (
                        <Square key={index} type={item} />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
