import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import {
  LayoutGrid,
  Package,
  FileText,
  Users,
  ArrowDown,
  ArrowUp,
} from "lucide-react";
import EmptyState from "../components/dashboard/EmptyState";

const StatCard = ({ title, value, icon, trend, percentage }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <h3 className="text-2xl font-bold mt-2">{value}</h3>

          {trend && (
            <div
              className={`flex items-center mt-2 ${
                trend === "up" ? "text-green-500" : "text-red-500"
              }`}
            >
              {trend === "up" ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
              <span className="ml-1 text-sm">{percentage}%</span>
            </div>
          )}
        </div>

        <div className="p-3 bg-blue-50 rounded-lg">{icon}</div>
      </div>
    </div>
  );
};

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      // Mock data based on account type
      if (user?.accountType === "supplier") {
        setStats({
          products: 12,
          documents: 5,
          buyers: 8,
          inquiries: 24,
        });
      } else {
        setStats({
          suppliers: 15,
          products: 42,
          documents: 7,
          orders: 3,
        });
      }
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!stats) {
    return (
      <EmptyState
        title="Welcome to Trade Connect"
        description="Complete your profile to get started"
        buttonText="Complete Profile"
        onButtonClick={() => {
          /* Navigate to profile */
        }}
      />
    );
  }

  // Different dashboard views based on account type
  return (
    <div className="container mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-600">
          Welcome back,{" "}
          {user?.picName ||
            (user?.accountType === "supplier" ? "Supplier" : "Buyer")}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {user?.accountType === "supplier" ? (
          <>
            <StatCard
              title="Total Products"
              value={stats.products}
              icon={<Package size={24} className="text-blue-500" />}
              trend="up"
              percentage={12}
            />
            <StatCard
              title="Documents"
              value={stats.documents}
              icon={<FileText size={24} className="text-green-500" />}
            />
            <StatCard
              title="Buyers"
              value={stats.buyers}
              icon={<Users size={24} className="text-purple-500" />}
              trend="up"
              percentage={5}
            />
            <StatCard
              title="Inquiries"
              value={stats.inquiries}
              icon={<LayoutGrid size={24} className="text-orange-500" />}
              trend="down"
              percentage={3}
            />
          </>
        ) : (
          <>
            <StatCard
              title="Suppliers"
              value={stats.suppliers}
              icon={<Users size={24} className="text-blue-500" />}
            />
            <StatCard
              title="Available Products"
              value={stats.products}
              icon={<Package size={24} className="text-green-500" />}
              trend="up"
              percentage={8}
            />
            <StatCard
              title="Documents"
              value={stats.documents}
              icon={<FileText size={24} className="text-purple-500" />}
            />
            <StatCard
              title="Orders"
              value={stats.orders}
              icon={<LayoutGrid size={24} className="text-orange-500" />}
            />
          </>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="flex items-start pb-4 border-b border-gray-100"
              >
                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 mr-3"></div>
                <div>
                  <p className="font-medium">
                    {user?.accountType === "supplier"
                      ? "New inquiry for your product"
                      : "New product from supplier"}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(
                      Date.now() - item * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Package size={24} className="text-blue-500 mb-2" />
              <span className="text-sm">
                {user?.accountType === "supplier"
                  ? "Add Product"
                  : "Browse Products"}
              </span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <FileText size={24} className="text-green-500 mb-2" />
              <span className="text-sm">
                {user?.accountType === "supplier"
                  ? "Upload Document"
                  : "View Documents"}
              </span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <Users size={24} className="text-purple-500 mb-2" />
              <span className="text-sm">
                {user?.accountType === "supplier"
                  ? "View Buyers"
                  : "Find Suppliers"}
              </span>
            </button>
            <button className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
              <LayoutGrid size={24} className="text-orange-500 mb-2" />
              <span className="text-sm">View Analytics</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
