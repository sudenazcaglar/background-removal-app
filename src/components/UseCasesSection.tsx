import { ShoppingBag, Megaphone, Share2 } from 'lucide-react';

const CASES = [
  {
    icon: <ShoppingBag size={32} className="text-blue-500" />,
    bg: 'from-blue-50 to-sky-50',
    border: 'border-blue-100',
    title: 'E-Ticaret Ürün Fotoğrafları',
    desc: 'Ürün görsellerini temiz, profesyonel beyaz arka plana otomatik olarak taşıyın. Dönüşüm oranlarını ve müşteri güvenini artırın.',
    img: 'https://images.pexels.com/photos/5632399/pexels-photo-5632399.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: <Megaphone size={32} className="text-cyan-500" />,
    bg: 'from-cyan-50 to-teal-50',
    border: 'border-cyan-100',
    title: 'Dijital Pazarlama',
    desc: 'Reklam görselleri ve kampanya materyalleri için nesneyi ön plana çıkarın. Farklı arkaplanlarla saniyeler içinde yeni kompozisyonlar oluşturun.',
    img: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    icon: <Share2 size={32} className="text-teal-500" />,
    bg: 'from-teal-50 to-emerald-50',
    border: 'border-teal-100',
    title: 'Sosyal Medya İçeriği',
    desc: 'Profil fotoğrafları, story görselleri ve içerikler için arka planı kolayca değiştirin. Markanıza uygun görseller üretin.',
    img: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];

export default function UseCasesSection() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block bg-teal-100 text-teal-700 text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
            Uygulama Alanları
          </span>
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Nerede Kullanılır?</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Arka plan kaldırma teknolojisi birçok alanda iş akışını hızlandırır.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {CASES.map((c) => (
            <div key={c.title} className={`rounded-2xl border ${c.border} overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200`}>
              <div className="relative h-44 overflow-hidden">
                <img src={c.img} alt={c.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                <div className={`absolute top-3 left-3 p-2 rounded-xl bg-gradient-to-br ${c.bg} border ${c.border} shadow`}>
                  {c.icon}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-slate-900 mb-2">{c.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{c.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
