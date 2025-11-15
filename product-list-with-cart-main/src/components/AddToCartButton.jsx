export default function AddToCartButton({ isAdded, quantity, onAdd, onRemove, onSetQuantity }) {
    function handleInputChange(e) {
        const value = Number(e.target.value);
        if (value <= 0) {
            onRemove(); // remove if set to 0
        } else if (value <= 99) {
            // set the quantity directly in cart
            onSetQuantity(value);
        }
    }

    return (
        <>
            <button 
            onClick={() => {
                onAdd();
            }}
            className={`justify-center items-center w-[160px] h-[48px] gap-2 font-semibold bg-white 
                text-gray-700 border border-[hsl(14,25%,72%)] rounded-[3rem] cursor-pointer hover:text-green-500 
                transition-colors shadow-sm absolute bottom-[-24px] left-1/2 -translate-x-1/2
                ${isAdded ? 'hidden' : 'flex'}`}
            aria-pressed={isAdded}>
            
                <img src="./assets/images/icon-add-to-cart.svg" alt="Add to Cart" />
                Add to Cart
            </button>

           <div className={`flex justify-around items-center gap-2 w-[160px] h-[48px] bg-[hsl(14,86%,42%)] rounded-[3rem] 
                shadow-sm absolute bottom-[-24px] left-1/2 -translate-x-1/2
                ${isAdded ? 'flex' : 'hidden'}`}>
                
                <button 
                onClick={() => {
                    onRemove();
                }} 
                className='min-w-[20px] min-h-[20px] flex justify-center items-center border-2 border-white rounded-full cursor-pointer'
                aria-label="Decrease quantity">
                    <img src="./assets/images/icon-decrement-quantity.svg" alt="Decrement quantity" />
                </button>

                {isAdded && (
                    <input className='w-[2ch] text-center font-semibold text-white appearance-none' 
                    onChange={handleInputChange}
                    type="number" 
                    max="99"
                    min="1"
                    value={quantity}/>
                )}
                
                <button 
                onClick={() => {
                    onAdd();
                }} 
                className='min-w-[20px] min-h-[20px] flex justify-center items-center border-2 border-white rounded-full cursor-pointer'
                aria-label="Increase quantity">
                    <img src="./assets/images/icon-increment-quantity.svg" alt="Increment quantity" />
                </button>
                
           </div>
        </>
    );
}