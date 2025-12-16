import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import { useDispatch } from "react-redux";
import { removeItemFromDB, updateQuantityInDB } from "@/lib/features/cartSlice";

function CartItem({ item }) {
  const dispatch = useDispatch();

  return (
    <div className="!mt-5 bg-card rounded-2xl !p-6 border border-border group transform transition-all duration-300 hover:shadow-[0_10px_20px_rgba(59,130,246,0.3)] hover:border-blue-500">
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
        <div className="flex-shrink-0">
          <img
            src={item.product.images[0]}
            className="w-full sm:w-24 sm:h-24 md:w-25 md:h-25 object-cover rounded-lg"
            alt={item.product.name}
          />
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <a href={`/product/`}>
            <h3 className="!py-2 font-semibold hover:text-primary transition-colors">
              {item.product.name}
            </h3>
          </a>

          <p className="text-sm text-muted-foreground">Color: Space Black</p>

          <div className="flex items-center gap-2 !py-2">
            <span className="font-bold"> {item.product.price}</span>

            <span className="text-sm text-muted-foreground">
              Quantity: {item.quantity}
            </span>
          </div>
        </div>

        <div className="flex flex-row sm:flex-col items-start sm:items-end gap-2 mt-4 sm:mt-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => dispatch(removeItemFromDB(item.product._id))}
          >
            <Trash2 className="h-4 w-4" />
          </Button>

          <div className="flex gap-2 sm:gap-3 items-center mt-2 sm:mt-3">
            <div className="flex items-center border border-border rounded-lg">
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  dispatch(
                    updateQuantityInDB({
                      productId: item.product._id,
                      quantity: item.quantity - 1,
                    })
                  )
                }
                disabled={item.quantity === 1}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-3 py-2 min-w-[50px] text-center text-sm sm:text-base">
                {" "}
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() =>
                  dispatch(
                    updateQuantityInDB({
                      productId: item.product._id,
                      quantity: item.quantity + 1,
                    })
                  )
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default CartItem;
