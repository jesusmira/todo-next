import { ItemCard } from "@/app/shopping-cart";
import { WidgetItem } from "@/components";
import { products, type Product } from "@/products/data/products";
import { cookies } from "next/headers";

export const metadata = {
 title: 'Productos en Carrito',
 description: 'Carrito de compras de productos',
};
interface ProductInCart {
    product: Product;
    quantity: number;
}

const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    const productsInCart: ProductInCart[] = [];
    for (const id of Object.keys(cart)) {
        const product = products.find(prod => prod.id === id);
        if (product) {
            productsInCart.push({ product, quantity: cart[id] });
        }
    }
    return productsInCart;
}


export default  async function CartPage() {

    const cookieStore = await cookies();
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [id: string]: number };
    const productsInCart = getProductsInCart(cart);

    const totalToPay = productsInCart.reduce(
      (prev, current) => ( current.product.price * current.quantity ) + prev, 0
    );

  return (
    <div>
      <h1 className="text-5xl font-bold">Productos en el Carrito</h1>
      <hr className="mb-2" />

      <div className="flex flex-col gap-2 sm:flex-row w-full">
        <div className="flex flex-col gap-2 w-full sm:w-8/12">
            {
               productsInCart.map( item => (
                <ItemCard key={item.product.id} product={item.product} quantity={item.quantity} />
               )) 

            }

        </div>
        <div className="flex flex-col w-full sm:w-4/12">
            <WidgetItem title="Total a pagar">
              <div className ="mt-2 flex justify-center gap-4">
                <h3 className="text-3xl font-bold text-gray-700">${ (totalToPay * 1.15).toFixed(2) }</h3>
              </div>
              <span className="font-bold text-center text-gray-500">Impuestos 15% : ${ (totalToPay * 0.15).toFixed(2) }</span>
            </WidgetItem>
        </div>
      </div>
    </div>
  );
}