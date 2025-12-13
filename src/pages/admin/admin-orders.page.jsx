import { ChartColumn, CircleCheckBig, Clock4, Plus, Truck } from "lucide-react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { useGetAllOrdersQuery } from "@/lib/api";

function adminOrders() {
  const { data: ordersWithUser, isLoading, isError } = useGetAllOrdersQuery();
  if (isLoading) return <div>Loading orders...</div>;
  if (isError) return <div>Failed to load orders</div>;

  return (
    <div className="min-h-screen lg:px-30 px-5 mb-5">
      <div className="flex-col justify-start gap-2 mt-5">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
          All Orders
        </h1>
        <p className="text-gray-400">Manage and track customer orders</p>
      </div>

      <div className="flex justify-center items-center mt-8 border rounded-xl overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Order ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold">Address</TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Items</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {ordersWithUser.map((order) => {
              const total = order.items.reduce(
                (sum, item) =>
                  sum + (item.productId?.price || 0) * item.quantity,
                0
              );

              return (
                <TableRow key={order._id}>
                  <TableCell className="font-medium py-6 px-2">
                    {order._id}
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">
                        {order.user?.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {order.user?.email || "N/A"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {order.address ? (
                      <div className="flex flex-col text-sm text-muted-foreground">
                        <span>{order.address.line_1}</span>
                        {order.address.line_2 && (
                          <span>{order.address.line_2}</span>
                        )}
                        <span>{order.address.city}</span>
                        <span>Phone: {order.address.phone}</span>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </TableCell>
                  <TableCell>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell>{order.items.length}</TableCell>

                  <TableCell>
                    {order.orderStatus === "PENDING" && (
                      <Badge
                        className={
                          "bg-yellow-400/20 text-yellow-500 border-yellow-500/30"
                        }
                      >
                        <Clock4 />
                        {order.paymentStatus}
                      </Badge>
                    )}

                    {order.orderStatus === "FULFILLED" && (
                      <Badge
                        className={
                          "bg-blue-400/20 text-blue-500 border-blue-500/30"
                        }
                      >
                        <Truck /> {order.paymentStatus}
                      </Badge>
                    )}

                    {order.orderStatus === "PAID" && (
                      <Badge
                        className={
                          "bg-green-400/20 text-green-500 border-green-500/30"
                        }
                      >
                        <CircleCheckBig /> {order.paymentStatus}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    ${total.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-center items-center gap-3 mt-8">
        <div className="border rounded-2xl p-6 w-full">
          <h1 className="text-gray-400 mb-3">Total Orders</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            5
          </p>
        </div>

        <div className="border rounded-2xl p-6 w-full">
          <h1 className="text-gray-400 mb-3">Total Revenue</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            $2709.94
          </p>
        </div>

        <div className="border rounded-2xl p-6 w-full">
          <h1 className="text-gray-400 mb-3">Avg Order Value</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            $541.99
          </p>
        </div>
      </div>
    </div>
  );
}

export default adminOrders;
