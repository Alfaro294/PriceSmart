import express from 'express'
import reviewController from '../controllers/review.js'

const router = express.Router();

router.route("/")
.get(reviewController.getReview)
.post(reviewController.insertReview)

router.route("/:id")
.put(reviewController.updateReview)
.delete(reviewController.deleteReview)

export default router;