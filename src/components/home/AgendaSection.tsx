import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Building, ArrowRight, CheckCircle2 } from 'lucide-react';
import { AgendaItem } from '../../types';

interface AgendaSectionProps {
  agendas: AgendaItem[];
  onViewAllAgenda: () => void;
}

export const AgendaSection: React.FC<AgendaSectionProps> = ({
  agendas,
  onViewAllAgenda,
}) => {
  const publicAgendas = agendas.filter((a) => a.isPublic).slice(0, 3);
  const [selectedAgenda, setSelectedAgenda] = useState<AgendaItem | null>(null);

  if (publicAgendas.length === 0) return null;

  const formatAgendaDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return {
        day: date.getDate(),
        month: date.toLocaleDateString('id-ID', { month: 'short' }),
        weekday: date.toLocaleDateString('id-ID', { weekday: 'short' }),
      };
    } catch {
      return { day: '15', month: 'Okt', weekday: 'Kam' };
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Calendar className="w-4 h-4 text-indigo-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-indigo-700">
              Agenda & Peristiwa Mendatang
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Jadwal Sidang Terbuka & Kegiatan Hukum
          </h2>
        </div>

        <button
          onClick={onViewAllAgenda}
          className="text-xs font-bold text-indigo-700 hover:text-indigo-800 flex items-center gap-1"
        >
          <span>Seluruh Agenda</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {publicAgendas.map((item) => {
          const d = formatAgendaDate(item.date);
          return (
            <div
              key={item.id}
              onClick={() => setSelectedAgenda(item)}
              className="group bg-white rounded-xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer flex gap-4"
            >
              {/* Date Box */}
              <div className="flex flex-col items-center justify-center w-14 h-16 rounded-xl bg-slate-900 text-white shrink-0 shadow-xs group-hover:bg-indigo-600 transition-colors">
                <span className="text-[10px] uppercase font-bold text-slate-300">
                  {d.month}
                </span>
                <span className="text-xl font-bold font-mono leading-none my-0.5">
                  {d.day}
                </span>
                <span className="text-[9px] uppercase text-indigo-200">{d.weekday}</span>
              </div>

              {/* Agenda Details */}
              <div className="flex-1 min-w-0">
                <span className="text-[10px] font-bold uppercase text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                  {item.status === 'upcoming' ? 'Akan Datang' : item.status}
                </span>

                <h3 className="font-bold text-xs sm:text-sm text-slate-900 group-hover:text-indigo-600 transition-colors line-clamp-2 mt-1.5 leading-snug">
                  {item.title}
                </h3>

                <div className="mt-2 space-y-1 text-[11px] text-slate-500">
                  <div className="flex items-center gap-1.5 truncate">
                    <Clock className="w-3 h-3 text-slate-400 shrink-0" />
                    <span>{item.time}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{item.location}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Agenda Detail Modal */}
      {selectedAgenda && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 relative animate-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <span className="text-xs font-bold uppercase text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-md">
                Agenda Terdaftar
              </span>
              <button
                onClick={() => setSelectedAgenda(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold p-1"
              >
                ✕
              </button>
            </div>

            <div className="mt-4">
              <h3 className="text-lg font-serif font-bold text-slate-900 mb-3">
                {selectedAgenda.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                {selectedAgenda.description}
              </p>

              <div className="bg-slate-50 rounded-xl p-3.5 space-y-2 text-xs border border-slate-100">
                <div className="flex items-center gap-2 text-slate-700">
                  <Calendar className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">Tanggal:</span>
                  <span>{selectedAgenda.date}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">Waktu:</span>
                  <span>{selectedAgenda.time}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <MapPin className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">Lokasi:</span>
                  <span>{selectedAgenda.location}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Building className="w-4 h-4 text-indigo-500" />
                  <span className="font-semibold">Penyelenggara:</span>
                  <span>{selectedAgenda.organizer}</span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => setSelectedAgenda(null)}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
