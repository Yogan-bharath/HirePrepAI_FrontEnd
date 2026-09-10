const Footer = () => {
  return (
    <footer className="border-t border-[#e3e6eb] bg-[#f7f7f5] px-4 py-7 text-[#5f697c] sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-295 flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <a href="/home" className="text-lg font-black tracking-tighter text-[#273451]">
            HirePrep <span className="text-[#7185d0]">AI</span>
          </a>
          <p className="mt-1.5 text-xs font-medium text-[#8790a2]">
            © {new Date().getFullYear()} HirePrep AI. Intelligence in every interaction.
          </p>
        </div>

        <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] font-bold tracking-widest text-[#778196]">
          <a href="#" className="transition hover:text-[#5269b2]">PRIVACY</a>
          <a href="#" className="transition hover:text-[#5269b2]">TERMS</a>
          <a href="#" className="transition hover:text-[#5269b2]">SUPPORT</a>
          <a href="#" className="transition hover:text-[#5269b2]">API</a>
        </nav>
      </div>
    </footer>
  )
}

export default Footer