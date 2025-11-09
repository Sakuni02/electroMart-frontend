import { Input } from "./ui/input";
import { putImages } from "../lib/product";

// function ImageInput({ onChange, value }) {
//   const handleFileChange = async (e) => {
//     try {
//       if (!e.target.files) {
//         return;
//       }
//       const file = e.target.files[0];
//       if (!file) {
//         return;
//       }
//       const publicUrl = await putImage({ file });

//       console.log(publicUrl);
//       onChange(publicUrl);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div className="grid w-full max-w-sm items-center gap-1.5">
//       <Input type="file" onChange={handleFileChange} />
//     </div>
//   );
// }

function ImageInput({ onChange, value }) {
  const handleFileChange = async (e) => {
    try {
      if (!e.target.files || e.target.files.length === 0) return;

      const files = e.target.files;
      const publicUrls = await putImages({ files }); // upload all files

      onChange(publicUrls); // store array of URLs in form
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input type="file" onChange={handleFileChange} multiple />
    </div>
  );
}

export default ImageInput;
