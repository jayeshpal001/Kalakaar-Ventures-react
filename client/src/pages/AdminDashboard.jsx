import { useState } from "react";
import { motion } from "framer-motion";
import { categories } from "../data";
import { useAddProjectMutation } from "../features/api/apiSlice";

export default function AdminDashboard() {
  const [addProject, { isLoading, isSuccess, isError }] = useAddProjectMutation();
  
  const [formData, setFormData] = useState({
    title: "",
    category: categories[1], 
    description: "",
    image: "",
    story: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // RTK Query handles the POST request and instantly invalidates the cache
      await addProject(formData).unwrap(); 
      setFormData({ title: "", category: categories[1], description: "", image: "", story: "" });
    } catch (err) {
      console.error("Failed to save the project: ", err);
    }
  };

  return (
    <div className="min-h-screen pt-24 pb-12 px-6 max-w-3xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-4xl font-bold mb-2">Command Center</h1>
        <p className="text-muted mb-10">Upload new projects to the Kalakaar Ventures portfolio.</p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800">
          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">Project Title</label>
            <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">Category</label>
            <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent appearance-none">
              {categories.filter(c => c !== "All").map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">Image/Video Thumbnail URL</label>
            <input required type="text" name="image" placeholder="https://..." value={formData.image} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">Short Description</label>
            <input required type="text" name="description" value={formData.description} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent" />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm text-neutral-400">The Story Behind This (Optional)</label>
            <textarea name="story" rows={3} value={formData.story} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent resize-none" />
          </div>

          <button 
            type="submit" 
            disabled={isLoading}
            className="mt-4 w-full bg-foreground text-background font-semibold py-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50"
          >
            {isLoading ? "Deploying..." : "Deploy to Portfolio"}
          </button>

          {isSuccess && <p className="text-center text-sm text-green-500 mt-2">Project deployed successfully!</p>}
          {isError && <p className="text-center text-sm text-red-500 mt-2">Deployment failed. Check connection.</p>}
        </form>
      </motion.div>
    </div>
  );
}