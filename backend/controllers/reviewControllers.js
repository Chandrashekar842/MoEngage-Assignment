import { User } from "../models/user.js";
import { Review } from "../models/review.js";
import { ObjectId } from "mongodb";

export const addReview = async (req, res, next) => {
  const { rating, description, breweryId } = req.body;
  const userId = req.user.id;

  try {
    if (!ObjectId.isValid(userId)) {
      return res.status(400).json({ message: "Invalid userId" });
    }
    const userObjectId = new ObjectId(userId);

    const user = await User.findById(userObjectId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const review = await Review.create({
      breweryId: breweryId,
      userId: userObjectId,
      rating: rating,
      description: description,
      username: user.username,
    });

    return res.status(200).json({ message: "Review added", review: review });
  } catch (err) {
    console.error("Error:", err);
    return res
      .status(500)
      .json({ message: "An error occurred", error: err.message });
  }
};

export const getReviews = async (req, res, next) => {
  const breweryId = req.params.breweryId
  const reviews = await Review.find({ breweryId: breweryId }).then((reviews) => {
      const updatedReviews = reviews.map((review) => {
        return {
          username: review.username,
          rating: review.rating,
          description: review.description
        }
      })
      return res.status(200).json({ reviews: updatedReviews })
  }).catch((err) => console.log(err))
}