import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { StoreContext } from "../context/StoreContext";

export default function Dashboard() {
  const navigate = useNavigate();
  const { users,setUsers,  userLoading, deleteUser } = useContext(StoreContext);
  

  // Local state
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [confirm, setConfirm] = useState({ open: false, type: null, id: null });
  const [search, setSearch] = useState("");

  // Dummy listings data
  const dummyListings = [
    { id: "l1", title: "Cozy Studio - Downtown", host: "Ravi Kumar", price: 2400, created: "2025-03-01" },
    { id: "l2", title: "Sea View Apartment", host: "Asha Patel", price: 4200, created: "2024-12-15" },
    { id: "l3", title: "Hilltop Bungalow", host: "Maya Sen", price: 5400, created: "2025-06-05" },
  ];

  // Stats derived from data
  const stats = useMemo(() => ({
    users: users.length,
    listings: listings.length,
    bookings: Math.floor(Math.random() * 200),
    hosts: users.filter(user => user.role === "HO").length,
    guests: users.filter(user => user.role === "GU").length,
  }), [users, listings]);

  useEffect(() => {
    handleFetchListings();
  }, []);

  function handleFetchListings() {
    setLoading(true);
    setTimeout(() => {
      setListings(dummyListings);
      setLoading(false);
      setMessage("Listings loaded successfully");
      clearMessageAfter();
    }, 800);
  }

  async function handleDeleteUser(id) {
    await deleteUser(id)
    setUsers(prev => prev.filter(u => u.id !== id ))
    
  }

  async function handleDeleteListing(id)  {
      setLoading(true);
      setListings(prev => prev.filter(l => l.id !== id));
      setLoading(false);
      setMessage("Listing deleted successfully");
      clearMessageAfter();
  }

  function clearMessageAfter(time = 3000) {
    setTimeout(() => setMessage(null), time);
  }

  // Confirmation flow
  function confirmDelete(type, id) {
    setConfirm({ open: true, type, id });
  }

  function cancelConfirm() {
    setConfirm({ open: false, type: null, id: null });
  }

  function runConfirm() {
    if (confirm.type === "user") handleDeleteUser(confirm.id);
    if (confirm.type === "listing") handleDeleteListing(confirm.id);
    cancelConfirm();
  }

  // Format date for display
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  // Get role display name
  function getRoleDisplay(role) {
    return role === "HO" ? "Host" : "Guest";
  }

  // Filtered lists based on search
  const filteredUsers = users.filter(user =>
    (user.username + user.email + getRoleDisplay(user.role)).toLowerCase().includes(search.toLowerCase())
  );

  const filteredListings = listings.filter(listing =>
    (listing.title + listing.host).toLowerCase().includes(search.toLowerCase())
  );

  const isLoading = userLoading;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <header className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center font-semibold text-white">
              A
            </div>
            <div>
              <div className="text-lg font-bold text-gray-800">Admin</div>
              <div className="text-xs text-gray-500">Airbnb-style management</div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                className="border border-gray-300 rounded-lg px-4 py-2 text-sm w-80 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search users, listings..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <span className="absolute right-3 top-2.5 text-gray-400">
                🔍
              </span>
            </div>
            <div className="text-sm text-gray-700">
              Signed in as <strong className="ml-1 text-gray-900">admin@apex.com</strong>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Message Alert */}
        {message && (
          <div className="mb-6 p-4 rounded-lg bg-green-50 text-green-800 border border-green-200 flex items-center justify-between">
            <span>{message}</span>
            <button onClick={() => setMessage(null)} className="text-green-600 hover:text-green-800">
              ✕
            </button>
          </div>
        )}

        {/* Stats Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Users"
            value={stats.users}
            description="Registered users"
            loading={isLoading}
          />
          <StatCard
            title="Hosts"
            value={stats.hosts}
            description="Property hosts"
            loading={isLoading}
          />
          <StatCard
            title="Guests"
            value={stats.guests}
            description="Traveling guests"
            loading={isLoading}
          />
          <StatCard
            title="Listings"
            value={stats.listings}
            description="Active properties"
            loading={isLoading}
          />
        </section>

        {/* Users & Listings Section */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          {/* Users Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-800">Users Management</h3>
                <div className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                  {filteredUsers.length} {filteredUsers.length === 1 ? 'user' : 'users'}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">User</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Role</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider">Joined</th>
                    <th className="text-left py-3 px-4 text-xs font-medium text-gray-600 uppercase tracking-wider w-28">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    // Compact shimmer effect for loading
                    Array.from({ length: 6 }).map((_, index) => (
                      <tr key={index} className="animate-pulse">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                            <div className="space-y-1.5">
                              <div className="h-3.5 bg-gray-200 rounded w-20"></div>
                              <div className="h-2.5 bg-gray-200 rounded w-24"></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="h-6 bg-gray-200 rounded w-12"></div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="h-3.5 bg-gray-200 rounded w-16"></div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex space-x-1.5">
                            <div className="h-7 bg-gray-200 rounded w-12"></div>
                            <div className="h-7 bg-gray-200 rounded w-12"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-gray-400">👤</span>
                          </div>
                          <div>No users found</div>
                          {search && (
                            <div className="text-sm text-gray-400">Try adjusting your search</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50 transition-colors group">
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="flex-shrink-0">
                              {user.profile_pic ? (
                                <img
                                  src={user.profile_pic}
                                  alt={user.username}
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                              ) : (
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                                  {user.username.charAt(0).toUpperCase()}
                                </div>
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="text-sm font-medium text-gray-900 truncate max-w-[120px]">
                                {user.username}
                              </div>
                              <div className="text-xs text-gray-500 truncate max-w-[140px]">
                                {user.email || "No email"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.role === "HO"
                            ? "bg-orange-100 text-orange-800 border border-orange-200"
                            : "bg-blue-100 text-blue-800 border border-blue-200"
                            }`}>
                            {getRoleDisplay(user.role)}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <div className="text-sm text-gray-600 whitespace-nowrap">
                            {formatDate(user.date_joined)}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center space-x-1.5">
                            <button
                              className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded transition-colors"
                              onClick={() => alert(JSON.stringify(user, null, 2))}
                              title="View details"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </button>
                            <button
                              className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                              onClick={() => confirmDelete("user", user.id)}
                              title="Delete user"
                            >
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Listings Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Property Listings</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleFetchListings}
                    className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors text-sm font-medium"
                  >
                    Refresh
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Property</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Host</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Price</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {isLoading ? (
                    // Shimmer effect for listings
                    Array.from({ length: 3 }).map((_, index) => (
                      <tr key={index}>
                        <td className="py-4 px-6">
                          <div className="space-y-2">
                            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
                            <div className="h-3 bg-gray-200 rounded w-24 animate-pulse"></div>
                          </div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex space-x-2">
                            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                            <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : filteredListings.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-gray-500">
                        No listings found
                      </td>
                    </tr>
                  ) : (
                    filteredListings.map(listing => (
                      <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                        <td className="py-4 px-6">
                          <div>
                            <div className="font-medium text-gray-900">
                              {listing.title}
                            </div>
                            <div className="text-sm text-gray-500">
                              Created {listing.created}
                            </div>
                          </div>
                        </td>
                        <td className="py-4 px-6 text-sm text-gray-600">
                          {listing.host}
                        </td>
                        <td className="py-4 px-6">
                          <span className="font-semibold text-gray-900">
                            ₹{listing.price}
                          </span>
                          <span className="text-gray-500 text-sm">/month</span>
                        </td>
                        <td className="py-4 px-6">
                          <div className="flex items-center space-x-2">
                            <button
                              className="px-3 py-1 text-sm rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
                              onClick={() => alert(JSON.stringify(listing, null, 2))}
                            >
                              View
                            </button>
                            <button
                              className="px-3 py-1 text-sm rounded-lg bg-red-50 text-red-700 border border-red-200 hover:bg-red-100 transition-colors"
                              onClick={() => confirmDelete("listing", listing.id)}
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Recent Activity Section */}
        <section className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h4>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg border border-blue-100">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="text-sm text-gray-700">
                <span className="font-medium">System</span> loaded {users.length} users and {listings.length} listings
              </div>
              <div className="text-xs text-gray-500 ml-auto">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
              <div className="text-sm text-gray-700">
                Dashboard initialized successfully
              </div>
              <div className="text-xs text-gray-500 ml-auto">
                {new Date().toLocaleTimeString()}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Confirm Delete Modal */}
      {confirm.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 w-[420px] shadow-xl">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-red-600 text-xl">⚠️</span>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete this {confirm.type}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={cancelConfirm}
                className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={runConfirm}
                className="px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors font-medium"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

// StatCard Component with shimmer effect
function StatCard({ title, value, description, loading }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-500">{title}</div>
        <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded-full">Live</div>
      </div>
      {loading ? (
        <div className="space-y-2">
          <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
        </div>
      ) : (
        <>
          <div className="text-3xl font-bold text-gray-900 mb-1">{value}</div>
          <div className="text-sm text-gray-500">{description}</div>
        </>
      )}
    </div>
  );
}