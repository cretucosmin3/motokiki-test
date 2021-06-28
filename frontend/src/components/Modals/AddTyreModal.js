import { Fragment } from "react";
import Modal from "../Modal";
import MotoSelect from "../MotoSelect";
import MotoInput from "../MotoInput";

const AddTyre = ({ brands, isOpened, setVisibility, onUpdate }) => {
  return (
    <Modal
      open={isOpened}
      title="Add Tyre"
      onHide={() => setVisibility("tyre", false)}
      body={(modal) => {
        const fields = [
          { label: "Title", field: "title" },
          { label: "Size", field: "size" },
          { label: "Price", field: "price", type: "number" },
          { label: "Image URL", field: "image_url" },
        ];

        var options = [{ value: null, label: "None" }];
        Object.keys(brands).forEach((k) =>
          options.push({ value: brands[k]._id, label: brands[k].title })
        );
        const inputClasses = "font22 ml10 mr10 flex column pt10 ph15";

        return (
          <Fragment>
            <MotoSelect
              className={inputClasses}
              label="Brand"
              onSelected={(value) => modal.set({ ...modal.data, brand: value })}
              options={options}
            />
            {fields.map((f, i) => {
              return (
                <MotoInput
                  key={i}
                  className={inputClasses}
                  label={f.label}
                  type={f.type}
                  onChange={(value) =>
                    modal.set({ ...modal.data, [f.field]: value })
                  }
                />
              );
            })}
          </Fragment>
        );
      }}
      onConfirm={onUpdate}
    />
  );
};

export default AddTyre;
