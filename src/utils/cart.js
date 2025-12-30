// Cart utility functions for localStorage management

const CART_KEY = "shopping_cart";

export const getCart = () => {
    if (typeof window === "undefined") return [];
    const cart = localStorage.getItem(CART_KEY);
    return cart ? JSON.parse(cart) : [];
};

export const addToCart = (product, quantity = 1) => {
    const cart = getCart();
    const existingItem = cart.find((item) => item.id === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
        if (existingItem.quantity > product.stock) {
            existingItem.quantity = product.stock;
        }
    } else {
        cart.push({
            ...product,
            quantity: Math.min(quantity, product.stock),
        });
    }

    localStorage.setItem(CART_KEY, JSON.stringify(cart));
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
    }
    return cart;
};

export const removeFromCart = (productId) => {
    const cart = getCart();
    const updatedCart = cart.filter((item) => item.id !== productId);
    localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
    }
    return updatedCart;
};

export const updateQuantity = (productId, quantity) => {
    const cart = getCart();
    const item = cart.find((item) => item.id === productId);

    if (item) {
        item.quantity = Math.max(1, Math.min(quantity, item.stock));
        localStorage.setItem(CART_KEY, JSON.stringify(cart));
        if (typeof window !== "undefined") {
            window.dispatchEvent(new Event("cart-updated"));
        }
    }

    return cart;
};

export const clearCart = () => {
    localStorage.removeItem(CART_KEY);
    if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("cart-updated"));
    }
    return [];
};

export const getCartTotal = () => {
    const cart = getCart();
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
};

export const getCartCount = () => {
    const cart = getCart();
    return cart.reduce((count, item) => count + item.quantity, 0);
};
