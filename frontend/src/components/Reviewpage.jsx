// components/ReviewSection.jsx
import React, { useState } from "react";

const ReviewSection = ({ productId }) => {
  const [reviews, setReviews] = useState([]);
  const [reviewInput, setReviewInput] = useState("");

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewInput.trim()) return;

    const newReview = {
      id: Date.now(),
      productId,
      text: reviewInput,
      date: new Date().toLocaleString(),
    };

    setReviews((prev) => [newReview, ...prev]);
    setReviewInput("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 mt-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Customer Reviews</h2>

      {/* Write Review */}
      <form onSubmit={handleReviewSubmit} className="mb-4">
        <textarea
          className="w-full border border-gray-300 rounded-md p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          placeholder="Write your review..."
          rows="3"
          value={reviewInput}
          onChange={(e) => setReviewInput(e.target.value)}
        ></textarea>
        <button
          type="submit"
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md"
        >
          Submit Review
        </button>
      </form>

      {/* Review List */}
      {reviews.length === 0 ? (
        <p className="text-gray-600">No reviews yet. Be the first to review!</p>
      ) : (
        <ul className="space-y-4">
          {reviews.map((review) => (
            <li key={review.id} className="border-t pt-2">
              <p className="text-gray-800">{review.text}</p>
              <p className="text-sm text-gray-500 mt-1">{review.date}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewSection;
