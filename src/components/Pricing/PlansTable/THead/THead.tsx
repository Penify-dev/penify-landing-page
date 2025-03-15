import { CurrencyOptions } from "@/hooks/useCurrencyConversion";
import PRICING from "@/utils/pricing.json";
import Link from "next/link";
import { Fragment } from "react";

interface TitleColorMap {
  [key: string]: string;
}

const titleColor: TitleColorMap = {
  Freemium: "text-cyan-400",
  Premium: "text-yellow-400",
  Pro: "text-pink-400",
  Enterprise: "text-blue-400",
};

export function THead() {
  return (
    <thead className="bg-slate-700 text-slate-400">

      <tr>
        <th
          scope="col"
          className="border-t border-r border-slate-500 px-6 py-3"
        >
          <h4 className="text-slate-300 text-xs md:text-sm lg:text-base">
            Features
          </h4>
        </th>

        {PRICING.plans.map(({ title }, titleIndex) => (
          <Fragment key={`plan-title-index-${titleIndex}`}>
            {title === "Freemium" ? (
              <>
                <th
                  scope="col"
                  className="border-t border-r border-slate-500 px-6 py-3"
                >
                  <h4 className="text-cyan-400 text-xs md:text-sm lg:text-base">
                    Public GitHub Repo
                  </h4>
                </th>
                <th
                  scope="col"
                  className="border-t border-r border-slate-500 px-6 py-3"
                >
                  <h4 className="text-cyan-400 text-xs md:text-sm lg:text-base">
                    Private GitHub Repo
                  </h4>
                </th>
              </>
            ) : (
              <th
                scope="col"
                className={`border-t ${
                  title === "Enterprise" ? "border-r-0" : "border-r"
                } border-slate-500 px-6 py-3`}
              >
                <h4
                  className={`${titleColor[title]} text-xs md:text-sm lg:text-base`}
                >
                  {title} GitHub Repo
                </h4>
              </th>
            )}
          </Fragment>
        ))}
      </tr>
    </thead>
  );
}
