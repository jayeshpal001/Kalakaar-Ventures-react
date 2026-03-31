import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle } from "lucide-react";

export function useToast() {
    const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

    const showToast = useCallback((message, type = "success") => {
        setToast({ visible: true, message, type });
        
        // Auto-hide the toast after 4 seconds
        setTimeout(() => {
            setToast((prev) => ({ ...prev, visible: false }));
        }, 4000);
    }, []);

    const ToastComponent = () => (
        <AnimatePresence>
            {toast.visible && (
                <motion.div
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ 
                        opacity: 1, 
                        y: 0, 
                        scale: 1,
                        transition: { type: "spring", stiffness: 400, damping: 25 } 
                    }}
                    exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.2 } }}
                    className="fixed bottom-8 right-8 z-50 flex items-center gap-4 bg-neutral-900 border border-neutral-800 p-5 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                    {toast.type === "success" ? (
                        <CheckCircle className="text-green-500 w-6 h-6" />
                    ) : (
                        <XCircle className="text-red-500 w-6 h-6" />
                    )}
                    <div className="flex flex-col">
                        <span className="text-foreground font-bold text-sm">
                            {toast.type === "success" ? "System Notification" : "Error"}
                        </span>
                        <span className="text-muted text-sm">{toast.message}</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return { showToast, ToastComponent };
}