import express from "express";

const app = express();

app.get("/", (req, res) => {
    console.log('We got message')
    res.send("Hello, world!");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});