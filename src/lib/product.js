export const getAllproducts = async (category) => {
    const res = await fetch(`http://localhost:8000/api/products?category=${category}`, {
        method: "GET",
    });

    if (!res.ok) {
        throw new Error("Error while fetching the data");
    }

    const products = await res.json();
    return products;
};