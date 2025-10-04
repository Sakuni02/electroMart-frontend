import { ShoppingBag, User } from "lucide-react";

function HeroGrid() {
  return (
    <div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-16 min-h-[60vh] md:min-h-[80vh] gap-4 mt-4">
        <div className="relative col-span-1 lg:col-span-2 rounded-2xl">
          <img
            src={"/assets/images/cases1.jpg"}
            className="rounded-2xl w-full h-full object-cover"
            alt="hero"
          />
          <div className="absolute top-4 sm:top-8 left-4 sm:left-8">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-black">
              Color of <br /> Summer
              <br /> Outfit
            </h1>
            <p className="text-black text-base sm:text-lg md:text-xl mt-2 sm:mt-4">
              100+ Collections for your <br /> outfit inspirations <br />
              in this summer
            </p>
          </div>
        </div>
        <div className="col-span-1 grid grid-rows-1 md:grid-rows-2 gap-4">
          <div className="rounded-2xl relative h-40 md:h-auto">
            <img
              src={"/assets/images/cases2.jpg"}
              alt="Featured product"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-white">
                Outdoor <br /> Active
              </h1>
            </div>
          </div>
          <div className="rounded-2xl relative h-40 md:h-auto">
            <img
              src={"/assets/images/cases3.jpg"}
              alt="Featured product"
              className="rounded-2xl w-full h-full object-cover"
            />
            <div className="absolute top-2 sm:top-4 left-2 sm:left-4">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black">
                Casual <br /> Comfort
              </h1>
            </div>
          </div>
        </div>
      </section>

      <div className="flex items-center space-x-12">
        <a href="/shop/cart" aria-label="Shopping Bag" className="p-1 relative">
          <ShoppingBag size={20} />
          <span className="absolute -top-1 -right-1 bg-black text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
            12
          </span>
        </a>

        <User />

        {/* Mobile menu button */}
        <button className="md:hidden p-1">hi</button>
      </div>
    </div>
  );
}

export default HeroGrid;
