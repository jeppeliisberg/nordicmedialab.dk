import { useRef, FC } from 'react';

interface Member {
  name: string;
  role: string;
  email: string;
  photo?: string;
}

interface BoardSliderProps {
  members: Member[];
}

const colors = ['#39A97C', '#FF881B', '#1D1F29'];

const initials = (name: string) =>
  name
    .split(' ')
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

const ITEM_H = 132;
const VISIBLE = 3;

const BoardSlider: FC<BoardSliderProps> = ({ members }) => {
  const ref = useRef<HTMLDivElement>(null);

  const scroll = (dir: number) => {
    if (ref.current) {
      ref.current.scrollBy({ top: dir * ITEM_H * VISIBLE, behavior: 'smooth' });
    }
  };

  return (
    // Below sm: a plain stacked list of everyone, rows sized by their content.
    // From sm up: the original 3-at-a-time vertical slider with side controls.
    <div className="max-w-2xl mx-auto px-4 sm:px-10 flex gap-0 sm:gap-4 items-stretch">
      <div
        ref={ref}
        className="flex-1 min-w-0 bg-white rounded-3xl shadow-xl overflow-hidden sm:overflow-y-auto sm:h-[396px] sm:[scroll-snap-type:y_proximity]"
      >
        {members.map((m, i) => (
          <div
            key={m.email}
            className="flex gap-4 items-center px-5 py-5 sm:px-6 sm:py-0 sm:h-[132px] border-b border-[#eee7d8] last:border-0 sm:[scroll-snap-align:start]"
          >
            {m.photo ? (
              <img
                src={m.photo}
                alt={m.name}
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover flex-none grayscale"
              />
            ) : (
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex-none flex items-center justify-center text-white font-serif font-bold text-xl"
                style={{ background: colors[i % colors.length] }}
              >
                {initials(m.name)}
              </div>
            )}
            <div className="min-w-0">
              <div className="text-[#39A97C] font-semibold text-[11px] sm:text-xs uppercase tracking-wide leading-snug">
                {m.role}
              </div>
              <h4 className="font-serif text-base sm:text-lg font-bold text-[#1D1F29] leading-tight">
                {m.name}
              </h4>
              <a
                href={`mailto:${m.email}`}
                className="text-[13px] sm:text-sm text-neutral-600 hover:text-[#39A97C] break-words [overflow-wrap:anywhere]"
              >
                {m.email}
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="hidden sm:flex flex-col justify-center gap-3">
        <button
          onClick={() => scroll(-1)}
          aria-label="Scroll up"
          className="w-12 h-12 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white/10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
          </svg>
        </button>
        <button
          onClick={() => scroll(1)}
          aria-label="Scroll down"
          className="w-12 h-12 rounded-full border border-white/60 text-white flex items-center justify-center hover:bg-white/10 transition"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default BoardSlider;
