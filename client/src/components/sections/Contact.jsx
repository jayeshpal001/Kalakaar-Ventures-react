import { useState } from "react";
import { motion } from "framer-motion";
import { Mail,  Send, CheckCircle } from "lucide-react";
import { useSendMessageMutation } from "../../features/api/apiSlice";

export default function Contact() {
    const [formData, setFormData] = useState({ name: "", email: "", message: "" });
    const [sendMessage, { isLoading, isSuccess, isError }] = useSendMessageMutation();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendMessage(formData).unwrap();
            setFormData({ name: "", email: "", message: "" }); // Clear form on success
        } catch (err) {
            console.error("Message transmission failed:", err);
        }
    };

    return (
        <section id="contact" className="py-24 px-6 max-w-4xl mx-auto w-full">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6 }}
                className="text-center mb-16"
            >
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Let's Create Together</h2>
                <p className="text-muted max-w-2xl mx-auto text-lg">
                    Whether you need a cinematic edit, a bold design, or want to collaborate on a project—drop a message.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

                {/* THE ACTIVE FORM */}
                <motion.form
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-4 relative"
                >
                    {isSuccess ? (
                        <div className="absolute inset-0 bg-background/90 flex flex-col items-center justify-center rounded-xl z-10 border border-neutral-800">
                            <CheckCircle className="text-green-500 w-12 h-12 mb-4" />
                            <h3 className="text-xl font-bold text-foreground mb-2">Transmission Successful</h3>
                            <p className="text-muted text-center text-sm px-6">Your message has been securely routed to Kalakaar Ventures. I will be in touch shortly.</p>
                        </div>
                    ) : null}

                    <div className="flex flex-col gap-1">
                        <label htmlFor="name" className="text-sm text-neutral-400 pl-1">Name</label>
                        <input required type="text" id="name" value={formData.name} onChange={handleChange} placeholder="How should I address you?" className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-sm text-neutral-400 pl-1">Email</label>
                        <input required type="email" id="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-colors" />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="message" className="text-sm text-neutral-400 pl-1">Project Details</label>
                        <textarea required id="message" value={formData.message} onChange={handleChange} rows={4} placeholder="Tell me about your vision..." className="w-full bg-neutral-900/50 border border-neutral-800 rounded-xl px-4 py-3 text-foreground placeholder:text-neutral-600 focus:outline-none focus:border-accent transition-colors resize-none" />
                    </div>

                    {isError && <p className="text-red-500 text-sm text-center mt-2">Transmission failed. Please try again later.</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="mt-2 w-full flex items-center justify-center gap-2 bg-foreground text-background font-semibold py-4 rounded-xl hover:scale-[1.02] transition-transform duration-300 disabled:opacity-50"
                    >
                        {isLoading ? "Transmitting..." : "Send Message"} <Send className="w-4 h-4" />
                    </button>
                </motion.form>

                {/* STATIC CONTACT INFO */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col gap-8 md:pl-8 border-t md:border-t-0 md:border-l border-neutral-800 pt-8 md:pt-0"
                >
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-foreground">Direct Contact</h3>
                        <a href="mailto:hello@kalakaarventures.com" className="flex items-center gap-3 text-muted hover:text-accent transition-colors">
                            <Mail className="w-5 h-5" /> wdjayeshpal@gmail.com
                        </a>
                    </div>
                    <div>
                        <h3 className="text-xl font-semibold mb-4 text-foreground">Follow the Journey</h3>
                        <div className="flex gap-4">
                            <a href="#" className="p-3 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors text-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-instagram" viewBox="0 0 16 16">
                                    <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
                                </svg>
                            </a>
                            <a href="#" className="p-3 bg-neutral-900 border border-neutral-800 rounded-full hover:bg-neutral-800 transition-colors text-foreground">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-youtube" viewBox="0 0 16 16">
                                    <path d="M8.051 1.999h.089c.822.003 4.987.033 6.11.335a2.01 2.01 0 0 1 1.415 1.42c.101.38.172.883.22 1.402l.01.104.022.26.008.104c.065.914.073 1.77.074 1.957v.075c-.001.194-.01 1.108-.082 2.06l-.008.105-.009.104c-.05.572-.124 1.14-.235 1.558a2.01 2.01 0 0 1-1.415 1.42c-1.16.312-5.569.334-6.18.335h-.142c-.309 0-1.587-.006-2.927-.052l-.17-.006-.087-.004-.171-.007-.171-.007c-1.11-.049-2.167-.128-2.654-.26a2.01 2.01 0 0 1-1.415-1.419c-.111-.417-.185-.986-.235-1.558L.09 9.82l-.008-.104A31 31 0 0 1 0 7.68v-.123c.002-.215.01-.958.064-1.778l.007-.103.003-.052.008-.104.022-.26.01-.104c.048-.519.119-1.023.22-1.402a2.01 2.01 0 0 1 1.415-1.42c.487-.13 1.544-.21 2.654-.26l.17-.007.172-.006.086-.003.171-.007A100 100 0 0 1 7.858 2zM6.4 5.209v4.818l4.157-2.408z" />
                                </svg>                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}