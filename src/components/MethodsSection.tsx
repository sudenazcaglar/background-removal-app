import { Layers } from 'lucide-react';

const METHODS = [
  {
    icon: <Layers size={28} className="text-blue-500" />,
    bg: 'bg-blue-50',
    border: 'border-blue-100',
    badge: 'Klasik Yöntem',
    badgeColor: 'bg-blue-100 text-blue-700',
    title: 'GrabCut Algorithm',
    desc: 'Kullanıcı etkileşimi veya başlangıç maskesiyle nesne ve arka planı ayıran klasik görüntü işleme algoritması. Iteratif Gaussian Mixture Model (GMM) ve grafik kesimi yöntemini birleştirir.',
    tags: ['GMM', 'Graf Kesimi', 'Iteratif'],
  },
];

export default function MethodsSection() {
  return (
    <section className="py-20 px-4 bg-gradient-to-b from-slate-50 to-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Kullanılan Yöntem
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">GrabCut Algorithm</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Bu uygulama yalnızca OpenCV GrabCut algoritmasıyla çalışır.
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-6 max-w-2xl mx-auto">
          {METHODS.map((m) => (
            <div
              key={m.title}
              className={`${m.bg} border ${m.border} rounded-2xl p-6 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start justify-between">
                <div className={`${m.bg} p-3 rounded-xl border ${m.border}`}>{m.icon}</div>
                <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${m.badgeColor}`}>
                  {m.badge}
                </span>
              </div>

              <div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{m.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{m.desc}</p>
              </div>

              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {m.tags.map((t) => (
                  <span key={t} className="text-xs bg-white/80 border border-slate-200 text-slate-600 px-2.5 py-0.5 rounded-full">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
