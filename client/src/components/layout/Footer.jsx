export default function Footer() {
  return (
    <footer className="w-full py-8 border-t border-neutral-900 mt-12 text-center">
      <p className="text-sm text-neutral-500">
        © {new Date().getFullYear()} Kalakaar Ventures. Built with vision.
      </p>
    </footer>
  );
}