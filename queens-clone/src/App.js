import "./App.css";

function generateBoard(size) {
    let board = Array(size)
        .fill()
        .map(() => Array(size).fill(0));
    let row = Math.floor(Math.random() * 7);
    for (let i = 0; i < 7; i++) {
        while (board[row][i] === "queen" || board[row][i] === "empty") {
            row = Math.floor(Math.random() * 7);
        }
        board[row][i] = "queen";
        if (row - 1 >= 0 && i - 1 >= 0) board[row - 1][i - 1] = "empty";
        if (row - 1 >= 0 && i + 1 < size) board[row - 1][i + 1] = "empty";
        if (row + 1 < size && i - 1 >= 0) board[row + 1][i - 1] = "empty";
        if (row + 1 < size && i + 1 < size) board[row + 1][i + 1] = "empty";
        for (let j = 0; j < 7; j++) {
            if (j !== row) board[j][i] = "empty";
            if (j !== i) board[row][j] = "empty";
        }
        row = Math.floor(Math.random() * 7);
    }
    return board;
}

function App() {
    let size = 7;
    let board = generateBoard(size);
    return (
        <div className="grid">
            {board.map((row, index) => (
                <div key={index} className="row">
                    {row.map((item, index) => (
                        <div key={index} className="square">
                            {item === "queen" ? (
                                // <img src="../public/queen.jpg" alt="queen" />
                                <div>q</div>
                            ) : (
                                <div>X</div>
                            )}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}

export default App;
