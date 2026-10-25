import { SITE_URL } from '@/lib/config';

type Crumb = { name: string; href: string };

type Props = {
  items: Crumb[];
  hideVisual?: boolean;
};

export const Breadcrumbs = ({ items, hideVisual }: Props) => {
  if (!items.length) return null;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      ...items.map((c, i) => ({
        '@type': 'ListItem',
        position: i + 2,
        name: c.name,
        item: `${SITE_URL}${c.href}`,
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      {!hideVisual && (
        <nav
          aria-label="Breadcrumb"
          className="text-[10px] font-mono text-[var(--ink-soft)] tracking-[0.14em] uppercase mb-6"
        >
          <ol className="flex flex-wrap gap-x-2 gap-y-1 m-0 p-0 list-none">
            <li>
              <a href="/" className="hover:text-[var(--ink)] no-underline">Home</a>
            </li>
            {items.map((c, i) => (
              <li key={c.href} className="flex gap-2">
                <span aria-hidden="true">/</span>
                {i === items.length - 1 ? (
                  <span className="text-[var(--ink)]" aria-current="page">{c.name}</span>
                ) : (
                  <a href={c.href} className="hover:text-[var(--ink)] no-underline">{c.name}</a>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}
    </>
  );
};
