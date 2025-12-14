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


// export const putImage = async ({ file }) => {
//     const res = await fetch(`http://localhost:8000/api/products/images`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ fileType: file.type }),
//     });

//     const data = await res.json();
//     const { url, publicURL } = data;
//     console.log(url, publicURL);

//     const upload = await fetch(url, {
//         method: "PUT",
//         headers: {
//             "Content-Type": file.type,
//         },
//         body: file,
//     });

//     return publicURL;
// };


export const putImages = async ({ files }) => {
    if (!files || files.length === 0) return [];

    // Collect file types
    const fileTypes = Array.from(files).map((file) => file.type || "application/octet-stream");

    // Request signed URLs for all files
    // const res = await fetch("http://localhost:8000/api/products/images", {
    const res = await fetch(`${import.meta.env.VITE_BASE_URL}/api/products/images`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileTypes }),
    });

    const data = await res.json();
    const { uploads } = data; // uploads = [{url, publicURL}, ...]

    // Upload each file to R2
    await Promise.all(
        Array.from(files).map((file, idx) =>
            fetch(uploads[idx].url, {
                method: "PUT",
                headers: { "Content-Type": file.type },
                body: file,
            })
        )
    );

    // Return array of public URLs
    return uploads.map((u) => u.publicURL);
};
