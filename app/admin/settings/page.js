"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { auth, db } from "@/lib/firebase";
import { updateProfile, updatePassword as updateFirebasePassword } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

export default function Settings() {
  const { user } = useAuth();
  
  // Profile state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileLoading, setProfileLoading] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ text: "", type: "" });

  // Password state
  const [currentPassword, setCurrentPassword] = useState(""); // Can't really update password easily if not recently signed in, but we do our best
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState({ text: "", type: "" });

  useEffect(() => {
    if (user) {
      setName(user.displayName || "");
      setEmail(user.email || "");
    }
  }, [user]);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setProfileLoading(true);
    setProfileMsg({ text: "", type: "" });

    try {
      if (user.displayName !== name) {
        await updateProfile(user, { displayName: name });
        await updateDoc(doc(db, "users", user.uid), {
          name: name
        });
      }
      setProfileMsg({ text: "Profile updated successfully!", type: "success" });
    } catch (error) {
      setProfileMsg({ text: error.message, type: "error" });
    } finally {
      setProfileLoading(false);
    }
  };

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordMsg({ text: "", type: "" });

    if (newPassword !== confirmPassword) {
      setPasswordMsg({ text: "New passwords do not match", type: "error" });
      setPasswordLoading(false);
      return;
    }

    try {
      // Note: This might throw 'auth/requires-recent-login'
      await updateFirebasePassword(user, newPassword);
      setPasswordMsg({ text: "Password updated successfully!", type: "success" });
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      setPasswordMsg({ text: error.message, type: "error" });
    } finally {
      setPasswordLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-card p-6 rounded-xl border border-border shadow-lg">
        <h1 className="text-2xl font-heading font-bold text-text">Account Settings</h1>
        <p className="text-muted text-sm mt-1">Manage your profile and security</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Profile Form */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-text mb-6 flex items-center gap-2">
            👤 Profile Info
          </h2>

          {profileMsg.text && (
            <div className={`p-3 rounded-md mb-4 text-sm font-bold ${profileMsg.type === 'success' ? 'bg-green/10 text-green border border-green/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
              {profileMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdateProfile} className="space-y-4">
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
                disabled
                className="w-full px-4 py-2 bg-surface border border-border rounded-md text-muted cursor-not-allowed opacity-70"
              />
              <p className="text-xs text-muted mt-1">Email cannot be changed here.</p>
            </div>
            <button
              type="submit"
              disabled={profileLoading}
              className="mt-4 bg-primary text-bg font-bold py-2 px-6 rounded hover:bg-primary-lt transition-colors disabled:opacity-50 w-full md:w-auto"
            >
              {profileLoading ? "Saving..." : "Save Profile"}
            </button>
          </form>
        </div>

        {/* Password Form */}
        <div className="bg-card border border-border rounded-xl p-6 shadow-lg">
          <h2 className="text-xl font-heading font-bold text-text mb-6 flex items-center gap-2">
            🔒 Security
          </h2>

          {passwordMsg.text && (
            <div className={`p-3 rounded-md mb-4 text-sm font-bold ${passwordMsg.type === 'success' ? 'bg-green/10 text-green border border-green/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
              {passwordMsg.text}
            </div>
          )}

          <form onSubmit={handleUpdatePassword} className="space-y-4">
            <div>
              <label className="block text-sm font-mono text-muted mb-1">New Password</label>
              <input
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block text-sm font-mono text-muted mb-1">Confirm New Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              disabled={passwordLoading}
              className="mt-4 bg-surface border border-primary text-primary font-bold py-2 px-6 rounded hover:bg-primary hover:text-bg transition-colors disabled:opacity-50 w-full md:w-auto"
            >
              {passwordLoading ? "Updating..." : "Update Password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
