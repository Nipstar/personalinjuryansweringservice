import { Eyebrow, Headline } from '../Typography';


type Props = {
  painScenario: { timestamp: string; body: string };
  heading?: string;
  eyebrow?: string;
};

export const PainScenario = ({ painScenario, heading, eyebrow }: Props) => {
  if (!painScenario.body) return null;

  return (
    <section className="px-4 md:px-8 py-24 max-w-[1180px] mx-auto">
      {eyebrow && <Eyebrow center>{eyebrow}</Eyebrow>}
      {heading && <Headline size={38} center maxWidth={720}>{heading}</Headline>}

      <div className="mt-12 max-w-[820px] mx-auto">
        <div className="bg-[var(--paper)] border-[1.5px] border-[var(--rule)] p-6 md:p-[32px_38px] shadow-[5px_5px_0_var(--rule)] -rotate-[0.6deg] relative">
          <div className="absolute top-[-1px] left-[28px] bg-[var(--paper-deep)] border-[1.5px] border-[var(--rule)] border-b-0 px-3 py-[3px] text-[10px] font-bold text-[var(--ink)] tracking-[0.16em] font-mono -translate-y-full uppercase">
            {painScenario.timestamp ? `Example call · ${painScenario.timestamp}` : 'Example call'}
          </div>
          <p className="text-[19px] text-[var(--ink)] font-serif italic leading-[1.6] m-0 tracking-[-0.005em]">
            {painScenario.body}
          </p>
        </div>
      </div>
    </section>
  );
};
