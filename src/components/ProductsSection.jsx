import { ArrowRight } from "lucide-react";
import SimpleProductCard from "./SimpleProductCard";
import { Button } from "./ui/button";

function ProductSesction() {
  return (
    <div className="container text-center min-h-[60vh] md:min-h-[80vh] items-center">
      <h2 className="text-4xl font-bold py-2">Featured Products</h2>
      <p className="text-lg text-muted-foreground py-2">
        Hand-picked favorites from our collection
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:px-20 px-5 mt-8">
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
      </div>

      <div className="flex gap-2 justify-center items-center mt-5">
        <Button variant="outline" size="lg" className="bg-blue-500 px-5">
          View All Products
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}

export default ProductSesction;
