import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateReviewMutation } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { Star } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import z from "zod";

const createReviewFormSchema = z.object({
  name: z.string().min(1),
  review: z.string().min(1),
  rating: z.number().min(1, "Please select a rating"),
});

function AddReviewDialog({ productId }) {
  const form = useForm({
    resolver: zodResolver(createReviewFormSchema),
    defaultValues: { name: "", review: "", rating: 0 },
  });

  const [selectedRating, setSelectedRating] = useState(0);

  const { register, handleSubmit, reset } = form;
  const [createReview, { isLoading }] = useCreateReviewMutation();
  const onSubmit = async (data) => {
    try {
      await createReview({
        ...data,
        rating: selectedRating,
        productId,
      }).unwrap();

      reset();
      setSelectedRating(0);
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Review</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Add Your Review</DialogTitle>
            <DialogDescription>
              Share your thoughts about this product.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="username-1">Rating</Label>

              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-5 h-5 cursor-pointer ${
                      star <= selectedRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                    onClick={() => {
                      setSelectedRating(star);
                      form.setValue("rating", star);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="grid gap-3">
              <Label htmlFor="review">Your Name</Label>
              <Input
                id="review"
                name="name"
                {...register("name")}
                placeholder="Enter your name"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="username-1">Your Review</Label>
              <Input
                id="review"
                {...register("review")}
                placeholder="Write your review..."
              />
            </div>
          </div>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default AddReviewDialog;
