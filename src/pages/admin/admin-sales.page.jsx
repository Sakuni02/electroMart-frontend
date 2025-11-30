import {
  DollarSign,
  Plus,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
("use client");
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];
const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#2563eb",
  },
  mobile: {
    label: "Mobile",
    color: "#60a5fa",
  },
};



function adminSales() {
  return (
    <div className="min-h-screen lg:px-30 px-5 mb-5">
      <div className="flex-col justify-start gap-2 mt-5">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
          Sales Dashboard
        </h1>
        <p className="text-gray-400">
          Track your store performance and revenue
        </p>
      </div>

      <div className="flex justify-center items-center gap-3 mt-8">
        <div className="border rounded-2xl p-6 w-full">
          <div className="flex justify-between">
            <div className="flex justify-center items-center w-12 h-12 border rounded-2xl bg-blue-950 mb-3">
              <DollarSign className="w-6 h-6 text-blue-500" />
            </div>
            <div className="flex justify-center items-center w-12 h-12">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <h1 className="text-gray-400 mb-3">Total Sales (7d)</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            $12199.82
          </p>
        </div>
        <div className="border rounded-2xl p-6 w-full">
          <div className="flex justify-between">
            <div className="flex justify-center items-center w-12 h-12 border rounded-2xl bg-blue-950 mb-3">
              <ShoppingCart className="w-5 h-5 text-blue-500" />
            </div>
            <div className="flex justify-center items-center w-12 h-12">
              <TrendingUp className="w-5 h-5 text-green-500" />
            </div>
          </div>
          <h1 className="text-gray-400 mb-3">Total Orders (7d)</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            49
          </p>
        </div>
        <div className="border rounded-2xl p-6 w-full">
          <div className="flex justify-center items-center w-12 h-12 border rounded-2xl bg-green-950 mb-3">
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <h1 className="text-gray-400 mb-3">Avg Order Value</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            $248.98
          </p>
        </div>
        <div className="border rounded-2xl p-6 w-full">
          <div className="flex justify-center items-center w-12 h-12 border rounded-2xl bg-blue-950 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <h1 className="text-gray-400 mb-3">Customers</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            124
          </p>
        </div>
      </div>

      <div className="flex-col justify-center items-center mt-5">
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger value="7Days">Last 7 Days</TabsTrigger>
            <TabsTrigger value="30Days">Last 30 Days</TabsTrigger>
          </TabsList>
          <TabsContent value="7Days">
            <ChartContainer
              config={chartConfig}
              className="min-h-[200px] w-full"
            >
              <BarChart accessibilityLayer data={chartData}>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
                <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
              </BarChart>
            </ChartContainer>
          </TabsContent>
          <TabsContent value="30Days">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default adminSales;
