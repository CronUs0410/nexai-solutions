"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";
import AdminModal from "@/components/admin/AdminModal";
import { useAuth } from "@/hooks/useAuth";

export default function Admins() {
  const { user, role } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, name) => {
    if (id === user.uid) {
      alert("You cannot delete your own account.");
      return;
    }
    if (window.confirm(`Delete user ${name}? This cannot be undone.`)) {
      try {
        const res = await fetch(`/api/admin/users/${id}?adminUid=${user.uid}`, {
          method: "DELETE"
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Failed to delete user");
      } catch (error) {
        console.error("Error deleting user:", error);
        alert(error.message);
      }
    }
  };

  const openAddModal = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const openEditModal = (u) => {
    setEditingUser(u);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-card p-6 rounded-xl border border-border shadow-lg">
        <div>
          <h1 className="text-2xl font-heading font-bold text-text">Team Members</h1>
          <p className="text-muted text-sm mt-1">Manage users and roles (Superadmin only)</p>
        </div>
        {role === 'superadmin' && (
          <button 
            onClick={openAddModal}
            className="bg-primary text-bg font-bold py-2 px-4 rounded hover:bg-primary-lt transition-colors shadow-lg hover:shadow-primary/20"
          >
            + Add Admin
          </button>
        )}
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-muted font-mono uppercase text-xs">
                <th className="p-4 w-1/4">Name</th>
                <th className="p-4 w-1/3">Email</th>
                <th className="p-4 w-32">Role</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} className="border-b border-border border-opacity-50 hover:bg-surface/50 transition-colors">
                  <td className="p-4 font-bold text-text">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 border border-primary flex items-center justify-center text-primary font-bold text-xs">
                        {u.name ? u.name.charAt(0).toUpperCase() : u.email.charAt(0).toUpperCase()}
                      </div>
                      {u.name || "N/A"}
                    </div>
                  </td>
                  <td className="p-4 text-muted text-sm">{u.email}</td>
                  <td className="p-4">
                    <span className={`inline-block px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${
                      u.role === 'superadmin' ? 'bg-primary/20 text-primary border border-primary/30' :
                      u.role === 'admin' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                      'bg-surface border border-border text-muted'
                    }`}>
                      {u.role || 'user'}
                    </span>
                  </td>
                  <td className="p-4">
                    {role === 'superadmin' && (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(u)}
                          className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDelete(u.id, u.name)}
                          className={`p-2 rounded transition-colors ${u.id === user.uid ? 'text-muted cursor-not-allowed opacity-50' : 'text-red-500 hover:bg-red-500/10'}`}
                          title={u.id === user.uid ? "Cannot delete yourself" : "Delete"}
                          disabled={u.id === user.uid}
                        >
                          🗑️
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AdminModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        adminUser={editingUser}
      />
    </div>
  );
}
