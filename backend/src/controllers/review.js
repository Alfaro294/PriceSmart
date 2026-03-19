const reviewController = {};

import reviewModel from "../models/review.js";

// SELECT

reviewController.getReview = async (req,res) =>{
    const review = await reviewModel.find()
    res.json(review)
};

// INSERT
reviewController.insertReview = async(req, res)=>{
    const {idEmployee, idProducts,rating,comment} = req.body;
    const newReview = new reviewModel({
        idEmployee,
        idProducts,
        rating,
        comment
    });
    await newReview.save()
    res.json ({message : "Review Saved"})
};

// UPDATE
reviewController.updateReview = async(req, res) =>{
    const {idEmployee,idProducts,rating,comment} = req.body;
    await reviewModel.findByIdAndUpdate (req.params.id, {idEmployee,idProducts,rating,comment})
    res.json ({message: "Review updated"})
};

// DELETE
reviewController.deleteReview = async(req,res) => {
    await reviewModel.findByIdAndDelete(req.params.id)
    res.json ({message : "Review Deleted"})
};

export default reviewController;