//module import
const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const accountRoutes = require("./api/accounts");
const postRoutes = require("./api/posts");
const commentRoutes = require("./api/comments");
const profileRoutes = require("./api/profile");

//express
const app = express();
const PORT = 8000;

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: ["http://localhost:8000"], 
    credentials: true, 
    allowedHeaders: ["Content-Type", "Authorization"] 
}));

//Middelware
app.use((req, res, next) => {
    res.setHeader("Content-Security-Policy", 
        "default-src 'self'; " +
        "script-src 'self'; " +
        "style-src 'self'; " +
        "img-src 'self'; " +
        "frame-ancestors 'none';");
    next();
});

app.use(express.static(path.join(__dirname, "website")));
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "website/html/index.html"));
});

// API routes
app.use("/api/accounts", accountRoutes);
//app.use("/api/posts", postRoutes);
//app.use("/api/comments", commentRoutes);
app.use("/api", profileRoutes);


// server start
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));