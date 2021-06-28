import { Fragment } from "react";
import Modal from "../Modal";
import MotoSelect from "../MotoSelect";

const FiltersModal = ({ brands, tyres, isOpened, setVisibility, onUpdate }) => {
  return (
    <Modal
      open={isOpened}
      title="Filters"
      onHide={() => setVisibility("filter", false)}
      body={(modal) => {
        var brandOptions = [{ value: null, label: "All" }];
        Object.keys(brands).forEach((k) =>
          brandOptions.push({ value: brands[k]._id, label: brands[k].title })
        );

        var sizeOptions = [{ value: null, label: "All " }];
        var sizeOptionsCounter = {};

        // Count all sizes
        tyres.forEach((tyre) => {
          if (!tyre.size) return;
          let size = tyre.size.toUpperCase();
          if (sizeOptionsCounter[size]) sizeOptionsCounter[size]++;
          else sizeOptionsCounter[size] = 1;
        });

        Object.keys(sizeOptionsCounter).forEach((k) =>
          sizeOptions.push({
            value: k,
            label: `${k} (${sizeOptionsCounter[k]})`,
          })
        );

        const inputClasses = "font22 ml10 mr10 flex column pt10 ph15";
        return (
          <Fragment>
            <MotoSelect
              className={inputClasses}
              label="Brand"
              onSelected={(value) => modal.set({ ...modal.data, brand: value })}
              defaultValue="Any"
              options={brandOptions}
            />
            <MotoSelect
              className={inputClasses}
              label="Size"
              defaultValue="Any"
              onSelected={(value) => {
                modal.set({ ...modal.data, size: value });
              }}
              options={sizeOptions}
            />
          </Fragment>
        );
      }}
      onConfirm={onUpdate}
    />
  );
};

export default FiltersModal;
