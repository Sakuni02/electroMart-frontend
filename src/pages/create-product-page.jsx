import CreateProductForm from "@/components/CreateProductForm";
import { useGetAllCategoriesQuery } from "@/lib/api";

function CreateProductPage() {
  const { data: categories } = useGetAllCategoriesQuery();

  return (
    <div className="p-10">
      <CreateProductForm categories={categories} />
    </div>
  );
}
export default CreateProductPage;
