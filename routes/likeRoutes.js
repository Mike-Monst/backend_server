// likeRoutes.js
const express = require('express');
const router = express.Router();
const likeController = require('../controllers/likeController.js');

router.get('/', likeController.getAllLike);
router.get('/:id', likeController.getLikesById);
router.post('/', likeController.createLike);
router.put('/:id', likeController.updateLike);
router.delete('/:id', likeController.deleteLike);

module.exports = router;
