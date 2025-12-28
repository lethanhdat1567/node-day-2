import { loadDB, saveDB } from "../../utils/jsonDB.js";

const resource = "comments";

class CommentModel {
    async findAll() {
        return loadDB(resource);
    }

    async findById(id) {
        const comments = await loadDB(resource);
        return comments.find((c) => c.id === id);
    }

    async create(data) {
        const comments = await loadDB(resource);
        const newComment = {
            id: Date.now().toString(),
            postId: data.postId,
            content: data.content,
            createdAt: new Date().toISOString(),
        };
        comments.push(newComment);
        await saveDB(resource, comments);
        return newComment;
    }

    async update(id, data) {
        const comments = await loadDB(resource);
        const index = comments.findIndex((c) => c.id === id);
        if (index === -1) return null;

        comments[index] = { ...comments[index], ...data };
        await saveDB(resource, comments);
        return comments[index];
    }

    async delete(id) {
        const comments = await loadDB(resource);
        const index = comments.findIndex((c) => c.id === id);
        if (index === -1) return false;

        comments.splice(index, 1);
        await saveDB(resource, comments);
        return true;
    }
}

export default new CommentModel();
