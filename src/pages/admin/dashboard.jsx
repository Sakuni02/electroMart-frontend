import { Package, Plus } from "lucide-react";
import { Link } from "react-router";

function adminDashboard() {
  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4 max-w-5xl">
        <Link to="/admin/products/create">
          <div className="border rounded-2xl p-6 hover:border-blue-600 transition-all cursor-pointer">
            <div className="flex items-center justify-center w-14 h-14 rounded-lg border mb-3 bg-blue-950">
              <Plus className="w-7 h-7 text-blue-500" />
            </div>
            <h1 className="text-2xl font-semibold  mb-3">Create product</h1>
            <p className="text-gray-400">Add a new product to your store</p>
          </div>
        </Link>

        <div className="border rounded-2xl p-6 hover:border-blue-600 transition-all cursor-pointer">
          <div className="flex items-center justify-center w-14 h-14 rounded-lg border mb-3 bg-blue-950">
            <Package className="w-7 h-7 text-blue-500" />
          </div>
          <h1 className="text-2xl font-semibold mb-3">Manage Products</h1>
          <p className="text-gray-400">View and edit existing products</p>
        </div>
      </div>
    </div>
  );
}

export default adminDashboard;
