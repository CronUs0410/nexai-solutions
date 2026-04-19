"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";

const EMOJIS = ["🌐", "🤖", "⚙️", "📄", "🎬", "📊", "🎨", "🚀", "💡", "🛡️", "📱", "📈"];

export default function ServiceModal({ isOpen, onClose, service }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("🌐");
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description);
      setIcon(service.icon);
      setOrder(service.order || 0);
    } else {
      setName("");
      setDescription("");
      setIcon("🌐");
      setOrder(0);
    }
    setError("");
  }, [service, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const data = {
        name,
        description,
        icon,
        order: Number(order)
      };

      if (service) {
        await updateDoc(doc(db, "services", service.id), data);
      } else {
        await addDoc(collection(db, "services"), {
          ...data,
          createdAt: new Date()
        });
      }
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
          {service ? "Edit Service" : "Add Service"}
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 text-sm p-3 rounded-md mb-4 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-mono text-muted mb-1">Emoji Icon</label>
            <div className="flex flex-wrap gap-2 mb-2 p-2 bg-surface rounded-lg border border-border">
              {EMOJIS.map(em => (
                <button
                  key={em}
                  type="button"
                  onClick={() => setIcon(em)}
                  className={`text-2xl p-1 rounded transition-transform hover:scale-125 ${icon === em ? 'bg-primary/20 scale-125' : ''}`}
                >
                  {em}
                </button>
              ))}
            </div>
            <input
              type="text"
              value={icon}
              onChange={(e) => setIcon(e.target.value)}
              className="w-20 px-3 py-2 bg-surface border border-border rounded-md text-text text-xl"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted mb-1">Service Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-mono text-muted mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none h-24 resize-none"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-mono text-muted mb-1">Order Number</label>
            <input
              type="number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              className="w-full px-4 py-2 bg-surface border border-border rounded-md text-text focus:border-primary focus:ring-1 focus:ring-primary outline-none"
              required
            />
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
