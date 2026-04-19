"use client";

import { useAuth } from "@/hooks/useAuth";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Link from "next/link";

export default function AdminDashboard() {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    services: 0,
    users: 0,
    admins: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // We listen to services and users to compute stats
    const unsubServices = onSnapshot(collection(db, "services"), (snap) => {
      setStats(prev => ({ ...prev, services: snap.size }));
    });

    const unsubUsers = onSnapshot(collection(db, "users"), (snap) => {
      let usersCount = 0;
      let adminsCount = 0;
      snap.forEach(doc => {
        const role = doc.data().role;
        if (role === "admin" || role === "superadmin") {
          adminsCount++;
        } else {
          usersCount++;
        }
      });
      setStats(prev => ({ ...prev, users: usersCount, admins: adminsCount }));
      setLoading(false);
    });

    return () => {
      unsubServices();
      unsubUsers();
    };
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-heading font-extrabold text-text">Dashboard</h1>
        <p className="text-muted mt-2">Welcome back, {user?.displayName || user?.email?.split('@')[0]} 👋</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard title="Total Services" count={loading ? "..." : stats.services} icon="⚙️" link="/admin/services" />
        <StatCard title="Total Users" count={loading ? "..." : stats.users} icon="👥" link="/admin/admins" />
        <StatCard title="Total Admins" count={loading ? "..." : stats.admins} icon="🛡️" link="/admin/admins" />
      </div>
      
      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg border-t-4 border-t-primary mt-8">
        <h2 className="text-xl font-heading font-bold text-text mb-4">Quick Actions</h2>
        <div className="flex flex-wrap gap-4">
          <Link href="/admin/services" className="bg-primary text-bg font-bold py-2 px-4 rounded hover:bg-primary-lt transition-colors">
            Add New Service
          </Link>
          <Link href="/admin/admins" className="bg-surface border border-border text-text font-bold py-2 px-4 rounded hover:bg-border transition-colors">
            Manage Team
          </Link>
          <Link href="/admin/settings" className="bg-surface border border-border text-text font-bold py-2 px-4 rounded hover:bg-border transition-colors">
            Update Profile
          </Link>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, count, icon, link }) {
  return (
    <Link href={link} className="block group">
      <div className="bg-card border border-border rounded-xl p-6 shadow-lg border-t-4 border-t-primary hover:-translate-y-1 transition-all">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-muted font-mono text-sm uppercase mb-1">{title}</p>
            <h3 className="text-4xl font-heading font-extrabold text-text group-hover:text-primary transition-colors">
              {count}
            </h3>
          </div>
          <div className="text-3xl opacity-80 bg-surface w-12 h-12 flex items-center justify-center rounded-lg">
            {icon}
          </div>
        </div>
      </div>
    </Link>
  );
}
