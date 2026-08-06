import { FC } from 'react';

interface Member {
  id?: number;
  headline: string;
  text: string;
  logo?: string;
  hero?: string;
  memberurl?: string;
}

interface MembersGridProps {
  cards: Member[];
}

const toHref = (u?: string) => (!u ? '' : u.startsWith('http') ? u : `https://${u}`);

const MembersGrid: FC<MembersGridProps> = ({ cards }) => (
  <div
    className="grid gap-4"
    style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}
  >
    {cards.map((c) => (
      <div
        key={c.headline}
        className="bg-white rounded-2xl p-5 flex flex-col gap-2 shadow-lg min-h-[150px]"
      >
        {c.logo ? (
          <img src={c.logo} alt={c.headline} className="h-10 w-auto max-w-[150px] object-contain object-left mb-1" />
        ) : null}
        <h3 className="font-serif text-lg font-bold text-[#1D1F29] leading-tight">{c.headline}</h3>
        <p
          className="text-sm text-neutral-600 flex-1"
          style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {c.text}
        </p>
        {c.memberurl ? (
          <a
            href={toHref(c.memberurl)}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-semibold text-[#39A97C] hover:underline mt-1"
          >
            {c.memberurl} →
          </a>
        ) : null}
      </div>
    ))}
  </div>
);

export default MembersGrid;
