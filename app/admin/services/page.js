"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, onSnapshot, query, orderBy, deleteDoc, doc } from "firebase/firestore";
import ServiceModal from "@/components/admin/ServiceModal";

export default function AdminServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "services"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setServices(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete ${name}? This cannot be undone.`)) {
      try {
        await deleteDoc(doc(db, "services", id));
      } catch (error) {
        console.error("Error deleting service:", error);
        alert("Failed to delete service.");
      }
    }
  };

  const openAddModal = () => {
    setEditingService(null);
    setIsModalOpen(true);
  };

  const openEditModal = (service) => {
    setEditingService(service);
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
          <h1 className="text-2xl font-heading font-bold text-text">Services</h1>
          <p className="text-muted text-sm mt-1">Manage what you offer</p>
        </div>
        <button 
          onClick={openAddModal}
          className="bg-primary text-bg font-bold py-2 px-4 rounded hover:bg-primary-lt transition-colors shadow-lg hover:shadow-primary/20"
        >
          + Add Service
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface border-b border-border text-muted font-mono uppercase text-xs">
                <th className="p-4 w-16">Icon</th>
                <th className="p-4 w-1/4">Name</th>
                <th className="p-4 hidden md:table-cell">Description</th>
                <th className="p-4 w-32 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {services.length === 0 ? (
                <tr>
                  <td colSpan="4" className="p-8 text-center text-muted">
                    No services. Click Add Service to create one.
                  </td>
                </tr>
              ) : (
                services.map((svc) => (
                  <tr key={svc.id} className="border-b border-border border-opacity-50 hover:bg-surface/50 transition-colors">
                    <td className="p-4 text-3xl text-center">{svc.icon}</td>
                    <td className="p-4 font-bold text-text">{svc.name}</td>
                    <td className="p-4 text-muted hidden md:table-cell text-sm">{svc.description}</td>
                    <td className="p-4">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openEditModal(svc)}
                          className="p-2 text-primary hover:bg-primary/10 rounded transition-colors"
                          title="Edit"
                        >
                          ✏️
                        </button>
                        <button 
                          onClick={() => handleDelete(svc.id, svc.name)}
                          className="p-2 text-red-500 hover:bg-red-500/10 rounded transition-colors"
                          title="Delete"
                        >
                          🗑️
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

      <ServiceModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        service={editingService}
      />
    </div>
  );
}
