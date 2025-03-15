import PRICING from "@/utils/pricing.json";
import Accordion from "@/components/Pricing/Accordion/Accordion";
import { THead } from "./THead/THead";


export function PlansTable() {

  return (
    <div className="relative w-full overflow-x-auto shadow-md sm:rounded-lg mt-6">
      <table className="w-full table-fixed text-sm text-slate-400">
        <THead/>

        <tbody>
          {PRICING.data.map(({ category, features, active }, dataIndex) => (
            <tr key={`pricing-category-index-${dataIndex}`}>
              <td colSpan={6} className="p-0">
                <Accordion
                  title={category}
                  features={features}
                  id={`pricing-${dataIndex}`}
                  active={active}
                  isLast={PRICING.data.length - 1 === dataIndex}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
