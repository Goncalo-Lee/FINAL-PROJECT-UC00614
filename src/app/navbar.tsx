export default function Navbar() {
    return (
        <nav className="hidden sm:flex text-sm font-medium text-slate-500 gap-8">
            <a href="#features" className="hover:text-blue-600 transition-colors">Features</a>
            <a href="#docs" className="hover:text-blue-600 transition-colors">Documentation</a>
            <a href="#about" className="hover:text-blue-600 transition-colors">About</a>
        </nav>
    )
}