import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  const productsList = products.map((product) => {
    return <ProductCard key={product.id + product.title} product={product} />;
  });
  return (
    <div className=" grid md:justify-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 p-6">
      {productsList}
    </div>
  );
}
