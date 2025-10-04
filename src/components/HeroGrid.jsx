import { ArrowRight, Shield, Truck, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

function HeroGrid() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">
      {/* Text */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative col-span-1 px-6 lg:px-12"
      >
        <h1 className="text-4xl lg:text-6xl font-bold">
          Latest Tech at{" "}
          <span className="bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
            Electric Prices
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-4 text-xl text-muted-foreground max-w-lg"
        >
          Discover cutting-edge smartphones, accessories, and gadgets with
          premium quality and unbeatable prices.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="gap-4 flex flex-col sm:flex-row mt-6"
        >
          <Button
            size="lg"
            asChild
            className="px-9 py-6 bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600 focus:ring-4 focus:ring-indigo-300 dark:focus:ring-indigo-800"
          >
            <a href="/category/smartphones">
              Shop Now <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
          <Button variant="secondary" size="lg" asChild className="px-9 py-6">
            <a href="/category/accessories">Browse Accessories</a>
          </Button>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="gap-8 flex flex-row mt-10 justify-center"
        >
          {[
            {
              icon: <Zap className="h-6 w-6 text-white" />,
              text: "Fast Delivery",
            },
            {
              icon: <Truck className="h-6 w-6 text-white" />,
              text: "Warranty",
            },
            {
              icon: <Shield className="h-6 w-6 text-white" />,
              text: "Free Shipping",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.1 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center mb-2">
                {item.icon}
              </div>
              <p className="text-sm font-medium">{item.text}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Image */}
      <motion.div
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="col-span-1 relative flex items-center justify-center h-screen"
      >
        <div
          className="absolute inset-0 bg-cover bg-center filter blur-3xl bg-black/30"
          style={{ backgroundImage: "url('/assets/images/hero-phone.jpg')" }}
        ></div>

        <motion.img
          src={"/assets/images/hero-phone.jpg"}
          alt="hero"
          className="relative rounded-2xl w-full max-w-md h-auto object-cover"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        />
      </motion.div>
    </div>
  );
}

export default HeroGrid;
