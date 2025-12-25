import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const ViewItemsDialog = ({ items }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          View
        </Button>
      </DialogTrigger>

      <DialogContent className="w-[95vw] sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Ordered Items</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4 max-h-[60vh] overflow-y-auto">
          {items.map((item) => (
            <div
              key={item._id}
              className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg p-3"
            >
              <img
                src={item.productId?.images?.[0]}
                alt={item.productId?.name}
                className="w-full sm:w-40 h-40 rounded object-cover border"
              />

              <div className="flex flex-col text-center sm:text-left">
                <span className="font-medium text-lg">
                  {item.productId?.name ?? "Deleted product"}
                </span>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>Qty: {item.quantity}</span>
                  <span>•</span>
                  <span>${item.productId?.price}</span>
                </div>

                {item.productId?.colorId && (
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      color:
                    </span>
                    <span className="text-xs font-medium">
                      {item.productId.colorId.name}
                    </span>
                    {item.productId.colorId.hex && (
                      <span
                        className="w-5 h-5 rounded-full border-3"
                        style={{ backgroundColor: item.productId.colorId.hex }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewItemsDialog;
