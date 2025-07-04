import { ProductCard } from "@/products";
import { products } from "@/products/data/products";

export default function ProductsPage() {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 ">
      { /* Product card */}
      {
        products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))
      }
    </div>
  );
}

