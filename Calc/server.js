const express = require("express");
const cors = require("cors"); // Import cors
const { exec } = require("child_process");

const app = express();
const port = 6900;

// Enable CORS for all routes
app.use(cors());  // Allow cross-origin requests
app.use(express.json());

app.post("/open-calc", (req, res) => {
    const { command } = req.body;

    if (command.toLowerCase() === "open calc") {
        exec("python ./opencalc.py", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error executing calculator script: ${error.message}`);
                return res.status(500).send({ error: error.message });
            }

            if (stderr) {
                console.error(`stderr: ${stderr}`);
                return res.status(500).send({ error: stderr });
            }

            console.log(`stdout: ${stdout}`);
            res.send({ message: "Calculator opened successfully!" });
        });
    } else {
        res.status(400).send({ message: "Invalid command" });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
