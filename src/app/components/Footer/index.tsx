export default function Footer() {
  return (
    <footer className="mt-12 bg-black text-white text-sm z-50">
      <div className="max-w-5xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="font-semibold mb-3 text-base">Öppettider</h3>
          <ul className="space-y-1 opacity-90">
            <li>Mån-Tors: 10:00 - 20:00</li>
            <li>Fre: 10:00 - 22:00</li>
            <li>Lör: 12:00 - 22:00</li>
            <li>Sön: 12:00 - 18:00</li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base">Adress</h3>
          <p className="opacity-90 leading-relaxed">
            Foodie Street 12<br />
            123 45 Stockholm
          </p>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base">Karta</h3>
          <div className="w-full h-32 rounded bg-white/5 border border-white/10 flex items-center justify-center text-[11px] tracking-wide uppercase">
            Map Placeholder
          </div>
        </div>
        <div>
          <h3 className="font-semibold mb-3 text-base">Allergeninfo</h3>
          <p className="opacity-90 leading-relaxed">
            Fråga personalen om ingredienser i din rätt om du har allergier. Vi hanterar
            vanliga allergener i köket.
          </p>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} Foodie - Alla rättigheter förbehålls
      </div>
    </footer>
  );
}