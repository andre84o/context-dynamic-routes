export default function Footer() {
  return (
    <footer className="mt-12 bg-black text-white text-sm z-50">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        <div className="w-full grid grid-cols-2 gap-8 md:block col-span-full md:col-span-1">
          <div>
            <h3 className="font-semibold mb-3 text-base">Opening Hours</h3>
            <ul className="space-y-1 opacity-90 text-[13px] sm:text-sm">
              <li>Mon-Thu: 10:00 - 20:00</li>
              <li>Fri: 10:00 - 22:00</li>
              <li>Sat: 12:00 - 22:00</li>
              <li>Sun: 12:00 - 18:00</li>
            </ul>
          </div>
          <div className="md:mt-8 md:pt-1">
            <h3 className="font-semibold mb-3 text-base md:mt-0">Address</h3>
            <p className="opacity-90 leading-relaxed text-[13px] sm:text-sm">
              Foodie Street 12<br />
              123 45 Stockholm
            </p>
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base">Map</h3>
          <div className="w-full h-32 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[11px] tracking-wide uppercase">
            Map Placeholder
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base">Allergen Info</h3>
          <p className="opacity-90 leading-relaxed">
            Ask the staff about the ingredients in your dish if you have allergies. We
            handle common allergens in the kitchen.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Foodie - All rights reserved
      </div>
    </footer>
  );
}