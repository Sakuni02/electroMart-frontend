import { Filter, Grid, SlidersHorizontal } from "lucide-react";
import { Button } from "../components/ui/button";
import SimpleProductCard from "../components/SimpleProductCard";
import { Slider } from "../components/ui/slider";
import { useGetAllProductsQuery } from "@/lib/api";

function CategoryView() {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useGetAllProductsQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <main>
      <div className="container py-8 lg:px-25 px-5">
        <div className="flex flex-col lg:flex-row items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2"></h1>
            <p className="text-muted-foreground">3 products found</p>
            <div>{isLoading ? "Loading" : "Done"}</div>
            <div>{error}</div>
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
              <Slider max={2000} min={0} step={50} className="w-full" />
            </div>

            <div className="mt-6">
              <h3 className="font-semibold mb-2">Color</h3>

              <div className="grid grid-cols-6 gap-2">
                <button className="w-8 h-8 rounded-full border transition bg-amber-400" />
                <button className="w-8 h-8 rounded-full border transition bg-amber-800" />
                <button className="w-8 h-8 rounded-full border transition bg-blue-500" />
                <button className="w-8 h-8 rounded-full border transition bg-amber-400" />
                <button className="w-8 h-8 rounded-full border transition bg-amber-800" />
                <button className="w-8 h-8 rounded-full border transition bg-blue-500" />
                <button className="w-8 h-8 rounded-full border transition bg-amber-800" />
                <button className="w-8 h-8 rounded-full border transition bg-blue-500" />
                <button className="w-8 h-8 rounded-full border transition bg-amber-400" />
                <button className="w-8 h-8 rounded-full border transition bg-amber-800" />
                <button className="w-8 h-8 rounded-full border transition bg-blue-500" />
              </div>
            </div>

            <div className="mt-6">
              <Button className="w-full transition-colors duration-300 hover:bg-emerald-500">
                Clear Filter
              </Button>
            </div>
          </aside>

          {products.map((product) => (
            <SimpleProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}

export default CategoryView;
