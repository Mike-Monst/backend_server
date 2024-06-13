// Ejemplo en commentModel.js
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');
const { format } = require('date-fns');

class CommentModel {


    getAllComment(callback) {
		
        const query = 'SELECT * FROM comment ORDER BY comment_fecha DESC';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }


	getAllCommentPostid(postid, callback) {
        const query = 'SELECT * FROM comment WHERE post_id = ? ORDER BY comment_fecha DESC';
        db.query(query, [postid], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
    getCommentById(id, callback) {
        const query = 'SELECT * FROM comment WHERE comment_id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result[0]);
            }
        });
    }
    
    async createComment(comment, callback) {
		const fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const query = 'INSERT INTO comment (post_id, comment_id, user_gmail, comment_text, comment_fecha) VALUES (?, ?, ?, ?, ?)';
        const values = [comment.post_id, comment.comment_id, comment.user_gmail, comment.comment_text, fecha];
        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    async updateComment(id, comment, callback) {
        const query = 'UPDATE comment SET user_gmail = ?, comment_text = ?, post_id = ? WHERE comment_id = ? AND post_id = ?';
        const values = [comment.user_gmail, comment.comment_text, comment.comment_postid, id, comment.post_id ];
        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    deleteComment(comment_id, post_id , callback) {
        const query = 'DELETE FROM comment WHERE comment_id = ? AND post_id = ?';
        db.query(query, [comment_id, post_id], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    
}

module.exports = new CommentModel();
