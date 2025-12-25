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
import ViewItemsDialog from "@/components/ViewItemsDialog";

function adminOrders() {
  const OrderStatusBadge = ({ status }) => {
    switch (status) {
      case "PENDING":
        return (
          <Badge className="bg-yellow-400/20 text-yellow-600 border-yellow-500/30">
            <Clock4 className="w-4 h-4 mr-1" />
            Pending
          </Badge>
        );
      case "SHIPPED":
        return (
          <Badge className="bg-blue-400/20 text-blue-600 border-blue-500/30">
            <Truck className="w-4 h-4 mr-1" />
            Shipped
          </Badge>
        );

      case "FULFILLED":
        return (
          <Badge className="bg-green-400/20 text-green-600 border-green-500/30">
            <CircleCheckBig className="w-4 h-4 mr-1" />
            Fulfilled
          </Badge>
        );
      case "CANCELLED":
        return (
          <Badge className="bg-red-400/20 text-red-600 border-red-500/30">
            Cancelled
          </Badge>
        );
      default:
        return null;
    }
  };

  const PaymentStatusBadge = ({ status }) => {
    switch (status) {
      case "PAID":
        return (
          <Badge className="bg-green-400/20 text-green-600 border-green-500/30">
            Paid
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-yellow-400/20 text-yellow-600 border-yellow-500/30">
            Pending
          </Badge>
        );
      case "REFUNDED":
        return (
          <Badge className="bg-purple-400/20 text-purple-600 border-purple-500/30">
            Refunded
          </Badge>
        );
      default:
        return null;
    }
  };

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

      <div className="mt-8 border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold">Order ID</TableHead>
              <TableHead className="font-semibold">Customer</TableHead>
              <TableHead className="font-semibold hidden md:table-cell">
                Address
              </TableHead>
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Items</TableHead>
              <TableHead className="font-semibold">Order Status</TableHead>
              <TableHead className="font-semibold">Payment Status</TableHead>
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
                  <TableCell className="font-mono text-xs">
                    {order._id.slice(-8)}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div>
                      <div className="font-medium">
                        {order.user?.fullName || "N/A"}
                      </div>
                      <div className="text-sm text-muted-foreground hidden sm:block">
                        {order.user?.email || "N/A"}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
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
                  <TableCell className="hidden md:table-cell">
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        {order.items.length} items
                      </span>

                      <ViewItemsDialog items={order.items} />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <OrderStatusBadge status={order.orderStatus} />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <PaymentStatusBadge status={order.paymentStatus} />
                    </div>
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-8">
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
