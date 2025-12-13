import { useGetProductsBySearchQuery } from "@/lib/api";
import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Link } from "react-router";

function ProductSearchForm() {
  const [search, setSearch] = useState("");
  const wrapperRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { data: products, isLoading } = useGetProductsBySearchQuery(search, {
    skip: !search,
  });

  return (
    <div ref={wrapperRef} className="relative">
      <Input
        type="text"
        placeholder="Search"
        className="w-64"
        value={search}
        onFocus={() => setIsOpen(true)}
        onChange={(e) => {
          setSearch(e.target.value);
          setIsOpen(true);
        }}
      />
      <div
        className={cn(
          "hidden absolute top-10 rounded-md left-0 z-10 right-0 bottom-0 px-2 bg-black border shadow",
          {
            "block h-32 overflow-y-scroll": isOpen && search !== "",
          }
        )}
      >
        {products?.map((product) => (
          <Link
            key={product._id}
            to={`/products/${product._id}`} // or fix route instead
            className="block py-2"
          >
            {product.name}
          </Link>
        ))}

        {products?.length === 0 && (
          <div className="py-2 text-center">
            <p>No results found</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductSearchForm;
