import commentModel from "../models/comment.model.js";

export const getAllComments = async (req, res) => {
    const comments = await commentModel.findAll();
    res.json({ status: "success", data: comments });
};

export const getCommentById = async (req, res) => {
    const comment = await commentModel.findById(req.params.id);
    if (!comment)
        return res
            .status(404)
            .json({ status: "error", data: "Comment not found" });
    res.json({ status: "success", data: comment });
};

export const createComment = async (req, res) => {
    const { postId, content } = req.body;
    if (!postId || !content)
        return res
            .status(400)
            .json({ status: "error", data: "Missing fields" });

    const comment = await commentModel.create({ postId, content });
    res.status(201).json({ status: "success", data: comment });
};

export const updateComment = async (req, res) => {
    const { content } = req.body;
    const comment = await commentModel.update(req.params.id, { content });
    if (!comment)
        return res
            .status(404)
            .json({ status: "error", data: "Comment not found" });
    res.json({ status: "success", data: comment });
};

export const deleteComment = async (req, res) => {
    const deleted = await commentModel.delete(req.params.id);

    if (!deleted) {
        return res
            .status(404)
            .json({ status: "error", data: "Comment not found" });
    }

    return res.status(204).send();
};
