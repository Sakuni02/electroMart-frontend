import { ArrowRight } from "lucide-react";
import SimpleProductCard from "./SimpleProductCard";
import { Button } from "./ui/button";
import { useGetAllProductsQuery } from "@/lib/api";

function ProductSesction() {
  const { data: products, isLoading, isError } = useGetAllProductsQuery();

  if (isLoading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  if (isError) {
    return (
      <p className="text-center py-10 text-red-500">Failed to load products</p>
    );
  }

  return (
    <div className="container text-center min-h-[60vh] md:min-h-[80vh] items-center">
      <h2 className="text-4xl font-bold py-2">Featured Products</h2>
      <p className="text-lg text-muted-foreground py-2">
        Hand-picked favorites from our collection
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-20 px-5 mt-8">
        {products.map((product) => (
          <SimpleProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex gap-2 justify-center items-center mt-5 mb-8">
        <Button variant="outline" size="lg" className="bg-blue-500 px-5">
          View All Products
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ProductSesction;
