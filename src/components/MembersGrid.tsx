import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Member {
  id?: number;
  headline: string;
  text: string;
  logo?: string;
  hero?: string;
  memberurl?: string;
  type?: string;
}

interface MembersGridProps {
  cards: Member[];
}

const toHref = (u?: string) => (!u ? '' : u.startsWith('http') ? u : `https://${u}`);

// Filter tabs. `value` matches the Airtable Type option; 'all' shows everyone.
const FILTERS = [
  { value: 'all', label: 'members.filterAll' },
  { value: 'Platform', label: 'members.filterPlatforms' },
  { value: 'Organisation', label: 'members.filterOrganisations' },
  { value: 'Consultant', label: 'members.filterConsultants' },
];

const MembersGrid: FC<MembersGridProps> = ({ cards }) => {
  const { t } = useTranslation();
  const [active, setActive] = useState('all');

  const countFor = (value: string) =>
    value === 'all' ? cards.length : cards.filter((c) => c.type === value).length;

  const visible = active === 'all' ? cards : cards.filter((c) => c.type === active);

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-8">
        {FILTERS.map((f) => {
          const count = countFor(f.value);
          if (f.value !== 'all' && count === 0) return null; // hide empty categories
          const isActive = active === f.value;
          return (
            <button
              key={f.value}
              type="button"
              onClick={() => setActive(f.value)}
              aria-pressed={isActive}
              className={
                'rounded-full px-4 py-2 text-sm font-sans font-semibold transition ' +
                (isActive
                  ? 'bg-white text-[#1D1F29]'
                  : 'bg-white/10 text-white hover:bg-white/20')
              }
            >
              {t(f.label)} <span className="opacity-60">{count}</span>
            </button>
          );
        })}
      </div>

      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(230px, 1fr))' }}
      >
        {visible.map((c) => (
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
    </div>
  );
};

export default MembersGrid;
