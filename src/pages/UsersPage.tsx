import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchUsers,
  createUser,
  updateUser,
  deleteUser,
  fetchUser,
  fetchUsers_name,
} from '../store/thunks/usersThunks';
import type { UserInput } from '../store/models';
import { selectActionIsLoading } from '@/store/extensions';

export const UsersPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser } = useAppSelector(state => state.users);
  const fetchUsersIsLoading = useAppSelector(state => selectActionIsLoading(state, fetchUsers_name));

  const [newUser, setNewUser] = useState<UserInput>({ name: '', email: '', age: 0 });

  // Load initial data
  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  // User operations
  const handleCreateUser = () => {
    dispatch(createUser(newUser));
    setNewUser({ name: '', email: '', age: 0 });
  };

  const handleUpdateUser = (id: string, updates: Partial<UserInput>) => {
    dispatch(updateUser({ id, input: { ...selectedUser, ...updates } as UserInput }));
  };

  const handleDeleteUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  const handleFetchUser = (id: string) => {
    dispatch(fetchUser(id));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Users Management</h1>
      {fetchUsersIsLoading && <div>Loading...</div>}
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        
        {/* Create User Form */}
        <div className="mb-6 p-4 bg-gray-50 rounded">
          <h3 className="font-medium mb-2">Create User</h3>
          <input
            type="text"
            placeholder="Name"
            value={newUser.name}
            onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="email"
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            className="w-full mb-2 p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Age"
            value={newUser.age || ''}
            onChange={(e) => setNewUser({ ...newUser, age: parseInt(e.target.value) || 0 })}
            className="w-full mb-2 p-2 border rounded"
          />
          <button
            onClick={handleCreateUser}
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Create User
          </button>
        </div>

        {/* Users List */}
        <div>
          <h3 className="font-medium mb-2">Users ({users.length})</h3>
          <div className="space-y-2">
            {users.map(user => (
              <div key={user.id} className="p-3 border rounded">
                <div className="font-medium">{user.name}</div>
                <div className="text-sm text-gray-600">{user.email}</div>
                <div className="text-sm text-gray-500">Age: {user.age}</div>
                <div className="mt-2 space-x-2">
                  <button
                    onClick={() => handleFetchUser(user.id)}
                    className="text-xs bg-green-500 text-white px-2 py-1 rounded"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleDeleteUser(user.id)}
                    className="text-xs bg-red-500 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Selected User Details */}
      {selectedUser && (
        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Selected User Details</h2>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {JSON.stringify(selectedUser, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}; 