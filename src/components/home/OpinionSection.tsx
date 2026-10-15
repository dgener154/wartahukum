import React from 'react';
import { BookOpen, Quote, ArrowRight, UserCheck } from 'lucide-react';
import { Article } from '../../types';

interface OpinionSectionProps {
  articles: Article[];
  onSelectArticle: (article: Article) => void;
  onSelectCategory: (categoryId: string) => void;
}

export const OpinionSection: React.FC<OpinionSectionProps> = ({
  articles,
  onSelectArticle,
  onSelectCategory,
}) => {
  const opinionArticles = articles.filter(
    (a) => (a.isOpinion || a.categoryId === 'cat-opini') && a.status === 'published'
  );

  if (opinionArticles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
              Rubrik Gagasan & Telaah
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold text-slate-900">
            Opini, Analisis Pakar, & Kolom Hukum
          </h2>
        </div>

        <button
          onClick={() => onSelectCategory('cat-opini')}
          className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1"
        >
          <span>Seluruh Opini</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {opinionArticles.slice(0, 3).map((article) => (
          <div
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="group relative bg-amber-50/40 rounded-2xl border border-amber-200/80 p-6 flex flex-col justify-between hover:bg-amber-50/80 hover:shadow-md transition-all cursor-pointer"
          >
            {/* Top Badge: Explicit OPINI marker */}
            <div className="flex items-center justify-between mb-4">
              <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-md bg-amber-600 text-white shadow-2xs">
                OPINI & ANALISIS
              </span>
              <Quote className="w-6 h-6 text-amber-300" />
            </div>

            {/* Opinion Headline */}
            <h3 className="font-serif font-bold text-lg text-slate-900 group-hover:text-amber-800 transition-colors leading-snug mb-3">
              "{article.title}"
            </h3>

            <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-6 italic">
              {article.summary}
            </p>

            {/* Author Profile */}
            <div className="pt-4 border-t border-amber-200/60 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-amber-200 text-amber-800 font-bold flex items-center justify-center shrink-0 border border-amber-300">
                {article.authorName.charAt(0)}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 leading-tight">
                  {article.authorName}
                </h4>
                <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">
                  {article.opinionAuthorBio || 'Pakar & Penulis Kolom Hukum'}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
