import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleProductCard from "../components/SimpleProductCard";
import { useState } from "react";
import { motion } from "framer-motion";
import { useGetProductsByIdQuery } from "@/lib/api";
import { useParams } from "react-router";
import AddReviewDialog from "@/components/AddReviewDialog";
import { useDispatch } from "react-redux";
import { addItemToDB } from "@/lib/features/cartSlice";
import { useAuth } from "@clerk/clerk-react";
import { useNavigate } from "react-router";

function SingleProductView() {
  const { isSignedIn } = useAuth();
  const navigate = useNavigate();

  const { id } = useParams();
  const { data: product, isLoading, isError } = useGetProductsByIdQuery(id);

  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(null);

  if (isLoading) return <p>Loading...</p>;
  if (isError || !product) return <p>Product not found</p>;

  const images = product.images?.length ? product.images : [product.image];

  const averageRating =
    product.reviews && product.reviews.length > 0
      ? (
          product.reviews.reduce((acc, review) => acc + review.rating, 0) /
          product.reviews.length
        ).toFixed(1)
      : null;

  return (
    <div className="container">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[60vh] md:min-h-[80vh] items-center py-6">
        <div className="relative col-span-1 px-8 lg:px-18">
          <div className="flex flex-col-2 gap-2">
            <div className="col-span-1 space-y-2">
              {images.map((img, idx) => (
                <motion.div
                  key={idx}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border-2 cursor-pointer 
      ${selectedImage === img ? "border-blue-500" : "border-transparent"}`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img
                    src={img}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="col-span-1 aspect-square rounded-2xl overflow-hidden"
            >
              <img
                src={selectedImage || images[0]}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </div>
        <div className="col-span-1 px-8 lg:px-10 gap-4 flex flex-col">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <div className="flex gap-2 items-center">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-muted-foreground">
              {averageRating ? `(${averageRating})` : "(No reviews yet)"}
            </span>
          </div>
          <span className="text-3xl font-bold">$ {product.price}</span>
          <div>
            <span className="font-medium">Available Colors:</span>
            <div className="mt-3 flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-full border border-white"
                style={{ backgroundColor: product.colorId?.hex }}
              />

              <span className="text-lg font-medium capitalize">
                {product.colorId?.name}
              </span>
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
            <Button
              size="lg"
              className="w-full bg-blue-500"
              onClick={() => {
                if (!isSignedIn) {
                  navigate("/sign-in");
                  return;
                }
                dispatch(addItemToDB(product._id));
              }}
            >
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
            <div className="text-center py-8 px-4 flex flex-col items-start gap-4">
              <AddReviewDialog productId={product._id} />
            </div>

            <div className="px-4 mb-5">
              {product.reviews?.length > 0 ? (
                <div className="space-y-6">
                  {product.reviews.map((review) => (
                    <div
                      key={review._id}
                      className="p-4 border rounded-xl shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{review.name}</h3>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((s) => (
                            <Star
                              key={s}
                              className={`w-4 h-4 ${
                                s <= review.rating
                                  ? "text-yellow-500 fill-yellow-500"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-muted-foreground mt-2">
                        {review.review}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-muted-foreground text-center mb-4">
                  No reviews yet. Be the first one!
                </p>
              )}
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
