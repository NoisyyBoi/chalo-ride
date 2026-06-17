import Review from "../models/Review.js";

// ================= ADD REVIEW =================

export const addReview =
  async (req, res) => {

    try {

      const {
        reviewer,
        rating,
        comment,
      } = req.body;

      const review =
        await Review.create({

          reviewer,

          rating,

          comment,

        });

      res.status(201).json(
        review
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };


// ================= GET REVIEWS =================

export const getReviews =
  async (req, res) => {

    try {

      const reviews =
        await Review.find()

        .sort({
          createdAt: -1,
        });

      res.json(
        reviews
      );

    } catch (error) {

      res.status(500).json({

        message:
          error.message,

      });

    }

  };