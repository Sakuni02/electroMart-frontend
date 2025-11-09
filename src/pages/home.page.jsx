import HeroGrid from "../components/HeroGrid";
import CategorySection from "../components/CategorySection";
import ProductSesction from "../components/ProductsSection";

function HomePage() {
  return (
    <>
      <main className="flex flex-col gap-8 min-h-screen w-full overflow-x-hidden">
        <HeroGrid />
        <CategorySection />
        <ProductSesction />
      </main>
    </>
  );
}

export default HomePage;
