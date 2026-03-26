import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { categories } from "../data";
import { 
  useGetProjectsQuery, 
  useAddProjectMutation, 
  useUpdateProjectMutation, 
  useDeleteProjectMutation,
  useUploadMediaMutation,
  useReorderProjectsMutation // Import the new hook
} from "../features/api/apiSlice";
import { Trash2, Edit3, X, UploadCloud, GripVertical } from "lucide-react";

// --- DnD Kit Imports ---
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// --- NEW Component: The Draggable Project Card ---
function SortableProjectCard({ project, onEdit, onDelete }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: project._id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <div ref={setNodeRef} style={style} className={`flex flex-col sm:flex-row gap-4 bg-neutral-900 p-4 rounded-xl border items-start sm:items-center justify-between group relative ${isDragging ? 'border-accent shadow-2xl scale-[1.02]' : 'border-neutral-800'}`}>
      
      <div className="flex items-center gap-4 w-full">
        {/* The Drag Handle */}
        <div {...attributes} {...listeners} className="text-neutral-600 hover:text-white cursor-grab active:cursor-grabbing p-1 touch-none">
          <GripVertical size={20} />
        </div>
        
        <div className="flex flex-col">
          <span className="text-accent text-xs font-bold uppercase tracking-wider mb-1">{project.category}</span>
          <h3 className="text-lg font-bold text-foreground line-clamp-1">{project.title}</h3>
        </div>
      </div>

      <div className="flex gap-2 w-full sm:w-auto mt-4 sm:mt-0 pl-10 sm:pl-0">
        <button onClick={() => onEdit(project)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-foreground rounded-lg transition-colors text-sm font-semibold">
          <Edit3 size={16} /> Edit
        </button>
        <button onClick={() => onDelete(project._id)} className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-red-950/30 hover:bg-red-900/50 text-red-500 rounded-lg transition-colors text-sm font-semibold">
          <Trash2 size={16} /> Delete
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const { data: projects = [] } = useGetProjectsQuery();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();
  const [deleteProject] = useDeleteProjectMutation();
  const [uploadMedia, { isLoading: isUploading }] = useUploadMediaMutation();
  const [reorderProjects] = useReorderProjectsMutation(); // Initialize Reorder Hook
  
  // Local state to handle instant drag-and-drop visuals before server confirms
  const [localProjects, setLocalProjects] = useState([]);

  // Sync local state when database fetches new data
  useEffect(() => {
    setLocalProjects(projects);
  }, [projects]);
  
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: "", category: categories[1], description: "", image: "", story: "" });

  // --- DnD Configuration ---
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = localProjects.findIndex((p) => p._id === active.id);
      const newIndex = localProjects.findIndex((p) => p._id === over.id);
      
      // 1. Instantly move the array locally for a smooth UI
      const newArray = arrayMove(localProjects, oldIndex, newIndex);
      setLocalProjects(newArray);

      // 2. Format the payload with the new order indexes
      const payload = newArray.map((p, index) => ({
        _id: p._id,
        order: index
      }));

      // 3. Silently shoot the new array to the Express backend
      try {
        await reorderProjects(payload).unwrap();
      } catch (err) {
        console.error("Failed to sync sequence with server:", err);
      }
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const uploadData = new FormData();
    uploadData.append("media", file); 
    try {
      const response = await uploadMedia(uploadData).unwrap();
      if (response.success) setFormData((prev) => ({ ...prev, image: response.url }));
    } catch (err) {
      alert("Media upload failed. Check connection and file size.");
    }
  };

  const handleEditClick = (project) => {
    setEditingId(project._id);
    setFormData({ title: project.title, category: project.category, description: project.description, image: project.image, story: project.story || "" });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({ title: "", category: categories[1], description: "", image: "", story: "" });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Boss, are you sure you want to delete this project?")) {
      await deleteProject(id).unwrap();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateProject({ id: editingId, ...formData }).unwrap();
      setEditingId(null);
    } else {
      await addProject(formData).unwrap(); 
    }
    setFormData({ title: "", category: categories[1], description: "", image: "", story: "" });
  };

  return (
    <div className="min-h-screen pt-24 pb-24 px-6 max-w-5xl mx-auto w-full">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        
        {/* LEFT COLUMN: THE UPLOAD/EDIT FORM (Unchanged) */}
        <div>
          <h1 className="text-4xl font-bold mb-2">Command Center</h1>
          <p className="text-muted mb-10">{editingId ? "Update existing project parameters." : "Upload new projects to the Kalakaar Ventures portfolio."}</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 sticky top-24">
            {editingId && (
              <div className="flex justify-between items-center bg-accent/10 border border-accent/20 p-4 rounded-lg mb-2">
                <span className="text-accent text-sm font-semibold">EDIT MODE ACTIVE</span>
                <button type="button" onClick={cancelEdit} className="text-muted hover:text-white transition-colors"><X size={20} /></button>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-400">Project Title</label>
              <input required type="text" name="title" value={formData.title} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-400">Category</label>
              <select name="category" value={formData.category} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent appearance-none">
                {categories.filter(c => c !== "All").map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div className="flex flex-col gap-2 p-4 border border-dashed border-neutral-700 rounded-xl bg-background/50">
              <label className="text-sm text-neutral-400 flex items-center gap-2"><UploadCloud size={16} /> Direct Cloud Upload</label>
              <input type="file" accept="image/*,video/mp4,video/webm" onChange={handleFileUpload} disabled={isUploading} className="w-full text-sm text-neutral-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-accent file:text-white hover:file:bg-blue-600 transition-all cursor-pointer disabled:opacity-50" />
              {isUploading && <p className="text-accent text-xs mt-1 animate-pulse">Uploading to secure cloud vault. Please wait...</p>}
              
              <div className="flex items-center gap-4 my-2">
                <div className="h-px bg-neutral-800 flex-1"></div>
                <span className="text-xs text-neutral-500 font-semibold uppercase tracking-widest">OR PASTE LINK</span>
                <div className="h-px bg-neutral-800 flex-1"></div>
              </div>

              <input required type="text" name="image" placeholder="YouTube or direct media URL..." value={formData.image} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent text-sm" />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm text-neutral-400">Short Description</label>
              <input required type="text" name="description" value={formData.description} onChange={handleChange} className="w-full bg-background border border-neutral-800 rounded-xl px-4 py-3 text-foreground focus:outline-none focus:border-accent" />
            </div>

            <button type="submit" disabled={isAdding || isUpdating || isUploading} className={`mt-4 w-full text-background font-semibold py-4 rounded-xl hover:scale-[1.02] transition-all duration-300 disabled:opacity-50 ${editingId ? 'bg-accent text-white' : 'bg-foreground'}`}>
              {isAdding || isUpdating ? "Deploying..." : editingId ? "Save Modifications" : "Deploy to Portfolio"}
            </button>
          </form>
        </div>

        {/* RIGHT COLUMN: DRAG AND DROP INVENTORY */}
        <div>
          <h2 className="text-2xl font-bold mb-6">Active Database Sequence</h2>
          <div className="flex flex-col gap-4">
            
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={localProjects.map(p => p._id)} strategy={verticalListSortingStrategy}>
                {localProjects.map((project) => (
                  <SortableProjectCard 
                    key={project._id} 
                    project={project} 
                    onEdit={handleEditClick} 
                    onDelete={handleDelete} 
                  />
                ))}
              </SortableContext>
            </DndContext>

            {localProjects.length === 0 && (
              <p className="text-muted text-center py-12 border border-dashed border-neutral-800 rounded-xl">Database is currently empty.</p>
            )}
          </div>
        </div>

      </motion.div>
    </div>
  );
}