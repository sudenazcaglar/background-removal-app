import { useState, useCallback, useEffect, useRef } from 'react';
import { Scissors, Download, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import UploadArea from './UploadArea';

const API_ENDPOINT = 'http://localhost:8000/remove-background';
const CHECKER_BG = `data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20'><rect width='10' height='10' fill='%23e2e8f0'/><rect x='10' y='10' width='10' height='10' fill='%23e2e8f0'/><rect x='10' width='10' height='10' fill='%23f8fafc'/><rect y='10' width='10' height='10' fill='%23f8fafc'/></svg>`;

type Stage = 'idle' | 'processing' | 'done' | 'error';

export default function ProcessingPanel() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [resultUrl, setResultUrl] = useState<string | null>(null);
  const [stage, setStage] = useState<Stage>('idle');
  const [message, setMessage] = useState<string | null>(null);
  const previewRef = useRef<string | null>(null);
  const resultUrlRef = useRef<string | null>(null);

  const handleFileSelected = useCallback((file: File, url: string) => {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setSelectedFile(file);
    setPreview(url);
    setResultUrl(null);
    setStage('idle');
    setMessage(null);
  }, [preview, resultUrl]);

  const handleClear = useCallback(() => {
    if (preview) URL.revokeObjectURL(preview);
    if (resultUrl) URL.revokeObjectURL(resultUrl);
    setSelectedFile(null);
    setPreview(null);
    setResultUrl(null);
    setStage('idle');
    setMessage(null);
  }, [preview, resultUrl]);

  useEffect(() => {
    previewRef.current = preview;
    resultUrlRef.current = resultUrl;
  }, [preview, resultUrl]);

  useEffect(() => {
    return () => {
      if (previewRef.current) URL.revokeObjectURL(previewRef.current);
      if (resultUrlRef.current) URL.revokeObjectURL(resultUrlRef.current);
    };
  }, []);

  const runProcessing = useCallback(async () => {
    if (!selectedFile) {
      setMessage('Lütfen önce bir görsel seçin.');
      setStage('error');
      return;
    }

    setStage('processing');
    setMessage(null);
    if (resultUrl) {
      URL.revokeObjectURL(resultUrl);
      setResultUrl(null);
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        let detail = 'GrabCut işlemi tamamlanamadı. Backend servisinin çalıştığından emin olun.';
        try {
          const errorBody = await response.json();
          if (typeof errorBody.detail === 'string') detail = errorBody.detail;
        } catch {
          detail = response.statusText || detail;
        }
        throw new Error(detail);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setResultUrl(url);
      setStage('done');
      setMessage(null);
    } catch (error) {
      setStage('error');
      setMessage(error instanceof Error ? error.message : 'Beklenmeyen bir hata oluştu.');
    }
  }, [selectedFile, resultUrl]);

  const handleDownload = () => {
    if (!resultUrl) return;
    const a = document.createElement('a');
    a.href = resultUrl;
    a.download = 'result-transparent.png';
    a.click();
  };

  return (
    <section id="upload" className="py-20 px-4 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900 mb-3">Arka Plan Kaldır</h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            Görseli yükleyin, işlemi başlatın ve şeffaf arka planlı sonucu indirin.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Upload + action */}
          <div className="space-y-5">
            <UploadArea onFileSelected={handleFileSelected} preview={preview} onClear={handleClear} />

            {message && (
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-sm">
                <AlertCircle size={16} className="shrink-0" />
                {message}
              </div>
            )}

            <button
              onClick={runProcessing}
              disabled={stage === 'processing'}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-slate-300 disabled:to-slate-400 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:shadow-cyan-500/30"
            >
              {stage === 'processing' ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  GrabCut algoritması çalışıyor...
                </>
              ) : (
                <>
                  <Scissors size={18} />
                  GrabCut ile Arka Planı Kaldır
                </>
              )}
            </button>
          </div>

          {/* Result panel */}
          <div className="rounded-2xl border-2 border-slate-200 overflow-hidden shadow-sm bg-slate-50 min-h-[280px] flex flex-col">
            <div className="px-5 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Sonuç Önizlemesi</span>
              {stage === 'done' && (
                <span className="flex items-center gap-1 text-emerald-600 text-xs font-medium">
                  <CheckCircle2 size={14} />
                  Tamamlandı
                </span>
              )}
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-6 gap-4">
              {stage === 'idle' && !preview && (
                <p className="text-slate-400 text-sm text-center">Henüz görsel yüklenmedi.</p>
              )}

              {stage === 'idle' && preview && (
                <p className="text-slate-400 text-sm text-center">"GrabCut ile Arka Planı Kaldır" butonuna basın.</p>
              )}

              {stage === 'processing' && (
                <div className="flex flex-col items-center gap-3 text-center">
                  <Loader2 size={28} className="text-cyan-500 animate-spin" />
                  <p className="text-sm font-medium text-slate-700">GrabCut algoritması çalışıyor...</p>
                  <p className="text-xs text-slate-400">OpenCV backend görseli işleyip şeffaf PNG oluşturuyor.</p>
                </div>
              )}

              {stage === 'error' && preview && (
                <p className="text-slate-400 text-sm text-center">Hata giderildikten sonra işlemi tekrar başlatabilirsiniz.</p>
              )}

              {stage === 'done' && resultUrl && (
                <>
                  <div
                    className="w-full h-56 rounded-xl overflow-hidden border border-slate-200"
                    style={{ backgroundImage: `url("${CHECKER_BG}")`, backgroundSize: '20px 20px' }}
                  >
                    <img
                      src={resultUrl}
                      alt="Sonuç"
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 shadow hover:shadow-md hover:shadow-emerald-400/30 text-sm"
                  >
                    <Download size={16} />
                    Şeffaf PNG İndir
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Before / After comparison */}
        {stage === 'done' && preview && resultUrl && (
          <div className="mt-12">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-6">Karşılaştırma</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm">
                <div className="bg-slate-100 px-4 py-2 border-b border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Önce</span>
                </div>
                <img src={preview} alt="Orijinal" className="w-full h-56 object-contain bg-white p-2" />
              </div>

              <div className="rounded-2xl overflow-hidden border-2 border-cyan-200 shadow-sm">
                <div className="bg-cyan-50 px-4 py-2 border-b border-cyan-200">
                  <span className="text-xs font-semibold text-cyan-600 uppercase tracking-widest">Sonra</span>
                </div>
                <div
                  className="w-full h-56"
                  style={{ backgroundImage: `url("${CHECKER_BG}")`, backgroundSize: '20px 20px' }}
                >
                  <img
                    src={resultUrl}
                    alt="Sonuç"
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
