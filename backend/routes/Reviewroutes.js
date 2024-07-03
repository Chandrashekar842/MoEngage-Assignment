import express from 'express'

import { addReview, getReviews } from '../controllers/reviewControllers.js'
import { authMiddleware } from '../middleware/authMiddleware.js'

export const reviewRouter = express.Router()

reviewRouter.post('/add-review', authMiddleware, addReview)

reviewRouter.get('/get-reviews/:breweryId', authMiddleware, getReviews)