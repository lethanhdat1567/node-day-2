import express from "express";
import postsRouter from "./posts.route.js";
import commentsRouter from "./comments.route.js";

const router = express.Router();

router.use("/posts", postsRouter);
router.use("/comments", commentsRouter);

export default router;
