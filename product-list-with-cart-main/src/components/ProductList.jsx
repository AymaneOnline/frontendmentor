import ListItem from './ListItem';

export default function ProductList( { products, cart, setCart } ) {

    return (
        <div className='m-6 lg:my-12 lg:ms-16'>
            <h1 className='font-bold text-4xl mb-10 text-black'>Desserts</h1>
            <ul className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 mb-10'>
                {products.map(product => {
                return (<ListItem key={product.name} product={product} cart={cart} setCart={setCart}/>);
                })}
            </ul>
        </div>

    );
}