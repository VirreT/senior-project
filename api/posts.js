/*// port req (see website/scripts/requirements/postreq.js)
const express = require("express");
const { body } = require("express-validator");
const db = require("./sqlConnector");
const { validateRequest, verifyToken } = require("./token");
const router = express.Router();

// title Validation
router.post("/",
    verifyToken,
    validateRequest([
        body("title")
            .isLength({ min: 1, max: 40 }).trim().escape().withMessage("Title must be between 1 and 40 characters.")
            .matches(/^(?!.*(--|;|xp_cmdshell|\b(SELECT|INSERT|DELETE|DROP|UPDATE|ALTER|CREATE|EXEC|UNION|OR|AND)\b)).*$/i)
            .withMessage("Title contains forbidden patterns."),
        body("content").isLength({ min: 1 }).trim().escape().withMessage("Content cannot be empty."),
        body("bio")
            .optional()
            .isLength({ max: 250 }).trim().escape().withMessage("Bio must be less than 250 characters."),
        body("rating")
            .optional()
            .isInt({ min: 1, max: 5 }).withMessage("Rating must be between 1 and 5."),
        body("link")
            .optional()
            .isURL().withMessage("Link must be a valid URL.")
            .contains("google.com/maps/place/").withMessage("Link must be a valid Google Maps link.")
    ]),
    (req, res) => {
        const { title, content, bio, rating, link } = req.body;
        const { username } = req.user;

        // insert post into the database
        db.query(
            "INSERT INTO posts (user, title, content, bio, rating, link) VALUES (?, ?, ?, ?, ?, ?)",
            [username, title, content, bio || null, rating || null, link || null],
            (err) => {
                if (err) {
                    if (err.code === "ER_DATA_TOO_LONG") {
                        return res.status(400).json({ error: "Input exceeds the maximum allowed length." });
                    }
                    return res.status(500).json({ error: "Database error" });
                }
                res.status(201).json({ message: "Post created successfully" });
            }
        );
    }
);

router.delete("/:id", verifyToken, (req, res) => {
    const { id } = req.params;
    const { username } = req.user;

    db.query("DELETE FROM posts WHERE id = ? AND user = ?", [id, username], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Database error" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Post not found or you do not own this post" });
        }
        res.json({ message: "Post deleted successfully" });
    });
});

// Fetch a single post with additional fields
router.get("/:id", verifyToken, (req, res) => {
    const { id } = req.params;

    db.query(
        "SELECT * FROM posts WHERE id = ?",
        [id],
        (err, results) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (results.length === 0) return res.status(404).json({ error: "Post not found" });

            const post = results[0];
            res.json({
                id: post.id,
                user: post.user,
                title: post.title,
                content: post.content,
                bio: post.bio,
                rating: post.rating,
                link: post.link,
                created: post.created
            });
        }
    );
});

// Fetch all posts with additional fields
router.get("/", verifyToken, (req, res) => {
    db.query(
        "SELECT id, title, content, bio, rating, link, user, created FROM posts",
        (err, results) => {
            if (err) {
                return res.status(500).json({ error: "Database error" });
            }
            res.json(results);
        }
    );
});

module.exports = router;
*/