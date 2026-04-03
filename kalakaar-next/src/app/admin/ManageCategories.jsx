"use client";

import { useState } from "react";
import { Plus, Trash2, Loader2 } from "lucide-react";
// RTK Query hooks import karein
import { 
  useGetCategoriesQuery, 
  useAddCategoryMutation, 
  useDeleteCategoryMutation 
} from "../../features/api/apiSlice";

export default function ManageCategories() {
  const [newCategory, setNewCategory] = useState("");

  // RTK Query hooks in action
  const { data: categories = [], isLoading: isFetching } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  // Add Category
  const handleAdd = async (e) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    
    try {
      // .unwrap() error handling ko aasan banata hai
      await addCategory({ name: newCategory }).unwrap();
      setNewCategory(""); // Form clear karein
    } catch (error) {
      console.error("Error adding category:", error);
      alert(error?.data?.message || "Failed to add category. Maybe it already exists?");
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    if (!window.confirm("Boss, delete this category?")) return;
    try {
      await deleteCategory(id).unwrap();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-8">
      {/* ADD CATEGORY FORM */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
          <Plus className="text-neutral-400" /> Add New Category
        </h2>
        <form onSubmit={handleAdd} className="flex flex-col gap-4">
          <div>
            <label className="text-xs font-mono text-neutral-500 uppercase tracking-wider mb-2 block">Category Name</label>
            <input
              type="text"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              placeholder="e.g. Video Work"
              className="w-full bg-black border border-white/10 rounded-lg p-4 text-white focus:outline-none focus:border-white/50 transition-colors"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isAdding}
            className="mt-2 bg-white text-black font-bold py-4 rounded-lg hover:bg-neutral-200 transition-colors flex justify-center items-center gap-2 disabled:opacity-50"
          >
            {isAdding ? <Loader2 className="animate-spin" size={20} /> : "Deploy Category"}
          </button>
        </form>
      </div>

      {/* ACTIVE CATEGORIES LIST */}
      <div className="bg-[#0a0a0a] border border-white/10 rounded-2xl p-6 shadow-2xl">
        <h2 className="text-xl font-bold mb-6 text-white/80 font-mono tracking-wide text-sm uppercase">
          Active Sequence
        </h2>
        
        <div className="flex flex-col gap-3 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
          {isFetching ? (
             <div className="flex justify-center py-8">
               <Loader2 className="animate-spin text-neutral-500" size={24} />
             </div>
          ) : categories.length === 0 ? (
            <p className="text-neutral-500 text-sm">No categories deployed yet.</p>
          ) : (
            categories.map((cat) => (
              <div key={cat._id} className="flex justify-between items-center bg-black border border-white/5 p-4 rounded-lg hover:border-white/20 transition-all group">
                <span className="font-medium">{cat.name}</span>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="text-red-900 hover:text-red-500 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-md transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}