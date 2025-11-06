import { Input } from "./ui/input";
import { putImage } from "../lib/product";

function ImageInput({ onChange, value }) {
  const handleFileChange = async (e) => {
    try {
      if (!e.target.files) {
        return;
      }
      const file = e.target.files[0];
      if (!file) {
        return;
      }
      const publicUrl = await putImage({ file });

      console.log(publicUrl);
      onChange(publicUrl);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default ImageInput;
