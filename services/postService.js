// postService.js
const postModel = require('../models/postModel');

class PostService {
    getAllPost(callback) {
        postModel.getAllPost((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
	getAllPostCategory(category, callback) {
        postModel.getAllPostCategory(category, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    // Otros métodos del servicio...

    getPostById(id, callback) {
        postModel.getPostById(id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    createPost(post, callback) {
        postModel.createPost(post, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    updatePost(id, post, callback) {
        postModel.updatePost(id, post, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    deletePost(id, callback) {
        postModel.deletePost(id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}



module.exports = new PostService();
