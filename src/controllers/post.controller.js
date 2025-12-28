import postModel from "../models/post.model.js";

export const getAllPosts = async (req, res) => {
    const posts = await postModel.findAll();
    res.json({ status: "success", data: posts });
};

export const getPostById = async (req, res) => {
    const post = await postModel.findById(req.params.id);
    if (!post)
        return res
            .status(404)
            .json({ status: "error", data: "Post not found" });
    res.json({ status: "success", data: post });
};

export const createPost = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content)
        return res
            .status(400)
            .json({ status: "error", data: "Missing fields" });

    const post = await postModel.create({ title, content });
    res.status(201).json({ status: "success", data: post });
};

export const updatePost = async (req, res) => {
    const { title, content } = req.body;
    const post = await postModel.update(req.params.id, { title, content });
    if (!post)
        return res
            .status(404)
            .json({ status: "error", data: "Post not found" });
    res.json({ status: "success", data: post });
};

export const deletePost = async (req, res) => {
    const deleted = await postModel.delete(req.params.id);
    if (!deleted) {
        return res
            .status(404)
            .json({ status: "error", data: "Post not found" });
    }

    return res.status(204).send();
};
