function categorySection() {
  return (
    <div className="container text-center min-h-[60vh] md:min-h-[80vh] items-center">
      <h2 className="text-4xl font-bold py-2">Shop by Category</h2>
      <p className="text-lg text-muted-foreground py-2">
        Find the perfect tech for your lifestyle
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:px-20 px-5 mt-8">
        <div className="bg-card rounded-lg p-6 text-center border border-border group transform transition-all duration-300 hover:scale-105">
          <div className="aspect-square rounded-lg mb-4 bg-muted">
            <img
              src="assets/images/hero-phone.jpg"
              alt="Smartphones"
              className="w-full h-full object-cover pl-6 pr-6 pt-6 pb-4 rounded-4xl"
            />

            <h3 className="font-semibold text-base transition-colors duration-300 group-hover:text-blue-500 pb-4">
              Smartphones
            </h3>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 text-center border border-border group transform transition-all duration-300 hover:scale-105">
          <div className="aspect-square rounded-lg mb-4 bg-muted">
            <img
              src="assets/images/audio1.jpg"
              alt="Smartphones"
              className="w-full h-full object-cover pl-6 pr-6 pt-6 pb-4 rounded-4xl"
            />
            <h3 className="font-semibold text-base transition-colors duration-300 group-hover:text-blue-500 pb-4">
              Audio
            </h3>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 text-center border border-border group transform transition-all duration-300 hover:scale-105">
          <div className="aspect-square rounded-lg mb-4 bg-muted">
            <img
              src="assets/images/accessories-collection.jpg"
              alt="Smartphones"
              className="w-full h-full object-cover pl-6 pr-6 pt-6 pb-4 rounded-4xl"
            />
            <h3 className="font-semibold text-base transition-colors duration-300 group-hover:text-blue-500 pb-4">
              Accessories
            </h3>
          </div>
        </div>

        <div className="bg-card rounded-lg p-6 text-center border border-border group transform transition-all duration-300 hover:scale-105">
          <div className="aspect-square rounded-lg mb-4 bg-muted">
            <img
              src="assets/images/cases8.jpg"
              alt="Smartphones"
              className="w-full h-full object-cover pl-6 pr-6 pt-6 pb-4 rounded-4xl"
            />
            <h3 className="font-semibold text-base transition-colors duration-300 group-hover:text-blue-500 pb-4">
              Cases
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default categorySection;
