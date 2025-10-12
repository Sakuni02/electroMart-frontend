function CheckoutItem({ item }) {
  return (
    <div className="flex gap-2 mt-2">
      <div className="flex-shrink-0">
        <img
          src={item.product.image}
          className="w-18 h-18 object-cover rounded-lg"
        />
      </div>
      <div className="flex-1">
        <h3 className="font-semibold hover:text-primary transition-colors">
          {item.product.name}
        </h3>

        <p className="text-sm text-muted-foreground">Space Black</p>

        <div className="flex">
          <span className="font-bold">{item.product.price}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutItem;
