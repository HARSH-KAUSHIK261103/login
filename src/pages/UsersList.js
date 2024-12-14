import React, { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [editingUser, setEditingUser] = useState(null); // Stores user being edited
  const [message, setMessage] = useState(""); // For displaying success messages
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null); // Stores user ID for deletion confirmation

  useEffect(() => {
    fetchUsers(page);
  }, [page]);

  const fetchUsers = async (pageNumber) => {
    try {
      const response = await axios.get(
        `https://reqres.in/api/users?page=${pageNumber}`
      );
      setUsers(response.data.data);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://reqres.in/api/users/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      setMessage("User deleted successfully!");
      setTimeout(() => setMessage(""), 3000); // Auto-hide message after 3 seconds
    } catch (err) {
      setMessage("Failed to delete user. Please try again.");
      setTimeout(() => setMessage(""), 3000); // Auto-hide error message
    }
    setShowDeleteConfirmation(false); // Close the delete confirmation dialog
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `https://reqres.in/api/users/${editingUser.id}`,
        {
          first_name: editingUser.first_name,
          last_name: editingUser.last_name,
          email: editingUser.email,
        }
      );
      setUsers(
        users.map((user) =>
          user.id === editingUser.id ? { ...user, ...response.data } : user
        )
      );
      setMessage("User updated successfully!");
      setTimeout(() => setMessage(""), 3000); // Auto-hide message after 3 seconds
      setEditingUser(null);
    } catch (err) {
      setMessage("Failed to update user. Please try again.");
      setTimeout(() => setMessage(""), 3000); // Auto-hide error message
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeleteConfirmation = (id) => {
    setUserToDelete(id);
    setShowDeleteConfirmation(true); // Show confirmation dialog
  };

  //   return (
  //     <div className="min-h-screen bg-gray-100 py-8">
  //       <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
  //         User Management System
  //       </h1>

  //       {/* Success/Error Message */}
  //       {message && (
  //         <div
  //           className={`text-center font-semibold py-2 px-4 mx-6 mb-4 rounded-lg ${
  //             message.includes("successfully")
  //               ? "bg-green-500 text-white"
  //               : "bg-red-500 text-white"
  //           }`}
  //         >
  //           {message}
  //         </div>
  //       )}

  //       {/* Edit Form Modal */}
  //       {editingUser && (
  //         <div
  //           className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
  //           onClick={() => setEditingUser(null)} // Close modal on outside click
  //         >
  //           <div
  //             className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative glass-effect"
  //             onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
  //           >
  //             <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit User</h2>
  //             <form onSubmit={handleUpdate}>
  //               <div className="mb-4">
  //                 <label className="block text-gray-700 mb-2">First Name</label>
  //                 <input
  //                   type="text"
  //                   name="first_name"
  //                   value={editingUser.first_name}
  //                   onChange={handleChange}
  //                   className="w-full p-2 border rounded-md"
  //                   required
  //                 />
  //               </div>
  //               <div className="mb-4">
  //                 <label className="block text-gray-700 mb-2">Last Name</label>
  //                 <input
  //                   type="text"
  //                   name="last_name"
  //                   value={editingUser.last_name}
  //                   onChange={handleChange}
  //                   className="w-full p-2 border rounded-md"
  //                   required
  //                 />
  //               </div>
  //               <div className="mb-4">
  //                 <label className="block text-gray-700 mb-2">Email</label>
  //                 <input
  //                   type="email"
  //                   name="email"
  //                   value={editingUser.email}
  //                   onChange={handleChange}
  //                   className="w-full p-2 border rounded-md"
  //                   required
  //                 />
  //               </div>
  //               <div className="flex justify-end space-x-4">
  //                 <button
  //                   type="button"
  //                   onClick={() => setEditingUser(null)}
  //                   className="bg-gray-400 text-white px-4 py-2 rounded-md"
  //                 >
  //                   Cancel
  //                 </button>
  //                 <button
  //                   type="submit"
  //                   className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
  //                 >
  //                   Save Changes
  //                 </button>
  //               </div>
  //             </form>
  //           </div>
  //         </div>
  //       )}

  //       {/* Delete Confirmation Dialog */}
  //       {showDeleteConfirmation && (
  //         <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
  //           <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
  //             <h2 className="text-xl font-bold mb-4 text-red-600">
  //               Confirm Deletion
  //             </h2>
  //             <p>Are you sure you want to delete this user?</p>
  //             <div className="flex justify-end space-x-4 mt-6">
  //               <button
  //                 onClick={() => setShowDeleteConfirmation(false)}
  //                 className="bg-gray-400 text-white px-4 py-2 rounded-md"
  //               >
  //                 No
  //               </button>
  //               <button
  //                 onClick={() => handleDelete(userToDelete)}
  //                 className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
  //               >
  //                 Yes, Delete
  //               </button>
  //             </div>
  //           </div>
  //         </div>
  //       )}

  //       {/* Users List */}
  //       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
  //         {users.map((user) => (
  //           <div
  //             key={user.id}
  //             className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
  //           >
  //             <img
  //               src={user.avatar}
  //               alt={`${user.first_name} ${user.last_name}`}
  //               className="w-24 h-24 rounded-full mx-auto"
  //             />
  //             <h2 className="text-lg font-semibold text-center mt-4 text-gray-700">
  //               {user.first_name} {user.last_name}
  //             </h2>
  //             <p className="text-center text-gray-500">{user.email}</p>
  //             <div className="flex justify-center space-x-4 mt-4">
  //               <button
  //                 onClick={() => handleEdit(user)}
  //                 className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
  //               >
  //                 Edit
  //               </button>
  //               <button
  //                 onClick={() => handleDeleteConfirmation(user.id)}
  //                 className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
  //               >
  //                 Delete
  //               </button>
  //             </div>
  //           </div>
  //         ))}
  //       </div>

  //       {/* Pagination */}
  //       <div className="mt-10 text-center">
  //         {/* Page Information */}
  //         <span className="text-lg font-semibold mb-4 block">
  //           Page {page} of {totalPages}
  //         </span>

  //         {/* Pagination Buttons */}
  //         <div className="flex justify-center space-x-4 mt-4">
  //           <button
  //             onClick={() => setPage(page - 1)}
  //             disabled={page === 1}
  //             className={`px-4 py-2 rounded-md font-medium ${
  //               page === 1
  //                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
  //                 : "bg-blue-500 text-white hover:bg-blue-600"
  //             }`}
  //           >
  //             Previous
  //           </button>
  //           <button
  //             onClick={() => setPage(page + 1)}
  //             disabled={page === totalPages}
  //             className={`px-4 py-2 rounded-md font-medium ${
  //               page === totalPages
  //                 ? "bg-gray-300 text-gray-500 cursor-not-allowed"
  //                 : "bg-blue-500 text-white hover:bg-blue-600"
  //             }`}
  //           >
  //             Next
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-10">
        User Management System
      </h1>

      {/* Success/Error Message */}
      {message && (
        <div
          className={`text-center font-semibold py-2 px-4 mx-6 mb-4 rounded-lg ${
            message.includes("successfully")
              ? "bg-green-500 text-white"
              : "bg-red-500 text-white"
          }`}
        >
          {message}
        </div>
      )}

      {/* Edit Form Modal */}
      {editingUser && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
          onClick={() => setEditingUser(null)} // Close modal on outside click
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4 relative glass-effect"
            onClick={(e) => e.stopPropagation()} // Prevent closing on inner click
          >
            <h2 className="text-2xl font-bold mb-4 text-blue-600">Edit User</h2>
            <form onSubmit={handleUpdate}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="first_name"
                  value={editingUser.first_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="last_name"
                  value={editingUser.last_name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setEditingUser(null)}
                  className="bg-gray-400 text-white px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {showDeleteConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mx-4">
            <h2 className="text-xl font-bold mb-4 text-red-600">
              Confirm Deletion
            </h2>
            <p>Are you sure you want to delete this user?</p>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setShowDeleteConfirmation(false)}
                className="bg-gray-400 text-white px-4 py-2 rounded-md"
              >
                No
              </button>
              <button
                onClick={() => handleDelete(userToDelete)}
                className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Users List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 max-w-6xl mx-auto">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={user.avatar}
              alt={`${user.first_name} ${user.last_name}`}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-lg font-semibold text-center mt-4 text-gray-700">
              {user.first_name} {user.last_name}
            </h2>
            <p className="text-center text-gray-500">{user.email}</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                onClick={() => handleEdit(user)}
                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDeleteConfirmation(user.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-10 text-center">
        {/* Page Information */}
        <span className="text-lg font-semibold mb-4 block">
          Page {page} of {totalPages}
        </span>

        {/* Pagination Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
            className={`px-4 py-2 rounded-md font-medium ${
              page === 1
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Previous
          </button>
          <button
            onClick={() => setPage(page + 1)}
            disabled={page === totalPages}
            className={`px-4 py-2 rounded-md font-medium ${
              page === totalPages
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-500 text-white hover:bg-blue-600"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersList;
