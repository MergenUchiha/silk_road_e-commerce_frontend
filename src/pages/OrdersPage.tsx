import React, { useState, useEffect } from "react";
import {
    Package,
    Calendar,
    MapPin,
    DollarSign,
    Eye,
    ArrowLeft,
    X,
} from "lucide-react";
import { Order } from "../types";
import * as api from "../services/api";

interface OrdersPageProps {
    setCurrentPage: (page: string) => void;
}

const OrdersPage: React.FC<OrdersPageProps> = ({ setCurrentPage }) => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(
        null
    );

    useEffect(() => {
        loadOrders();
    }, []);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const ordersData = await api.getMyOrders();
            console.log("Orders loaded:", ordersData);
            setOrders(ordersData);
        } catch (error) {
            console.error("Failed to load orders:", error);
            alert("Failed to load orders");
        } finally {
            setLoading(false);
        }
    };

    const handleCancelOrder = async (orderId: string) => {
        if (!window.confirm("Are you sure you want to cancel this order?")) {
            return;
        }

        try {
            setCancellingOrderId(orderId);
            await api.cancelOrder(orderId);
            alert("Order cancelled successfully!");
            await loadOrders();
            if (selectedOrder?.id === orderId) {
                setSelectedOrder(null);
            }
        } catch (error: any) {
            console.error("Failed to cancel order:", error);
            alert(error.message || "Failed to cancel order");
        } finally {
            setCancellingOrderId(null);
        }
    };

    const getStatusColor = (status: Order["status"]) => {
        switch (status) {
            case "PROCESSING":
                return "bg-blue-100 text-blue-800 border-blue-300";
            case "COMPLETED":
                return "bg-green-100 text-green-800 border-green-300";
            case "CANCELLED":
                return "bg-red-100 text-red-800 border-red-300";
            default:
                return "bg-gray-100 text-gray-800 border-gray-300";
        }
    };

    const getStatusText = (status: Order["status"]) => {
        switch (status) {
            case "PROCESSING":
                return "Processing";
            case "COMPLETED":
                return "Completed";
            case "CANCELLED":
                return "Cancelled";
            default:
                return status;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
        });
    };

    const canCancelOrder = (order: Order) => {
        return order.status === "PROCESSING";
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 py-16">
                    <div className="text-center text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                        Loading orders...
                    </div>
                </div>
            </div>
        );
    }

    if (selectedOrder) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 mb-6 font-bold transition"
                    >
                        <ArrowLeft size={20} />
                        Back to Orders
                    </button>

                    <div className="bg-white rounded-2xl shadow-lg p-8">
                        <div className="flex items-start justify-between mb-6 pb-6 border-b">
                            <div>
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
                                    Order Details
                                </h1>
                                <p className="text-gray-600">
                                    Order ID: {selectedOrder.id.slice(0, 8)}...
                                </p>
                            </div>
                            <div className="flex flex-col items-end gap-3">
                                <div
                                    className={`px-4 py-2 rounded-full border-2 font-bold ${getStatusColor(
                                        selectedOrder.status
                                    )}`}
                                >
                                    {getStatusText(selectedOrder.status)}
                                </div>
                                {canCancelOrder(selectedOrder) && (
                                    <button
                                        onClick={() =>
                                            handleCancelOrder(selectedOrder.id)
                                        }
                                        disabled={
                                            cancellingOrderId ===
                                            selectedOrder.id
                                        }
                                        className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <X size={18} />
                                        {cancellingOrderId === selectedOrder.id
                                            ? "Cancelling..."
                                            : "Cancel Order"}
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Shipping Info */}
                        <div className="mb-8 p-6 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl">
                            <h2 className="font-bold text-xl mb-4 text-indigo-900 flex items-center gap-2">
                                <MapPin size={24} />
                                Shipping Information
                            </h2>
                            <div className="space-y-2 ml-8">
                                <p className="text-gray-700">
                                    <span className="font-semibold">City:</span>{" "}
                                    {selectedOrder.shipping.city}
                                </p>
                                <p className="text-gray-700">
                                    <span className="font-semibold">
                                        Address:
                                    </span>{" "}
                                    {selectedOrder.shipping.street}
                                </p>
                                <p className="text-gray-700 flex items-center gap-2">
                                    <Calendar size={18} />
                                    <span className="font-semibold">
                                        Delivery Date:
                                    </span>{" "}
                                    {formatDate(
                                        selectedOrder.shipping.dateOfDelivery
                                    )}
                                </p>
                            </div>
                        </div>

                        {/* Order Items */}
                        <div className="mb-8">
                            <h2 className="font-bold text-xl mb-4 text-slate-800">
                                Order Items
                            </h2>
                            <div className="space-y-4">
                                {selectedOrder.orderItems.map((item) => (
                                    <div
                                        key={item.id}
                                        className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
                                    >
                                        <div className="w-20 h-20 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg flex-shrink-0 flex items-center justify-center">
                                            {item.product.images &&
                                            item.product.images.length > 0 ? (
                                                <img
                                                    src={
                                                        item.product.images[0]
                                                            .filePath
                                                    }
                                                    alt={item.product.title}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            ) : (
                                                <Package
                                                    size={32}
                                                    className="text-gray-400"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-bold text-lg">
                                                {item.product.title}
                                            </h3>
                                            <p className="text-gray-600">
                                                $
                                                {item.product.price.toLocaleString()}{" "}
                                                × {item.quantity}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-bold text-xl text-indigo-600">
                                                $
                                                {(
                                                    item.product.price *
                                                    Number(item.quantity)
                                                ).toLocaleString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Total */}
                        <div className="border-t pt-6">
                            <div className="flex items-center justify-between text-2xl font-bold">
                                <span className="text-slate-800 flex items-center gap-2">
                                    <DollarSign size={28} />
                                    Total Amount:
                                </span>
                                <span className="text-indigo-600">
                                    ${selectedOrder.totalPrice.toLocaleString()}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="relative bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-800 overflow-hidden py-16">
                <div className="absolute inset-0 opacity-10">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage:
                                'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
                        }}
                    ></div>
                </div>

                <div className="max-w-7xl mx-auto px-4 text-center relative z-10">
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-200 bg-clip-text text-transparent mb-4">
                        My Orders
                    </h1>
                    <p className="text-indigo-200 text-lg">
                        Track and manage your order history
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-4 py-8">
                <button
                    onClick={() => setCurrentPage("home")}
                    className="flex items-center gap-2 text-indigo-600 hover:text-purple-600 mb-6 font-bold transition"
                >
                    <ArrowLeft size={20} />
                    Back to Home
                </button>

                {orders.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
                        <div className="w-32 h-32 bg-gradient-to-br from-gray-200 to-gray-300 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Package size={64} className="text-gray-400" />
                        </div>
                        <h2 className="text-3xl font-bold mb-4 text-slate-800">
                            No Orders Yet
                        </h2>
                        <p className="text-gray-600 mb-8 text-lg">
                            Start shopping to see your orders here
                        </p>
                        <button
                            onClick={() => setCurrentPage("products")}
                            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold text-lg shadow-lg"
                        >
                            <Package size={20} />
                            Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {orders.map((order) => (
                            <div
                                key={order.id}
                                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h3 className="font-bold text-xl text-slate-800 mb-2">
                                            Order #{order.id.slice(0, 8)}
                                        </h3>
                                        <div className="flex items-center gap-4 text-gray-600">
                                            <span className="flex items-center gap-1">
                                                <Calendar size={16} />
                                                {formatDate(
                                                    order.shipping
                                                        .dateOfDelivery
                                                )}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Package size={16} />
                                                {order.orderItems.length}{" "}
                                                {order.orderItems.length === 1
                                                    ? "item"
                                                    : "items"}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className={`px-4 py-2 rounded-full border-2 font-bold text-sm ${getStatusColor(
                                            order.status
                                        )}`}
                                    >
                                        {getStatusText(order.status)}
                                    </div>
                                </div>

                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-2xl font-bold text-indigo-600">
                                        ${order.totalPrice.toLocaleString()}
                                    </div>
                                    <div className="flex gap-3">
                                        {canCancelOrder(order) && (
                                            <button
                                                onClick={() =>
                                                    handleCancelOrder(order.id)
                                                }
                                                disabled={
                                                    cancellingOrderId ===
                                                    order.id
                                                }
                                                className="flex items-center gap-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                <X size={18} />
                                                {cancellingOrderId === order.id
                                                    ? "Cancelling..."
                                                    : "Cancel"}
                                            </button>
                                        )}
                                        <button
                                            onClick={() =>
                                                setSelectedOrder(order)
                                            }
                                            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition font-bold shadow-md"
                                        >
                                            <Eye size={18} />
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
