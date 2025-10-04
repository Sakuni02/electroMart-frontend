import { Heart, Minus, Plus, ShoppingCart, Star } from "lucide-react";
import { Button } from "../components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import SimpleProductCard from "../components/SimpleProductCard";
import { useState } from "react";
import { motion } from "framer-motion";

function SingleProductView() {
  const images = [
    "assets/images/audio.jpg",
    "assets/images/audio1.jpg",
    "assets/images/audio2.jpg",
  ];

  const [getSelectedImage, setSelectedImage] = useState(images[0]);

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
                    getSelectedImage === img
                      ? "border-blue-500"
                      : "border-transparent"
                  }`}
                  onClick={() => setSelectedImage(img)}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                />
              ))}

              {/* <img
                src="assets/images/phone-1.jpg"
                alt="Product Name"
                className="h-25 w-25 object-cover rounded-2xl"
              />

              <img
                src="assets/images/phone-1.jpg"
                alt="Product Name"
                className="h-25 w-25 object-cover rounded-2xl"
              />
              <img
                src="assets/images/phone-1.jpg"
                alt="Product Name"
                className="h-25 w-25 object-cover rounded-2xl"
              /> */}
            </div>
            <motion.div
              key={getSelectedImage}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="col-span-1"
            >
              <img
                src={getSelectedImage}
                alt="Selected Product"
                className="h-full w-full object-cover rounded-2xl shadow-lg"
              />
            </motion.div>
          </div>
        </div>
        <div className="col-span-1 px-8 lg:px-10 gap-4 flex flex-col">
          <h1 className="text-3xl font-bold">iPhone 15 Pro Max 256GB</h1>
          <div className="flex gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
            <span className="text-sm text-muted-foreground">(4.8)</span>
          </div>
          <span className="text-3xl font-bold">$1199</span>
          <div>
            <span className="font-medium">Available Colors:</span>
            <div className="flex gap-1 mt-3">
              <div className="w-8 h-8 rounded-full border border-border bg-pink-700" />
              <div className="w-8 h-8 rounded-full border border-border bg-orange-700" />
              <div className="w-8 h-8 rounded-full border border-border bg-blue-700" />
              <div className="w-8 h-8 rounded-full border border-border bg-green-700" />
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

          <p className="text-lg text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip
          </p>
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
            <p className="text-muted-foreground">
              Experience cutting-edge technology with this premium device.
              Featuring advanced capabilities and sleek design, this product
              delivers exceptional performance for all your daily needs.
            </p>
          </TabsContent>
          <TabsContent value="specifications">
            <div className="grid lg:grid-cols-2">
              <div>
                <h4 className="font-semibold mb-3 mt-3">Technical Specs</h4>
                <div className="text-sm">
                  <div className="flex justify-between mb-3 mt-3">
                    <span className="text-muted-foreground">Category:</span>
                    <span className="capitalize">Phone</span>
                  </div>
                  <div className="flex justify-between mb-3 mt-3">
                    <span className="text-muted-foreground">Rating:</span>
                    <span>/5</span>
                  </div>
                  <div className="flex justify-between mb-3 mt-3">
                    <span className="text-muted-foreground">
                      Colors Available:
                    </span>
                    <span>red</span>
                  </div>
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:px-20 px-5 mt-8 mb-8">
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
        <SimpleProductCard />
      </div>
    </div>
  );
}

export default SingleProductView;
