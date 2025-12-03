import { Filter, Grid, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import SimpleProductCard from "../components/SimpleProductCard";
import * as Slider from "@radix-ui/react-slider";
import {
  useGetAllColorsQuery,
  useGetFilteredProductsByCategoryQuery,
} from "@/lib/api";
import { useParams } from "react-router";
import { useState } from "react";

function CategoryView() {
  const { slug } = useParams();

  const [selectedColor, setSelectedColor] = useState(null);
  const { data: colors } = useGetAllColorsQuery();
  const [maxPrice, setMaxPrice] = useState(null);

  const {
    data: products,
    isLoading,
    isError,
  } = useGetFilteredProductsByCategoryQuery({
    slug,
    colorId: selectedColor,
    maxPrice: maxPrice ?? undefined, // only send if set
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="container py-8 lg:px-25 px-5">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2 capitalize">{slug}</h1>
            <p className="text-muted-foreground">
              {products.length} products found
            </p>
            <div>{isLoading ? "Loading" : "Done"}</div>
            <div>{isError}</div>
          </div>

          <div className="flex flex-row gap-2 mt-4">
            <div className="flex border border-border rounded-lg overflow-hidden lg:hidden">
              <Button
                variant="outline"
                className="p-5 rounded-none group transform transition-all duration-300 hover:bg-blue-500"
              >
                <Filter className="h-4 w-4" />
                Filter
              </Button>
            </div>

            <div className="flex border border-border rounded-lg overflow-hidden ">
              <Button
                variant=""
                size="icon"
                className="p-5 rounded-none group transform transition-all duration-300 hover:bg-blue-500"
              >
                <Filter className="h-4 w-4" />
              </Button>

              <Button
                variant=""
                size="icon"
                className="p-5 rounded-none group transform transition-all duration-300 hover:bg-blue-500"
              >
                <Grid className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 grid-cols-1 gap-8 my-8">
          <aside className="border-2 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-6">
              <SlidersHorizontal className="h-5 w-5" />
              <h2 className="font-semibold">Filters</h2>
            </div>
            <div>
              <Slider.Root
                value={[maxPrice ?? 200000]} // wrap number in array
                onValueChange={(value) => setMaxPrice(value[0])} // Radix always sends array
                min={0}
                max={200000}
                step={50}
                className="relative flex items-center select-none touch-none w-full h-5"
              >
                <Slider.Track className="bg-gray-200 relative grow rounded-full h-1">
                  <Slider.Range className="absolute bg-blue-500 rounded-full h-full" />
                </Slider.Track>
                <Slider.Thumb className="block w-5 h-5 bg-white border border-gray-400 rounded-full" />
              </Slider.Root>

              <p className="mt-2">
                Max Price: {maxPrice !== null ? maxPrice : "No Limit"}
              </p>
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Color</h3>
              <div className="grid grid-cols-6 gap-2">
                {colors?.map((c) => (
                  <button
                    key={c._id}
                    onClick={() => setSelectedColor(c._id)}
                    className={`w-8 h-8 rounded-full border transition 
        ${selectedColor === c._id ? "ring-2 ring-offset-2 ring-blue-500" : ""}`}
                    style={{ backgroundColor: c.hex }}
                    aria-label={c.name}
                  />
                )) ?? <p>Loading colors...</p>}
              </div>
            </div>

            <div className="mt-6">
              <Button
                className="w-full transition-colors duration-300 hover:bg-emerald-500"
                onClick={() => setSelectedColor(null)}
              >
                Clear Filter
              </Button>
            </div>
          </aside>

          {products.length > 0 ? (
            products.map((product) => (
              <SimpleProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </div>
    </main>
  );
}

export default CategoryView;
