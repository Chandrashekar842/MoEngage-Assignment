import mongoose from 'mongoose'

const Schema = mongoose.Schema

const reviewSchema = new Schema({
    breweryId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    username: {
        type: String
    }
})

export const Review = mongoose.model('Review', reviewSchema)