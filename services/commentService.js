// commentService.js
const commentModel = require('../models/commentModel');

class CommentService {
    getAllComment(callback) {
        commentModel.getAllComment((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
	getAllCommentPostId(postid, callback) {
        commentModel.getAllCommentPostid(postid, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    // Otros métodos del servicio...

    getCommentById(id, callback) {
        commentModel.getCommentById(id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }

    createComment(comment, callback) {
        commentModel.createComment(comment, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    updateComment(id, comment, callback) {
        commentModel.updateComment(id, comment, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
    deleteComment(comment_id, post_id, callback) {
        commentModel.deleteComment(comment_id, post_id, (err, data) => {
            if (err) {
                callback(err, null);
            } else {
                callback(null, data);
            }
        });
    }
}



module.exports = new CommentService();
