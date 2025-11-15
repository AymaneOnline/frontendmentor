import { useState } from 'react';
import AddToCartButton from './AddToCartButton';

export default function ListItem({ product, cart, setCart }) {
    // find this product in the cart
    const cartItem = cart.find(item => item.name === product.name);
    const isAdded = Boolean(cartItem);
    const quantity = cartItem ? cartItem.quantity : 0;

    function handleAddToCart() {
        setCart(prevCart => {
            const existingProduct = prevCart.find(item => item.name === product.name);

            if (existingProduct) {
            // increase quantity if product already exists
            return prevCart.map(item =>
                item.name === product.name
                ? { ...item, quantity: item.quantity + 1 }
                : item
            );
            } else {
            // add new product with quantity 1
            return [...prevCart, { ...product, quantity: 1 }];
            }
        });
    }

    function handleRemoveFromCart() {
        setCart(prevCart =>
            prevCart
            .map(item =>
                item.name === product.name
                ? { ...item, quantity: item.quantity - 1 }
                : item
            )
            .filter(item => item.quantity > 0)
        );
    }

    function handleSetQuantity(newQuantity) {
        setCart(prevCart =>
            prevCart.map(item =>
                item.name === product.name ? { ...item, quantity: newQuantity } : item
            )
        );
    }

    return (
        <li 
        key={product.name}
        className='list-none'>
            <div className='relative mb-9'>
                <img 
                src={product.image.mobile}
                alt={product.name}
                className={`w-full h-auto rounded-lg shadow-sm
                    ${isAdded ? 'outline-3 outline-[hsl(14,86%,42%)]' : ''}`}
                />
                <AddToCartButton
                    isAdded={isAdded} 
                    quantity={quantity} 
                    onAdd={handleAddToCart}
                    onRemove={handleRemoveFromCart}
                    onSetQuantity={handleSetQuantity}
                />
            </div>

            <div>
                <span className='text-gray-500'>{product.category}</span>
                <h2 className='font-semibold text-lg'>{product.name}</h2>
                <span className='font-semibold text-[hsl(14,86%,42%)]'>${product.price.toFixed(2)}</span>
            </div>
        </li>
    );
}