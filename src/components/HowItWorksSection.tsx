import { Upload, Cpu, Eraser, FileImage } from 'lucide-react';

const STEPS = [
  {
    icon: <Upload size={24} className="text-blue-500" />,
    bg: 'bg-blue-100',
    number: '01',
    title: 'Görsel Yükle',
    desc: 'JPG, PNG veya WEBP formatında bir fotoğraf yükleyin. Sürükle-bırak ile hızlıca ekleyin.',
  },
  {
    icon: <Cpu size={24} className="text-cyan-500" />,
    bg: 'bg-cyan-100',
    number: '02',
    title: 'Segmentasyon Uygulanır',
    desc: 'Backend, OpenCV GrabCut algoritmasını 5 iterasyonla çalıştırarak nesne ve arka planı ayrıştırır.',
  },
  {
    icon: <Eraser size={24} className="text-teal-500" />,
    bg: 'bg-teal-100',
    number: '03',
    title: 'Arka Plan Kaldırılır',
    desc: 'Tespit edilen arka plan bölgeleri piksel seviyesinde silinir, nesne korunur.',
  },
  {
    icon: <FileImage size={24} className="text-emerald-500" />,
    bg: 'bg-emerald-100',
    number: '04',
    title: 'Şeffaf PNG Çıktısı',
    desc: 'Sonuç, şeffaf arka planlı PNG formatında indirilmek üzere hazırlanır.',
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-br from-slate-900 via-blue-950 to-cyan-900 text-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-14">
          <span className="inline-block bg-white/10 border border-white/20 text-cyan-300 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Süreç
          </span>
          <h2 className="text-3xl font-bold mb-3">Nasıl Çalışır?</h2>
          <p className="text-slate-400 max-w-xl mx-auto">
            Dört basit adımda arka plan kaldırma işlemi tamamlanır.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <div key={s.title} className="relative">
              {/* Connector line */}
              {i < STEPS.length - 1 && (
                <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-white/20 to-transparent z-0" />
              )}

              <div className="relative z-10 bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition-colors duration-200 backdrop-blur-sm">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`${s.bg} p-2.5 rounded-xl`}>{s.icon}</div>
                  <span className="text-2xl font-black text-white/20 leading-none">{s.number}</span>
                </div>
                <h3 className="font-bold text-white mb-2">{s.title}</h3>
                <p className="text-sm text-slate-400 leading-relaxed">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
