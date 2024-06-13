// Ejemplo en postModel.js
const db = require('../config/dbConfig');
const { logErrorSQL } = require('../utils/logger');
const { format } = require('date-fns');

class PostModel {


    getAllPost(callback) {
		
        const query = 'SELECT * FROM post ORDER BY post_fecha DESC';
        db.query(query, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }


	getAllPostCategory(category, callback) {
        const query = 'SELECT * FROM post WHERE post_category = ? ORDER BY post_fecha DESC';
        db.query(query, [category], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    // Otros métodos del modelo...
    getPostById(id, callback) {
        const query = 'SELECT * FROM post WHERE post_id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result[0]);
            }
        });
    }
    
    async createPost(post, callback) {
		const fecha = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const query = 'INSERT INTO post (post_id, user_gmail, post_text, post_category, post_fecha) VALUES (?, ?, ?, ?, ?)';
        const values = [post.post_id, post.user_gmail, post.post_text, post.post_category, fecha];
        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    async updatePost(id, post, callback) {
        const query = 'UPDATE post SET user_gmail = ?, post_text = ?, post_category = ? WHERE post_id = ?';
        const values = [post.user_gmail, post.post_text, post.post_category, id];
        db.query(query, values, (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }
    deletePost(id, callback) {
        const query = 'DELETE FROM post WHERE post_id = ?';
        db.query(query, [id], (err, result) => {
            if (err) {
                logErrorSQL(err);
                callback(err, null);
            } else {
                callback(null, result);
            }
        });
    }

    
}

module.exports = new PostModel();
