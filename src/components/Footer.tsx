import { Scissors } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-8">
          <div className="flex items-center gap-2 text-white font-bold text-lg shrink-0">
            <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-1.5 rounded-lg">
              <Scissors size={18} />
            </div>
            Arka Plan Kaldırma Aracı
          </div>

          <p className="text-sm text-slate-500 leading-relaxed sm:border-l sm:border-slate-700 sm:pl-6 max-w-2xl">
            Bu proje, Python FastAPI backend üzerinde çalışan OpenCV GrabCut algoritmasıyla
            fotoğraflardan gerçek şeffaf PNG çıktısı üretir.
          </p>
        </div>

        <div className="border-t border-slate-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
          <span>Görüntü İşleme Dersi - Proje Uygulaması</span>
          <div className="flex items-center gap-3">
            <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-500">GrabCut</span>
            <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-500">FastAPI</span>
            <span className="px-2 py-0.5 bg-slate-800 rounded text-slate-500">OpenCV Python</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
