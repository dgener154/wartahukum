import React from 'react';
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Scale,
  FileText,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { usePortal } from '../../context/PortalContext';

interface FooterProps {
  onNavigateStaticPage: (slug: string) => void;
  onSelectCategory: (categoryId: string) => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateStaticPage,
  onSelectCategory,
  onOpenLogin,
}) => {
  const { settings, categories } = usePortal();
  const activeCategories = categories.filter((c) => c.active).slice(0, 10);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-slate-950 text-slate-300 border-t border-slate-800 pt-12 pb-8">
      {/* Rainbow top line */}
      <div className="h-1 w-full rainbow-gradient-bar mb-8" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Media Identity & Legal Description (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <Logo size="lg" tagline={settings.tagline} showTagline={true} />

            <p className="text-xs text-slate-400 leading-relaxed">
              <strong>WARTA HUKUM</strong> adalah portal media siber nasional independen yang menyajikan informasi hukum, peradilan, kepolisian, kejaksaan, korupsi, politik kenegaraan, dan dinamika daerah dengan berlandaskan Undang-Undang Nomor 40 Tahun 1999 tentang Pers dan Kode Etik Jurnalistik.
            </p>

            <div className="space-y-2 text-xs text-slate-400 pt-2 border-t border-slate-800/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{settings.editorialAddress}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <span>Surel Redaksi: {settings.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Hotline / WhatsApp: {settings.whatsapp}</span>
              </div>
            </div>

            {/* Social Media */}
            <div className="flex items-center gap-2 pt-2">
              <a
                href={settings.socialLinks.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={settings.socialLinks.youtube}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Kategori Berita (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Kanal Berita
            </h3>
            <ul className="grid grid-cols-2 gap-y-2 gap-x-3 text-xs">
              {activeCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => onSelectCategory(cat.id)}
                    className="text-slate-400 hover:text-red-400 transition-colors text-left truncate w-full"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Etika & Kebijakan Redaksi (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Pedoman & Legalitas
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onNavigateStaticPage('pedoman-media-siber')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-red-500" />
                  <span>Pedoman Media Siber</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('hak-jawab-dan-koreksi')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <FileText className="w-3.5 h-3.5 text-amber-500" />
                  <span>Kebijakan Hak Jawab & Koreksi</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('susunan-redaksi-manajemen')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Scale className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Dewan Redaksi & Penanggung Jawab</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('kontak-dan-pengaduan-pembaca')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <AlertCircle className="w-3.5 h-3.5 text-rose-500" />
                  <span>Kontak Pengaduan Pembaca</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateStaticPage('kebijakan-privasi')}
                  className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
                  <span>Kebijakan Privasi</span>
                </button>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <p className="font-semibold text-slate-300">Badan Hukum Penerbit:</p>
              <p className="text-slate-400">{settings.legalEntityName}</p>
              <p className="text-[10px] text-slate-500">{settings.companyRegistrationNote}</p>
            </div>
          </div>

          {/* Col 4: Dewan Redaksi & Akses Petugas (2 cols) */}
          <div className="lg:col-span-2 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-white border-b border-slate-800 pb-2">
              Sistem Redaksi
            </h3>
            <p className="text-xs text-slate-400">
              Pemimpin Redaksi:<br />
              <strong className="text-slate-200">{settings.editorInChief}</strong>
            </p>

            <div className="pt-2">
              <button
                onClick={onOpenLogin}
                className="w-full py-2 px-3 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors text-center block"
              >
                Login Portal Redaksi
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Strip */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-2">
          <p>© {currentYear} WARTA HUKUM. Seluruh Hak Cipta Dilindungi Undang-Undang.</p>
          <p className="text-[11px]">
            Menjunjung Tinggi Kebebasan Pers yang Bertanggung Jawab & Profesional.
          </p>
        </div>
      </div>
    </footer>
  );
};
