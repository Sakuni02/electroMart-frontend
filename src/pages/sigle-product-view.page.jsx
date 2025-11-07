import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleProductCard from "../components/SimpleProductCard";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGetProductsByIdQuery } from "@/lib/api";
import { useParams } from "react-router";

function SingleProductView() {
  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductsByIdQuery(id);

  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found</p>;

  const images = product.images?.length ? product.images : [product.image];

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] md:min-h-[80vh] items-center py-6">
        <div className="relative col-span-1 px-8 lg:px-18">
          <div className="flex flex-col-2 gap-2">
            <div className="col-span-1 space-y-2">
              {images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={`Thumbnail ${idx + 1}`}
                  className={`h-24 w-24 object-cover rounded-2xl cursor-pointer border-2 
                  ${
                    selectedImage === img
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              ))}
            </div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="col-span-1"
            >
              <img
                src={selectedImage || images[0]}
                alt={product.name}
                className="h-full w-full object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
        <div className="col-span-1 px-8 lg:px-10 gap-4 flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-muted-foreground">(4.8)</span>
          </div>
          <span className="text-3xl font-bold">LKR {product.price}</span>
          <div>
            <span className="font-medium">Available Colors:</span>
            <div className="flex gap-1 mt-3">
              <div className="w-8 h-8 rounded-full border border-border bg-pink-700" />
            </div>
          </div>

          <div>
            <span className="font-medium">Quantity</span>
            <div className="flex gap-3 items-center mt-3">
              <div className="flex items-center border border-border rounded-lg">
                <Button variant="ghost" size="icon">
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 min-w-[60px] text-center">5</span>
                <Button variant="ghost" size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <Button size="lg" className="w-full bg-blue-500">
              <ShoppingCart className="h-4 w-4" />
              Add to Cart
            </Button>

            <Button size="lg" className="w-full" variant="outline">
              <Heart className="h-4 w-4" />
              Add to wishlist
            </Button>
          </div>
        </div>
      </div>

      <div className="px-8 lg:px-18">
        <Tabs defaultValue="description">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="p-8">
            <p className="text-lg text-muted-foreground">
              {product.description}
            </p>
          </TabsContent>
          <TabsContent value="specifications">
            <div className="grid lg:grid-cols-2">
              <div>
                <div className="text-sm">
                  {Array.isArray(product.specifications) ? (
                    product.specifications.map((spec) => (
                      <div
                        key={spec._id || spec.key}
                        className="flex justify-between mb-3 mt-3 capitalize"
                      >
                        {" "}
                        <span className="text-muted-foreground">
                          {spec.key}:
                        </span>
                        <span>{spec.value}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">not found</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="text-center py-8">
              <p className="text-muted-foreground">Reviews coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:px-20 px-5 mt-8 mb-8">
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
      </div> */}
    </div>
  );
}

export default SingleProductView;
