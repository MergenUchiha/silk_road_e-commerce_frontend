import {
    Category,
    Product,
    BasketItem,
    ShippingData,
    Order,
    RegisterData,
} from "../types";

const API_URL = "http://localhost:5005/api";

// Authentication
export const login = async (
    phoneNumber: string,
    password: string
): Promise<any> => {
    /* 
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phoneNumber, password })
  });
  return response.json();
  */
    return null;
};

export const register = async (userData: RegisterData): Promise<any> => {
    /*
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  });
  return response.json();
  */
    return null;
};

export const checkAuth = async (): Promise<any> => {
    /*
  const token = localStorage.getItem('token');
  if (!token) return null;
  
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
  */
    return null;
};

// Categories
export const getCategories = async (): Promise<Category[] | null> => {
    /*
  const response = await fetch(`${API_URL}/categories`);
  return response.json();
  */
    return null;
};

// Products
export const getProducts = async (
    categoryId: string | null = null
): Promise<Product[] | null> => {
    /*
  const url = categoryId 
    ? `${API_URL}/products?categoryId=${categoryId}`
    : `${API_URL}/products`;
  const response = await fetch(url);
  return response.json();
  */
    return null;
};

// Basket
export const getBasket = async (): Promise<BasketItem[] | null> => {
    /*
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/basket`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
  */
    return null;
};

export const addToBasket = async (
    productId: string,
    quantity: number = 1
): Promise<any> => {
    /*
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/basket/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ productId, quantity })
  });
  return response.json();
  */
    return null;
};

export const updateBasketItem = async (
    itemId: string,
    quantity: number
): Promise<any> => {
    /*
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/basket/update/${itemId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ quantity })
  });
  return response.json();
  */
    return null;
};

export const removeFromBasket = async (itemId: string): Promise<any> => {
    /*
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/basket/remove/${itemId}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
  */
    return null;
};

// Orders
export const createOrder = async (
    shippingData: ShippingData
): Promise<Order | null> => {
    /*
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(shippingData)
  });
  return response.json();
  */
    return null;
};

export const getOrders = async (): Promise<Order[] | null> => {
    /*
  const token = localStorage.getItem('token');
  const response = await fetch(`${API_URL}/orders`, {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  return response.json();
  */
    return null;
};
