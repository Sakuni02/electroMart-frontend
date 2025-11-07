import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { useDispatch } from "react-redux";
import { addToCart } from "@/lib/features/cartSlice";
import { Link } from "react-router";

function SimpleProductCard({ product }) {
  const dispatch = useDispatch();

  return (
    <Link to={`/products/${product._id}`} className="no-underline text-inherit">
      <div className="bg-card rounded-2xl p-6 shadow-product border border-border group transform transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:border-blue-500">
        <div className="relative rounded-2xl aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover rounded-2xl transform transition-transform duration-500 group-hover:scale-105"
          />

          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 bg-background/80 backdrop-blur-sm  opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <Heart className="h-4 w-4" />
          </Button>

          <div className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="variant"
              className="w-full bg-blue-600"
              onClick={() =>
                dispatch(
                  addToCart({
                    _id: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  })
                )
              }
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="flex flex-col items-start !m-3 gap-3">
          <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>
          <div className="flex gap-1">
            <div className="w-4 h-4 rounded-full border border-border bg-pink-700" />
            <div className="w-4 h-4 rounded-full border border-border bg-orange-700" />
            <div className="w-4 h-4 rounded-full border border-border bg-blue-700" />
            <div className="w-4 h-4 rounded-full border border-border bg-green-700" />
            <span className="text-xs text-muted-foreground ml-1">+2</span>
          </div>

          <div className="flex gap-1">
            <div className="flex items-center gap-1">
              {/* Filled stars */}
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
              {/* Empty star */}
              <Star className="w-4 h-4 text-gray-400" />

              <span className="text-xs text-muted-foreground ml-1">(4.8)</span>
            </div>
          </div>

          <p className="mt-2 text-primary font-bold">LKR {product.price}</p>
        </div>
      </div>
    </Link>
  );
}

export default SimpleProductCard;
