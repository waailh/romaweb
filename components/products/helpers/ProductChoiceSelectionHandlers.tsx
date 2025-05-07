"use client";

import { useProducts } from "@/store/products/products";
import GeneralAttributeHandler from "./GeneralAttributeHandler";
import ProductClearHandler from "./ProductClearHandler";
import ProductColorsHandler from "./ProductColorsHandler";
import ProductPowerHandler from "./ProductPowerHandler";
import ProductUsageHandler from "./ProductUsageHandler";
import PackageOptionsHandler from "./PackageOptionsHandler";

const ProductChoiceSelectionHandlers = () => {
  const { prod } = useProducts();

  const hasColors = prod?.colors.length! > 0;

  if (!prod) return;

  return (
    <>
      {hasColors && (
        <ProductColorsHandler
          mini={false}
          colors={prod.colors}
          is_lense={prod.is_lense}
        />
      )}

      <div className="flex flex-col space-y-3 divide-y">
        {/* attributes handlers */}
        {prod.choice_options.map((cho, i) => {
          let component;
          switch (cho.id) {
            case "1": // power
              component = <ProductPowerHandler mini={false} att={cho} />;
              break;

            case "10": // SPH
            case "36": // CYL
            case "37": // AXIS
            case "39": // ADD
              component = <ProductClearHandler mini={false} att={cho} />;
              break;

            case "XXXXXXX": // usage
              component = <ProductUsageHandler mini={false} />;
              break;

            default:
              component = <GeneralAttributeHandler mini={false} att={cho} />;
              break;
          }

          return <div key={i}>{component}</div>;
        })}
      </div>

      <div className="mt-2">
        <PackageOptionsHandler mini={false} options={prod.package_options} />
      </div>
    </>
  );
};

export default ProductChoiceSelectionHandlers;
