import { Star, User, X } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { getReviews, addReview } from '../services/api';
import getUserId from '../../../utils/getUserId';

export default function Reviews({activeTab, productId}) {
    const [reviews, setReviews] = useState([]);
    const [showReviewForm, setShowReviewForm] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [reviewForm, setReviewForm] = useState({
        review: '',
        rating: 0
    });

    const userId = getUserId();

    const calculateAverageRating = () => {
        if (!reviews || reviews.length === 0) return 0;
        const totalRating = reviews.reduce((sum, review) => sum + (review?.rating || 0), 0);
        return (totalRating / reviews.length).toFixed(1);
    };

    const getAverageStarsFilled = () => {
        const avgRating = calculateAverageRating();
        return Math.round(parseFloat(avgRating));
    };

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const response = await getReviews(productId);
                setReviews(response);
            } catch (error) {
                console.error('API error:', error);
            }
        };
        fetchReviews();
    }, [productId]);

    const handleStarClick = (rating) => {
        setReviewForm(prev => ({ ...prev, rating }));
    };

    const handleSubmitReview = async (e) => {
        e.preventDefault();
        
        if (!userId) {
            alert('Please login to write a review');
            return;
        }

        if (!reviewForm.review.trim() || reviewForm.rating === 0) {
            alert('Please provide both a review and rating');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const reviewData = {
                reviewerId: userId,
                reviewer: 'Harish', 
                review: reviewForm.review,
                rating: reviewForm.rating
            };

            await addReview(productId, reviewData);
            
            const updatedReviews = await getReviews(productId);
            setReviews(updatedReviews);
            
            setReviewForm({ review: '', rating: 0 });
            setShowReviewForm(false);
            
            alert('Review added successfully!');
        } catch (error) {
            console.error('Error adding review:', error);
            alert('Failed to add review. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleWriteReviewClick = () => {
        if (!userId) {
            alert('Please login to write a review');
            return;
        }
        setShowReviewForm(true);
    };

    const averageRating = calculateAverageRating();
    const averageStarsFilled = getAverageStarsFilled();
    const totalReviews = reviews?.length || 0;

    const hasUserReviewed = reviews?.some(review => 
        review?.reviewerId === userId || review?.reviewer === userId
    );

    return (
        <div>
            <div className="flex md:items-center flex-col md:flex-row justify-between mb-8">
                <div>
                    <h4 className="text-lg font-semibold text-nowrap text-gray-900">Customer Reviews</h4>
                    <div className="flex md:flex-col md:items-start flex-row items-center mt-2">
                        <div className="flex">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < averageStarsFilled ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                            ))}
                        </div>
                        <span className="ml-2 md:ml-0 text-sm text-gray-600">
                            {totalReviews > 0 
                                ? `${averageRating} out of 5 stars (${totalReviews} ${totalReviews === 1 ? 'review' : 'reviews'})`
                                : 'No reviews yet'
                            }
                        </span>
                    </div>
                </div>
                {!hasUserReviewed && (
                    <button 
                        onClick={handleWriteReviewClick}
                        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-medium transition-colors"
                    >
                        Write a Review
                    </button>
                )}
            </div>

            {/* Review Form Modal */}
            {showReviewForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-900">Write a Review</h3>
                            <button 
                                onClick={() => setShowReviewForm(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="h-5 w-5" />
                            </button>
                        </div>
                        
                        <form onSubmit={handleSubmitReview}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Rating
                                </label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            type="button"
                                            onClick={() => handleStarClick(star)}
                                            className="focus:outline-none"
                                        >
                                            <Star 
                                                className={`h-6 w-6 ${
                                                    star <= reviewForm.rating 
                                                        ? 'text-amber-400 fill-current' 
                                                        : 'text-gray-300'
                                                } hover:text-amber-400 transition-colors`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Your Review
                                </label>
                                <textarea
                                    value={reviewForm.review}
                                    onChange={(e) => setReviewForm(prev => ({ ...prev, review: e.target.value }))}
                                    placeholder="Share your experience with this product..."
                                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                                    rows="4"
                                    required
                                />
                            </div>
                            
                            <div className="flex space-x-3">
                                <button
                                    type="button"
                                    onClick={() => setShowReviewForm(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isSubmitting || !reviewForm.review.trim() || reviewForm.rating === 0}
                                    className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                                >
                                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            
            <div className="space-y-6">
                {reviews?.map((review) => (
                    <div key={review?.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                    <User className="h-5 w-5 text-green-600" />
                                </div>
                                <div>
                                    <div className="font-medium text-gray-900">{'Harish'}</div>
                                    <div className="text-sm text-gray-500">{review?.date}</div>
                                </div>
                                {review?.verified && (
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs font-medium">
                                        Verified Purchase
                                    </span>
                                )}
                            </div>
                            <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`h-4 w-4 ${i < (review?.rating || 0) ? 'text-amber-400 fill-current' : 'text-gray-300'}`} />
                                ))}
                            </div>
                        </div>
                        <p className="text-gray-700">{review?.review}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}