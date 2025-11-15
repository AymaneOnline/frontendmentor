export default function Cart({ cart, handleRemoveFromCart, confirmOrder }) {

    return (
        <aside aria-labelledby="cart-heading" className='lg:min-w-[375px] m-6 lg:mb-auto flex flex-col items-center px-6 py-8 bg-white rounded-lg shadow-sm lg:my-16 lg:me-16'>
            <h2 id="cart-heading" className='mb-8 self-start font-bold text-2xl text-[hsl(14,86%,42%)]'>Your Cart <span className="sr-only">contains</span> <span aria-live="polite">{cart.length} items</span></h2>
            {cart.length === 0 ? (
            <>
                <img className='mb-4' src="./assets/images/illustration-empty-cart.svg" alt="Your Cart is Empty" />
                <p className='font-semibold text-[hsl(12,20%,44%)]'>Your added items will appear here</p>
            </>
            ) : (
            <>
                <ul className="w-full">
                    {cart.map(product => (
                        <li className="flex items-center justify-between mb-4 border-b border-b-gray-300 pb-4" key={product.name}>
                            <div className="min-w-0">
                                <h3 className="font-semibold truncate" title={product.name}>{product.name}</h3>
                                <span className="text-gray-500">
                                   {product.quantity} × ${product.price.toFixed(2)}
                                </span>
                            </div>
                            <button
                            type="button"
                            aria-label={`Remove ${product.name} from cart`}
                            className="cursor-pointer"
                            onClick={() => handleRemoveFromCart(product.name)}
                            >
                                <img className="p-[2px] border-2 border-gray-400 rounded-full min-w-[2px] min-h-[20px]" src="assets/images/icon-remove-item.svg" alt="" aria-hidden="true" />
                            </button>
                        </li>
                    ))}
                </ul>
                <div className="flex justify-between items-center w-full my-6">
                    <p className="font-medium text-gray-500">Order Total</p>
                    <p className="font-bold text-3xl">${cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}</p>
                </div>
                <p className="w-full flex justify-center items-center bg-rose-50 py-2 rounded-lg">
                    <img className="me-2" src="./assets/images/icon-carbon-neutral.svg" alt="" aria-hidden="true" />
                    This is a <span className="font-semibold mx-1">carbon-neutral</span> delivery
                </p>
                <button 
                type="button"
                className="w-full py-4 mt-8 text-xl font-medium text-white bg-[hsl(14,86%,42%)] rounded-full cursor-pointer hover:bg-[hsl(14,86%,25%)] focus:bg-[hsl(14,86%,25%)]"
                onClick={() => {
                    confirmOrder();
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }} 
                aria-haspopup="dialog"
                aria-controls="order-confirmation"
                >
                    Confirm Order
                </button>
            </>
            )}
        </aside>
    );
}