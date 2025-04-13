import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

interface AccordionProps {
  title: string;
  text: string;
  id: string;
  active?: boolean;
}

export default function Accordion({
  title,
  text,
  id,
  active = false,
}: AccordionProps) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(() => active);

  return (
    <div
      className="mb-4 w-full rounded-xl border border-primary-700/40 bg-primary-900/20 backdrop-blur-sm px-6 py-4 shadow-lg md:mb-6 md:px-8 md:py-6 hover:border-primary-600/50 transition-colors"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      <div>
        <button
          type="button"
          className="-m-2 flex w-full flex-wrap justify-between"
          onClick={() => setIsAccordionOpen((prev) => !prev)}
          aria-expanded={isAccordionOpen}
          aria-controls={`accordion-text-${id}`}
        >
          <div className="flex-1 py-2">
            <h2 className="text-start text-sm font-semibold text-slate-200 md:text-base xl:text-lg">
              {title}
            </h2>
          </div>

          <div className="w-auto py-2">
            <IconChevronDown
              className={`h-4 w-4 origin-center transform text-secondary-400 transition duration-200 ease-out md:h-6 md:w-6 ${
                isAccordionOpen ? "rotate-180" : ""
              }`}
            />
          </div>
        </button>
      </div>

      <div
        id={`accordion-text-${id}`}
        role="region"
        aria-labelledby={`accordion-title-${id}`}
        className={`grid overflow-hidden text-xs text-slate-400 transition-all duration-300 ease-in-out md:text-sm lg:text-base ${
          isAccordionOpen
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <p
            className="py-4 pb-2 text-start pr-7"
            dangerouslySetInnerHTML={{ __html: text }}
          />
        </div>
      </div>
    </div>
  );
}
