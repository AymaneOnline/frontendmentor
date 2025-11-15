import { useState, useEffect, useRef } from 'react';
import ProductList from './ProductList';
import Cart from './Cart';

export default function Shop({ products }) {
    const [cart, setCart] = useState([]);
    const [orderConfirmed, setOrderConfirmed] = useState(false);
    const modalRef = useRef(null);
    const previouslyFocusedElement = useRef(null);

    const removeFromCart = (name) => {
        setCart(prevCart => prevCart.filter(item => item.name !== name));
    };

    const confirmOrder = () => {
        setOrderConfirmed(true);
        console.log("Order confirmed:", cart);
    }

    useEffect(() => {
        if (orderConfirmed) {
            document.body.style.overflow = 'hidden';
            // save previously focused element and move focus to modal
            previouslyFocusedElement.current = document.activeElement;
            setTimeout(() => modalRef.current?.focus?.(), 0);
        } else {
            document.body.style.overflow = '';
        }
        // Clean up on unmount
        return () => {
            document.body.style.overflow = '';
        };
    }, [orderConfirmed]);

    // Close modal on Escape and trap focus inside modal when open
    useEffect(() => {
        function handleKeyDown(e) {
            if (!orderConfirmed) return;
            if (e.key === 'Escape') {
                setOrderConfirmed(false);
            } else if (e.key === 'Tab') {
                // basic focus trap
                const focusable = modalRef.current?.querySelectorAll?.('a, button, input, [tabindex]:not([tabindex="-1"])') || [];
                if (focusable.length === 0) {
                    e.preventDefault();
                    return;
                }
                const first = focusable[0];
                const last = focusable[focusable.length - 1];
                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [orderConfirmed]);

    return (
        <div className='relative h-[100svh]'>
        <div className={`relative bg-rose-50 `}>

            {cart.length !== 0 && orderConfirmed === true && (
                <div className='absolute w-full h-full z-10 bg-[rgba(0,0,0,.5)]'></div>
            )}
            
            <div className='w-full flex flex-col lg:flex-row gap-9'>
                <ProductList products={products} cart={cart} setCart={setCart}/>
                <Cart cart={cart} handleRemoveFromCart={removeFromCart} confirmOrder={confirmOrder} />
            </div>

        </div>

    {cart.length !== 0 && orderConfirmed === true && (
        <div
        id="order-confirmation"
        role="dialog"
        aria-modal="true"
        ref={modalRef}
        tabIndex={-1}
        className={`absolute max-h-[100svh] w-full z-10 p-6 bg-white bottom-0 overflow-y-auto
        lg:max-w-lg lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-lg lg:shadow-lg 
        lg:bottom-[unset] lg:max-h-[80svh]`}>
            <img className='mb-6' src="assets/images/icon-order-confirmed.svg" alt="Order confirmed icon" />
            <h2 className='font-bold text-4xl max-w-[9ch] mb-2 sm:max-w-none'>Order Confirmed</h2>
                    <p className='mb-6 text-gray-500'>We hope you enjoy your food!</p>

                    <div className='bg-rose-50 p-6 mb-8 rounded-lg'>
                        <ul className='mb-6'>
                            {cart.map(product => (
                                <li className="flex items-center mb-4 border-b border-b-gray-300 pb-4" key={product.name}>
                                    <img className='w-14 rounded-md' src={product.image.thumbnail} alt={product.name} />
                                    <div className='mx-4 min-w-0'>
                                        <h3 className="font-semibold text-sm truncate">{product.name}</h3>
                                        <p className="text-gray-500">
                                        <span className='text-red-400 font-bold text-md me-4'>{product.quantity}x</span> ${product.price.toFixed(2)}
                                        </p>
                                    </div>
                                    <p className='font-medium text-md ms-auto'>
                                        ${(product.price * product.quantity).toFixed(2)}
                                    </p>
                                </li>
                            ))}
                        </ul>

                        <div className="flex justify-between items-center w-full">
                            <p className="font-medium text-gray-500">Order Total</p>
                            <p className="font-bold text-3xl">${cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p>
                        </div>
                    </div>


                    <button 
                    type="button"
                    className='bg-[hsl(14,86%,42%)] text-white w-full py-4 rounded-full hover:bg-[hsl(14,97%,36%)] transition-colors cursor-pointer'
                    onClick={() => {
                        setCart([]);
                        setOrderConfirmed(false);
                        // restore focus to previously focused element
                        setTimeout(() => previouslyFocusedElement.current?.focus?.(), 0);
                    }}>
                        Start New Order
                    </button>
                </div>
        )}
        </div>
    );
}