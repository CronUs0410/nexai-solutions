"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";

export default function AdminModal({ isOpen, onClose, adminUser }) {
  const { user } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (adminUser) {
      setName(adminUser.name);
      setEmail(adminUser.email);
      setRole(adminUser.role);
      setPassword("");
    } else {
      setName("");
      setEmail("");
      setPassword("");
      setRole("user");
    }
    setError("");
  }, [adminUser, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const payload = {
        name,
        email,
        password,
        role,
        adminUid: user.uid
      };

      let res;
      if (adminUser) {
        res = await fetch(`/api/admin/users/${adminUser.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        if (!password) {
          throw new Error("Password is required for new users");
        }
        res = await fetch(`/api/admin/users`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to save user");

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-bg/80 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-card border border-border rounded-2xl w-full max-w-md p-6 shadow-2xl scale-up">
        <h2 className="text-2xl font-heading font-bold text-text mb-6">
          {adminUser ? "Edit User" : "Add User"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-muted mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted mb-1">
              Password {adminUser && "(Leave blank to keep unchanged)"}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required={!adminUser}
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted mb-1">Role</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none appearance-none"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
              <option value="superadmin">Superadmin</option>
            </select>
          </div>

          <div className="flex gap-4 pt-4 mt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-4 bg-surface text-text font-bold rounded hover:bg-border transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-2 px-4 bg-primary text-bg font-bold rounded hover:bg-primary-lt transition-colors disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
