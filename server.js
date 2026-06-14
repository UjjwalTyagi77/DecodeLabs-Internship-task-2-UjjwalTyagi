const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

let contacts = [];


app.get("/", (req, res) => {
    res.send("Portfolio Contact API is Running");
});


app.get("/messages", (req, res) => {
    res.status(200).json(contacts);
});


app.post("/messages", (req, res) => {

    const { name, email, message } = req.body;

  
    if (!name || !email || !message) {
        return res.status(400).json({
            error: "All fields are required"
        });
    }

    if (!email.includes("@")) {
        return res.status(400).json({
            error: "Invalid email address"
        });
    }

    if (message.length < 10) {
        return res.status(400).json({
            error: "Message must be at least 10 characters"
        });
    }

    const newMessage = {
        id: contacts.length + 1,
        name,
        email,
        message,
        submittedAt: new Date().toLocaleString()
    };

    contacts.push(newMessage);

    res.status(201).json({
        success: true,
        message: "Contact message submitted successfully",
        data: newMessage
    });
});


app.use((req, res) => {
    res.status(404).json({
        error: "Route not found"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});