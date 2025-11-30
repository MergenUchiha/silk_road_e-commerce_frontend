import React, { useState, useEffect } from "react";
import {
    Package,
    Star,
    Trash2,
    ShoppingCart,
    ArrowLeft,
    Plus,
    Minus,
} from "lucide-react";
import { Product, User } from "../types";
import * as api from "../services/api";

interface ProductDetailPageProps {
    productId: string;
    user: User | null;
    setCurrentPage: (page: string) => void;
    onAddToCart: (productId: string, quantity?: number) => void;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
    productId,
    user,
    setCurrentPage,
    onAddToCart,
}) => {
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [selectedImage, setSelectedImage] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [reviewComment, setReviewComment] = useState("");
    const [reviewRating, setReviewRating] = useState(5);
    const [submittingReview, setSubmittingReview] = useState(false);

    useEffect(() => {
        loadProduct();
    }, [productId]);

    const loadProduct = async () => {
        try {
            setLoading(true);
            const productData = await api.getProduct(productId);
            console.log("Product loaded:", productData);
            setProduct(productData);
        } catch (error) {
            console.error("Failed to load product:", error);
            alert("Failed to load product");
        } finally {
            setLoading(false);
        }
    };

    const handleQuantityChange = (newQuantity: number) => {
        if (newQuantity >= 1 && newQuantity <= 99) {
            setQuantity(newQuantity);
        }
    };

    const handleAddToCart = () => {
        if (!product) return;
        onAddToCart(product.id, quantity);
        setQuantity(1);
    };

    const handleSubmitReview = async () => {
        if (!user) {
            setCurrentPage("login");
            return;
        }

        if (!reviewComment.trim()) {
            alert("Please enter a comment");
            return;
        }

        try {
            setSubmittingReview(true);
            await api.createReview(productId, reviewComment, reviewRating);
            setReviewComment("");
            setReviewRating(5);
            await loadProduct();
            alert("Review submitted successfully!");
        } catch (error: any) {
            console.error("Failed to submit review:", error);
            alert(error.message || "Failed to submit review");
        } finally {
            setSubmittingReview(false);
        }
    };

    const handleDeleteReview = async (reviewId: string) => {
        if (!window.confirm("Are you sure you want to delete this review?")) {
            return;
        }

        try {
            await api.deleteReview(reviewId);
            await loadProduct();
            alert("Review deleted successfully!");
        } catch (error: any) {
            console.error("Failed to delete review:", error);
            alert(error.message || "Failed to delete review");
        }
    };

    const renderStars = (
        rating: number,
        interactive: boolean = false,
        onRate?: (rating: number) => void
    ) => {
        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type={interactive ? "button" : undefined}
                        onClick={() => interactive && onRate && onRate(star)}
                        className={
                            interactive
                                ? "cursor-pointer transition hover:scale-110"
                                : ""
                        }
                        disabled={!interactive}
                    >
                        <Star
                            size={interactive ? 24 : 20}
                            className={
                                star <= rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                            }
                        />
                    </button>
                ))}
            </div>
        );
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Loading product...
                    </div>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center bg-white rounded-2xl shadow-lg p-12">
                        <p className="text-xl text-gray-500 mb-6">
                            Product not found
                        </p>
                        <button
                            onClick={() => setCurrentPage("products")}
                            className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold shadow-lg"
                        >
                            Back to Products
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    const averageRating =
        product.reviews && product.reviews.length > 0
            ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
              product.reviews.length
            : 0;

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 py-8">
                <button
                    onClick={() => setCurrentPage("products")}
                    className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 mb-6 font-bold transition"
                >
                    <ArrowLeft size={20} />
                    Back to Products
                </button>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    {/* Product Images */}
                    <div>
                        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl aspect-square flex items-center justify-center mb-4 shadow-lg overflow-hidden">
                            {product.images && product.images.length > 0 ? (
                                <img
                                    src={product.images[selectedImage].filePath}
                                    alt={product.title}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <Package
                                    size={64}
                                    className="text-indigo-300"
                                />
                            )}
                        </div>
                        {product.images && product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-2">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={img.id}
                                        onClick={() => setSelectedImage(idx)}
                                        className={`aspect-square rounded-lg overflow-hidden border-2 transition shadow-md ${
                                            selectedImage === idx
                                                ? "border-indigo-600 shadow-lg"
                                                : "border-gray-200 hover:border-indigo-300"
                                        }`}
                                    >
                                        <img
                                            src={img.filePath}
                                            alt={`${product.title} ${idx + 1}`}
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {product.title}
                        </h1>

                        {product.reviews && product.reviews.length > 0 && (
                            <div className="flex items-center gap-2 mb-4">
                                {renderStars(Math.round(averageRating))}
                                <span className="text-gray-600 font-medium">
                                    ({product.reviews.length}{" "}
                                    {product.reviews.length === 1
                                        ? "review"
                                        : "reviews"}
                                    )
                                </span>
                            </div>
                        )}

                        <div className="text-4xl font-bold bg-gradient-to-r from-amber-400 to-yellow-500 bg-clip-text text-transparent mb-6">
                            ${product.price.toLocaleString()}
                        </div>

                        <div className="mb-6 p-4 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                            <h2 className="font-bold text-lg mb-2 text-indigo-900">
                                Description
                            </h2>
                            <p className="text-gray-700 leading-relaxed">
                                {product.description}
                            </p>
                        </div>

                        <div className="mb-6 p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl">
                            <h2 className="font-bold text-lg mb-2 text-amber-900">
                                Size
                            </h2>
                            <p className="text-gray-700 font-medium">
                                {product.size}
                            </p>
                        </div>

                        {/* Quantity Selector */}
                        <div className="mb-6">
                            <h2 className="font-bold text-lg mb-3 text-slate-800">
                                Quantity
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="flex items-center border-2 border-indigo-200 rounded-lg shadow-md">
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(quantity - 1)
                                        }
                                        disabled={quantity <= 1}
                                        className="p-3 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-indigo-600"
                                    >
                                        <Minus size={20} />
                                    </button>
                                    <input
                                        type="number"
                                        value={quantity}
                                        onChange={(e) => {
                                            const val =
                                                parseInt(e.target.value) || 1;
                                            handleQuantityChange(val);
                                        }}
                                        className="w-20 text-center text-xl font-bold focus:outline-none"
                                        min="1"
                                        max="99"
                                    />
                                    <button
                                        onClick={() =>
                                            handleQuantityChange(quantity + 1)
                                        }
                                        disabled={quantity >= 99}
                                        className="p-3 hover:bg-indigo-50 transition disabled:opacity-50 disabled:cursor-not-allowed text-indigo-600"
                                    >
                                        <Plus size={20} />
                                    </button>
                                </div>
                                <div className="text-gray-600">
                                    Total:{" "}
                                    <span className="font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent text-xl">
                                        $
                                        {(
                                            product.price * quantity
                                        ).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
                        >
                            <ShoppingCart size={24} />
                            Add {quantity} {quantity === 1 ? "item" : "items"}{" "}
                            to Cart
                        </button>
                    </div>
                </div>

                {/* Reviews Section */}
                <div className="bg-white rounded-2xl shadow-lg p-8">
                    <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Customer Reviews
                    </h2>

                    {user ? (
                        <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border-l-4 border-indigo-500">
                            <h3 className="font-bold text-lg mb-4 text-indigo-900">
                                Write a Review
                            </h3>

                            <div className="mb-4">
                                <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                    Rating
                                </label>
                                {renderStars(
                                    reviewRating,
                                    true,
                                    setReviewRating
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block text-sm font-bold text-indigo-700 mb-2 uppercase tracking-wide">
                                    Comment
                                </label>
                                <textarea
                                    value={reviewComment}
                                    onChange={(e) =>
                                        setReviewComment(e.target.value)
                                    }
                                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none bg-white"
                                    rows={4}
                                    placeholder="Share your thoughts about this product..."
                                    required
                                />
                            </div>

                            <button
                                onClick={handleSubmitReview}
                                disabled={submittingReview}
                                className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:from-green-600 hover:to-emerald-700 transition font-bold disabled:opacity-50 shadow-lg"
                            >
                                {submittingReview
                                    ? "Submitting..."
                                    : "Submit Review"}
                            </button>
                        </div>
                    ) : (
                        <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl text-center border-l-4 border-amber-500">
                            <p className="text-gray-700 mb-4 font-medium">
                                Please login to write a review
                            </p>
                            <button
                                onClick={() => setCurrentPage("login")}
                                className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold shadow-lg"
                            >
                                Login
                            </button>
                        </div>
                    )}

                    {product.reviews && product.reviews.length > 0 ? (
                        <div className="space-y-6">
                            {product.reviews.map((review) => (
                                <div
                                    key={review.id}
                                    className="border-b border-gray-200 pb-6 last:border-b-0 hover:bg-gray-50 p-4 rounded-lg transition"
                                >
                                    <div className="flex items-start justify-between mb-2">
                                        <div>
                                            <div className="font-bold text-lg text-indigo-900">
                                                {review.user.firstName ||
                                                    review.user.phoneNumber}
                                            </div>
                                            {renderStars(review.rating)}
                                        </div>
                                        {user && user.id === review.user.id && (
                                            <button
                                                onClick={() =>
                                                    handleDeleteReview(
                                                        review.id
                                                    )
                                                }
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                                                aria-label="Delete review"
                                            >
                                                <Trash2 size={20} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-gray-700 leading-relaxed">
                                        {review.comment}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center py-8 font-medium">
                            No reviews yet. Be the first to review!
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductDetailPage;
