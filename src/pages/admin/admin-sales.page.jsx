"use client";
import {
  DollarSign,
  Plus,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  LabelList,
} from "recharts";

import { useGetSalesDashboardQuery } from "@/lib/api";

function adminSales() {
  const { data: stats, isLoading } = useGetSalesDashboardQuery();
  if (isLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Prepare chart data from dailyOrders
  const chartData7 = stats
    ? Object.entries(stats.dailyOrders).map(([date, count]) => ({
        date,
        orders: count,
      }))
    : [];

  const chartData30 = stats
    ? Object.entries(stats.dailyOrders30).map(([date, count]) => ({
        date,
        orders: count,
      }))
    : [];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-5">
      <div className="flex-col justify-start gap-2 mt-5">
        <h1 className="text-4xl font-semibold bg-gradient-to-r from-indigo-700 to-blue-500 bg-clip-text text-transparent">
          Sales Dashboard
        </h1>
        <p className="text-gray-400">
          Track your store performance and revenue
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
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
            ${stats?.totalSales?.toFixed(2) ?? "0.00"}
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
            {stats?.totalOrders ?? 0}
          </p>
        </div>
        <div className="border rounded-2xl p-6 w-full">
          <div className="flex justify-center items-center w-12 h-12 border rounded-2xl bg-green-950 mb-3">
            <DollarSign className="w-5 h-5 text-green-500" />
          </div>
          <h1 className="text-gray-400 mb-3">Avg Order Value</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            ${stats?.avgOrderValue?.toFixed(2) ?? "0.00"}
          </p>
        </div>
        <div className="border rounded-2xl p-6 w-full">
          <div className="flex justify-center items-center w-12 h-12 border rounded-2xl bg-blue-950 mb-3">
            <Users className="w-5 h-5 text-blue-500" />
          </div>
          <h1 className="text-gray-400 mb-3">Customers</h1>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-700 bg-clip-text text-transparent">
            {stats?.totalOrders ?? 0} {/* Placeholder */}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <Tabs defaultValue="7Days" className="w-full mt-6">
          <TabsList className="mb-4">
            <TabsTrigger value="7Days">Last 7 Days</TabsTrigger>
            <TabsTrigger value="30Days">Last 30 Days</TabsTrigger>
          </TabsList>
          <TabsContent value="7Days">
            <div className="w-full h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={800} // choose a width that fits your layout
                  height={380}
                  data={chartData7}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6b7280", fontSize: 14 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: 8,
                      border: "none",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar
                    dataKey="orders"
                    radius={[8, 8, 0, 0]}
                    fill="url(#colorOrders)"
                    barSize={40}
                  >
                    <LabelList
                      dataKey="orders"
                      position="top"
                      fill="#111827"
                      fontWeight="bold"
                    />
                  </Bar>
                  <defs>
                    <linearGradient
                      id="colorOrders"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#2563eb" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#60a5fa"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>

          <TabsContent value="30Days">
            <div className="w-full h-[380px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={chartData30}
                  margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: "#6b7280", fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      borderRadius: 8,
                      border: "none",
                      color: "#fff",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Bar
                    dataKey="orders"
                    radius={[8, 8, 0, 0]}
                    fill="url(#colorOrders30)"
                    barSize={35}
                  >
                    <LabelList
                      dataKey="orders"
                      position="top"
                      fill="#111827"
                      fontWeight="bold"
                      fontSize={12}
                    />
                  </Bar>
                  <defs>
                    <linearGradient
                      id="colorOrders30"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="0%" stopColor="#4ade80" stopOpacity={0.9} />
                      <stop
                        offset="100%"
                        stopColor="#22c55e"
                        stopOpacity={0.6}
                      />
                    </linearGradient>
                  </defs>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default adminSales;
