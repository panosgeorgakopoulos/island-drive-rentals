export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {/* Stats Cards */}
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Active Bookings</span>
          <span className="text-3xl font-bold mt-2">0</span>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Total Revenue (Month)</span>
          <span className="text-3xl font-bold mt-2">€0</span>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Fleet Size</span>
          <span className="text-3xl font-bold mt-2">0</span>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm flex flex-col">
          <span className="text-sm font-medium text-gray-500">Registered Users</span>
          <span className="text-3xl font-bold mt-2">0</span>
        </div>
      </div>

      {/* Recent Bookings & Next Pickups placeholders */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-lg border-b pb-4 mb-4">Recent Bookings</h3>
          <div className="text-sm text-gray-500 text-center py-8">
            No recent bookings.
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="font-semibold text-lg border-b pb-4 mb-4">Upcoming Pickups</h3>
          <div className="text-sm text-gray-500 text-center py-8">
            No upcoming pickups today.
          </div>
        </div>
      </div>
    </div>
  );
}
