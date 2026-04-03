"use client";

import { useState } from "react";
import { Trash2, Loader2, Briefcase } from "lucide-react";
// RTK Query hooks import karein
import { 
  useGetServicesQuery, 
  useAddServiceMutation, 
  useDeleteServiceMutation 
} from "../../features/api/apiSlice";

export default function ManageServices() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });

  // RTK Query hooks in action
  const { data: services = [], isLoading: isFetching } = useGetServicesQuery();
  const [addService, { isLoading: isAdding }] = useAddServiceMutation();
  const [deleteService] = useDeleteServiceMutation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add Service
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) return;
    
    try {
      await addService(formData).unwrap();
      setFormData({ title: "", description: "" }); // Form clear karein
    } catch (error) {
      console.error("Error adding service:", error);
      alert(error?.data?.message || "Failed to deploy service.");
    }
  };

  // Delete Service
  const handleDelete = async (id) => {
    if (!window.confirm("Boss, delete this service from the platform?")) return;
    try {
      await deleteService(id).unwrap();
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  const inputStyles = "w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/50 transition-colors";

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* ADD SERVICE FORM */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 drop-shadow-md">
          <Briefcase className="text-neutral-400" /> Define New Service
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2 block">Service Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g. Brand Storytelling"
              className={inputStyles}
              required
            />
          </div>
          <div>
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2 block">Short Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Briefly describe what this service offers..."
              className={`${inputStyles} min-h-[100px] resize-none`}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isAdding}
            className="mt-4 bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isAdding ? <Loader2 className="animate-spin" size={20} /> : "Deploy Service"}
          </button>
        </form>
      </div>

      {/* ACTIVE SERVICES LIST */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-white/80 font-mono tracking-wide text-sm uppercase">
          Active Services Output
        </h2>
        
        <div className="flex flex-col gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-2">
          {isFetching ? (
            <div className="flex justify-center py-8">
              <Loader2 className="animate-spin text-neutral-500" size={24} />
            </div>
          ) : services.length === 0 ? (
            <p className="text-neutral-500 text-sm">No services deployed yet.</p>
          ) : (
            services.map((srv) => (
              <div key={srv._id} className="flex flex-col gap-2 bg-black border border-white/5 p-5 rounded-xl hover:border-white/20 transition-all group relative">
                <div className="flex justify-between items-start">
                  <span className="font-bold text-lg text-white">{srv.title}</span>
                  <button
                    onClick={() => handleDelete(srv._id)}
                    className="text-red-900 hover:text-red-500 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100 absolute top-4 right-4"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm text-neutral-400 line-clamp-2 pr-10">{srv.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}