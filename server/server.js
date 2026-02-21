const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(express.json());

const mode = process.argv[2] || "single";

const TEMPLATE_PATH = path.join(
    process.env.HOME,
    "cp-booster",
    "templates",
    "template.cpp"
);

let currentLetter = "A";
let timer;

// auto close after inactivity (contest mode)
function resetTimer(server) {
    clearTimeout(timer);
    timer = setTimeout(() => {
        console.log("Parsing finished.");
        server.close();
    }, 1000);
}

function sanitize(name) {
    return name.replace(/[^a-zA-Z0-9]/g, "_");
}

app.post("/", (req, res) => {
    const data = req.body;
    console.log("Received problem:", data.name);

    let fileName;  

    const template = fs.readFileSync(TEMPLATE_PATH, "utf8");

    if (mode === "contest") {
        fileName = currentLetter + ".cpp";
        fs.writeFileSync(fileName, template);

        data.tests.forEach((test, index) => {
            fs.writeFileSync(`${currentLetter}_in${index+1}.txt`, test.input);
            fs.writeFileSync(`${currentLetter}_out${index+1}.txt`, test.output);
        });

        currentLetter = String.fromCharCode(currentLetter.charCodeAt(0) + 1);

    } else {
        const baseName = sanitize(data.name);
        fileName = baseName + ".cpp";

        fs.writeFileSync(fileName, template);

        data.tests.forEach((test, index) => {
            fs.writeFileSync(`${baseName}_in${index+1}.txt`, test.input);
            fs.writeFileSync(`${baseName}_out${index+1}.txt`, test.output);
        });

        console.log("Single problem parsed.");
        server.close();
    }

    if (mode === "contest") resetTimer(server);

    res.send("OK");
});

const server = app.listen(1321, () => {
    console.log(`CP Booster listening on port 1321 (${mode} mode)`);
});