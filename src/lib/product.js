// export const getAllproducts = async (category) => {
//     const res = await fetch(`http://localhost:8000/api/products?category=${category}`, {
//         method: "GET",
//     });

//     if (!res.ok) {
//         throw new Error("Error while fetching the data");
//     }

//     const products = await res.json();
//     return products;
// };


export const putImage = async ({ file }) => {
    const res = await fetch(`http://localhost:8000/api/products/images`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ fileType: file.type }),
    });

    const data = await res.json();
    const { url, publicURL } = data;
    console.log(url, publicURL);

    const upload = await fetch(url, {
        method: "PUT",
        headers: {
            "Content-Type": file.type,
        },
        body: file,
    });

    return publicURL;
};