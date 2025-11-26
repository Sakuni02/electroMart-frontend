import CreateProductForm from "@/components/CreateProductForm";
import {
  useGetAllBrandsQuery,
  useGetAllCategoriesQuery,
  useGetAllColorsQuery,
} from "@/lib/api";

function CreateProductPage() {
  const { data: categories } = useGetAllCategoriesQuery();
  const { data: brands } = useGetAllBrandsQuery();
  const { data: colors } = useGetAllColorsQuery();

  return (
    <div className="p-15">
      <CreateProductForm
        categories={categories}
        brands={brands}
        colors={colors}
      />
    </div>
  );
}
export default CreateProductPage;
