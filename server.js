// server.js
import express from "express";
import cors from "cors";
import apiRouter from "./src/routes/index.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware parse JSON
app.use(express.json());

// Cấu hình CORS
const allowedOrigins = [
    "http://localhost:5173",
    "https://lethanhdat1567.github.io",
];

app.use(
    cors({
        origin: allowedOrigins,
        methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        optionsSuccessStatus: 200,
    })
);

app.use("/api", apiRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
