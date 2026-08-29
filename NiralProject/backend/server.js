require("dotenv").config(); 

const express = require("express");
const cors = require("cors");
const db = require("./db");
const fetch = require("node-fetch");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "../frontend")));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

app.get("/api/land", (req, res) => {
    const query = `
    SELECT 
       lr.id,
        lr.district,
        lr.taluk,
        lr.village,
        lr.survey_number,
        lr.owner_name,
        lr.patta_number,
        lr.land_area,
        lr.land_type,

        COALESCE(cc.case_number, NULL) AS case_number,
        COALESCE(cc.court_name, NULL) AS court_name,
        COALESCE(cc.case_type, NULL) AS case_type,
        COALESCE(cc.status, 'Closed') AS status

        FROM land_records lr

        LEFT JOIN court_cases cc 
        ON lr.id = cc.land_id

        GROUP BY lr.id
        `;

    db.query(query, (err, result) => {
        if (err) {
            res.status(500).json({ message: "Database Error" });
        } else {
            res.json(result);
        }
    });
});

app.post("/api/login", (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
    return res.json({ success: false, message: "Fill all fields" });
    }

    const query = "SELECT * FROM users WHERE username = ? AND password = ?";

    db.query(query, [username, password], (err, result) => {
        if (err) {
            return res.status(500).json({ message: "Database error" });
        }

        if (result.length > 0) {
            res.json({ success: true, message: "Login success" });
        } else {
            res.json({ success: false, message: "Invalid credentials" });
        }
    });
});

app.post("/api/register", (req, res) => {

    const { username, password } = req.body;

    const checkQuery = "SELECT * FROM users WHERE username = ?";

    db.query(checkQuery, [username], (err, result) => {

        if (err) {
            return res.status(500).json({ message: "Database Error" });
        }

        if (result.length > 0) {
            return res.json({
                success: false,
                message: "User already exists"
            });
        }

        const insertQuery =
            "INSERT INTO users (username, password) VALUES (?, ?)";

        db.query(insertQuery, [username, password], (err) => {

            if (err) {
                return res.status(500).json({
                    message: "Registration Failed"
                });
            }

            res.json({
                success: true,
                message: "Registration Successful"
            });

        });

    });

});

app.post("/api/add-land", (req, res) => {
    const { district, village, survey, owner, patta, area } = req.body;

    const query = `
        INSERT INTO land_records
        (district, village, survey_number, owner_name, patta_number, land_area)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(
        query,
        [district, village, survey, owner, patta, area],
        (err, result) => {
            if (err) {
                res.json({ message: "Error adding record" });
            } else {
                res.json({ message: "Record Added Successfully / பதிவு சேர்க்கப்பட்டது" });
            }
        }
    );
});

app.post("/api/ai-check", async (req, res) => {
    try {
        const landData = req.body;

        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.LAND_API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                model: "openai/gpt-3.5-turbo",
                messages: [
                    {
                        role: "user",
                        content: `
                            நீங்கள் ஒரு தமிழ் நில வழக்கு AI உதவியாளர்.

                            கீழே உள்ள நில விவரத்தை analyze செய்து:

                            1. Risk Level மட்டும் Englishல் சொல்லவும் (Low / Medium / High)
                            2. காரணத்தை தமிழில் சொல்லவும்
                            3. பரிந்துரையை தமிழில் சொல்லவும்

                            மிகவும் short மற்றும் simple ஆக இருக்க வேண்டும்.

                            Land Data:
                            ${JSON.stringify(landData)}
                        `
                    }
                ]
            })
        });

        const data = await response.json();

        console.log(data);

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "AI Error" });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});