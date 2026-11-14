import {useId, useState} from 'react';
import {
  AvatarPill,
  Container,
  Reveal,
  Section,
  type SectionPadding,
} from '~/ui';

export type HomeFaq = {question: string; answer: string};

export type HomeFaqSectionProps = {
  pill: {text: string; avatar: {src: string; alt?: string}};
  heading: string;
  /** Only one answer is open at a time; the first starts open. */
  faqs: HomeFaq[];
  id?: string;
  padding?: SectionPadding;
  className?: string;
};

export function HomeFaqSection({
  pill,
  heading,
  faqs,
  id,
  padding = 'default',
  className,
}: HomeFaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <Section id={id} padding={padding} tone="white" className={className}>
      <Container
        size="narrow"
        className="flex flex-col gap-10 lg:flex-row lg:justify-between lg:gap-26"
      >
        <Reveal className="flex flex-col items-start gap-5.25 lg:w-102 lg:shrink-0">
          <AvatarPill avatar={pill.avatar} tone="cloud">
            {pill.text}
          </AvatarPill>
          <h2 className="text-headline font-light md:text-headline-lg">
            {heading}
          </h2>
        </Reveal>

        <Reveal order={1} className="lg:w-188.5">
          <ol className="border-b border-ink/9">
            {faqs.map((faq, index) => (
              <FaqItem
                key={faq.question}
                index={index}
                faq={faq}
                open={openIndex === index}
                onToggle={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
              />
            ))}
          </ol>
        </Reveal>
      </Container>
    </Section>
  );
}

/** Question row with an answer that expands via a 0fr → 1fr grid row. */
function FaqItem({
  index,
  faq,
  open,
  onToggle,
}: {
  index: number;
  faq: HomeFaq;
  open: boolean;
  onToggle: () => void;
}) {
  const answerId = useId();

  return (
    <li className="border-t border-ink/9">
      <h3>
        <button
          type="button"
          aria-expanded={open}
          aria-controls={answerId}
          onClick={onToggle}
          className="group flex w-full items-start py-6 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink md:pt-7.75 md:pb-7.25"
        >
          <span
            aria-hidden
            className="w-10 shrink-0 pt-0.75 text-fine font-medium text-ink/32 md:w-15.5 md:pt-0.5"
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="grow pr-6 text-question font-medium transition-opacity duration-fast group-hover:opacity-70 md:text-question-md">
            {faq.question}
          </span>
          <span
            aria-hidden
            className="relative mt-1.5 size-3.5 shrink-0 text-ink/45 md:mt-2"
          >
            <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-current" />
            <span
              className={`absolute inset-y-0 left-1/2 w-px -translate-x-1/2 bg-current transition-transform duration-base ease-out-soft motion-reduce:transition-none ${open ? 'scale-y-0' : ''}`}
            />
          </span>
        </button>
      </h3>
      <div
        id={answerId}
        role="region"
        aria-hidden={!open}
        className={`grid transition-[grid-template-rows] duration-base ease-out-soft motion-reduce:transition-none ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
      >
        <div className="overflow-hidden">
          <p className="max-w-136 pb-8.5 pl-10 text-answer font-light text-ink/70 md:pl-15.5">
            {faq.answer}
          </p>
        </div>
      </div>
    </li>
  );
}
