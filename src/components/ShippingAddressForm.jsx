import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useCreateOrderMutation } from "@/lib/api";

const shippingAddresFormSchema = z.object({
  line_1: z.string().min(1).max(50),
  line_2: z.string(1).max(50).optional(),
  city: z.string().min(1).max(50),
  phone: z.string().min(1).max(15),
});

function ShippingAddressForm() {
  const form = useForm({
    resolver: zodResolver(shippingAddresFormSchema),
    defaultValues: {
      line_1: "",
      line_2: "",
      city: "",
      phone: "",
    },
  });

  const cart = useSelector((state) => state.cart.cartItems);
  const [createOrder, { isLoadng }] = useCreateOrderMutation();
  console.log(cart);

  async function onSubmit(values) {
    try {
      await createOrder({
        shippingAddress: values,
        orderItems: cart.map((item) => ({
          productId: item.product._id,
          quantity: item.quantity,
        })),
      }).unwrap();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Shipping Address</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="mt-5">
            <FormField
              control={form.control}
              name="line_1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 1</FormLabel>
                  <FormControl className="mt-2">
                    <Input placeholder="123/5 Main Street" {...field} />
                  </FormControl>
                  <FormDescription className="mt-1">
                    This is the address line 1
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5">
            <FormField
              control={form.control}
              name="line_2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address Line 2 (Optional)</FormLabel>
                  <FormControl className="mt-2">
                    <Input placeholder="Apartment, suite, etc..." {...field} />
                  </FormControl>
                  <FormDescription className="mt-1">
                    This is the address line 2
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5">
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>City</FormLabel>
                  <FormControl className="mt-2">
                    <Input placeholder="New York" {...field} />
                  </FormControl>
                  <FormDescription className="mt-1">
                    This is the city
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5">
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl className="mt-2">
                    <Input placeholder="071 1234567" {...field} />
                  </FormControl>
                  <FormDescription className="mt-1">
                    This is the phone number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="mt-5 flex items-center justify-center">
            <Button
              type="submit"
              className="w-full h-10 bg-blue-500 text-white font-bold"
            >
              Place Order
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

export default ShippingAddressForm;
