import { loadDB, saveDB } from "../../utils/jsonDB.js";

const resource = "posts";

class PostModel {
    async findAll() {
        return loadDB(resource);
    }

    async findById(id) {
        const posts = await loadDB(resource);
        return posts.find((p) => p.id === id);
    }

    async create(data) {
        const posts = await loadDB(resource);
        const newPost = {
            id: Date.now().toString(),
            title: data.title,
            content: data.content,
            createdAt: new Date().toISOString(),
        };
        posts.push(newPost);
        await saveDB(resource, posts);
        return newPost;
    }

    async update(id, data) {
        const posts = await loadDB(resource);
        const index = posts.findIndex((p) => p.id === id);
        if (index === -1) return null;

        posts[index] = { ...posts[index], ...data };
        await saveDB(resource, posts);
        return posts[index];
    }

    async delete(id) {
        const posts = await loadDB(resource);
        const index = posts.findIndex((p) => p.id === id);
        if (index === -1) return false;

        posts.splice(index, 1);
        await saveDB(resource, posts);
        return true;
    }
}

export default new PostModel();
