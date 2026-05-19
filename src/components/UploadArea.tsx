import { useCallback, useRef, useState } from 'react';
import { Upload, ImagePlus, AlertCircle, X } from 'lucide-react';

interface UploadAreaProps {
  onFileSelected: (file: File, previewUrl: string) => void;
  preview: string | null;
  onClear: () => void;
}

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export default function UploadArea({ onFileSelected, preview, onClear }: UploadAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback(
    (file: File) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        setError('Desteklenmeyen dosya türü. Lütfen JPG, PNG veya WEBP yükleyin.');
        return;
      }
      setError(null);
      const url = URL.createObjectURL(file);
      onFileSelected(file, url);
    },
    [onFileSelected]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  return (
    <div className="w-full">
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 rounded-xl px-4 py-3 mb-4 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X size={14} />
          </button>
        </div>
      )}

      {preview ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-slate-200 shadow-sm group">
          <img src={preview} alt="Yüklenen görsel" className="w-full h-72 object-contain bg-slate-50" />
          <button
            onClick={onClear}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white border border-slate-200 rounded-full p-1.5 shadow transition-all"
          >
            <X size={16} className="text-slate-600" />
          </button>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent py-3 px-4">
            <p className="text-white text-sm font-medium">Görsel yüklendi</p>
          </div>
        </div>
      ) : (
        <div
          onDragEnter={(e) => { e.preventDefault(); setDragging(true); }}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center gap-4 cursor-pointer
            transition-all duration-200
            ${dragging
              ? 'border-cyan-400 bg-cyan-50 scale-[1.01]'
              : 'border-slate-300 bg-slate-50/60 hover:border-cyan-400 hover:bg-cyan-50/40'
            }
          `}
        >
          <div className={`p-4 rounded-full transition-colors duration-200 ${dragging ? 'bg-cyan-100' : 'bg-slate-100'}`}>
            {dragging ? (
              <ImagePlus size={32} className="text-cyan-500" />
            ) : (
              <Upload size={32} className="text-slate-400" />
            )}
          </div>
          <div className="text-center">
            <p className="font-semibold text-slate-700 mb-1">
              {dragging ? 'Görseli bırakın' : 'Görsel yüklemek için tıklayın veya sürükleyin'}
            </p>
            <p className="text-sm text-slate-500">JPG, PNG, WEBP desteklenir</p>
          </div>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={onInputChange}
      />
    </div>
  );
}
