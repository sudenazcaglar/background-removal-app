import { Scissors, Sparkles } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-900 text-white py-24 px-4">
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-4xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 mb-6 text-sm font-medium tracking-wide backdrop-blur-sm">
          <Sparkles size={14} className="text-cyan-300" />
          Yöntem: GrabCut Algorithm
        </div>

        <h1 className="text-5xl sm:text-6xl font-extrabold leading-tight mb-6 tracking-tight">
          Arka Plan{' '}
          <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
            Kaldırma Aracı
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Fotoğraflardan arka planı kaldırıp nesneyi öne çıkaran gerçek OpenCV GrabCut uygulaması.
        </p>

        <a
          href="#upload"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 transition-all duration-200 text-white font-semibold px-8 py-3.5 rounded-xl shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 hover:-translate-y-0.5"
        >
          <Scissors size={18} />
          Hemen Dene
        </a>
      </div>
    </section>
  );
}
