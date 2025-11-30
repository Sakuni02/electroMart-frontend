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

const invoices = [
  {
    invoice: "INV001",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    Customer: "John Doe",
    Date: "Nov 20, 2024",
    Items: "1",
    Status: "Delivered",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

function adminOrders() {
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
              <TableHead className="font-semibold">Date</TableHead>
              <TableHead className="font-semibold">Items</TableHead>
              <TableHead className="font-semibold">Status</TableHead>
              <TableHead className="text-right font-semibold">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.invoice}>
                <TableCell className="font-medium py-6 px-2">
                  {invoice.invoice}
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">John Doe</div>
                    <div className="text-sm text-muted-foreground">
                      johndoe@gmail.com
                    </div>
                  </div>
                </TableCell>
                <TableCell>{invoice.Date}</TableCell>
                <TableCell>{invoice.Items}</TableCell>
                <TableCell>
                  <Badge
                    className={
                      "bg-green-400/20 text-green-500 border-green-500/30"
                    }
                  >
                    <CircleCheckBig /> {invoice.paymentStatus}
                  </Badge>
                  <Badge
                    className={
                      "bg-blue-400/20 text-blue-500 border-blue-500/30"
                    }
                  >
                    <Truck /> {invoice.paymentStatus}
                  </Badge>
                  <Badge
                    className={
                      "bg-yellow-400/20 text-yellow-500 border-yellow-500/30"
                    }
                  >
                    <Clock4 />
                    {invoice.paymentStatus}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  {invoice.totalAmount}
                </TableCell>
              </TableRow>
            ))}
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
