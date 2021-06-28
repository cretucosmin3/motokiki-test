import { Fragment } from "react";
import Modal from "../Modal";
import MotoInput from "../MotoInput";

const AddBrand = ({ isOpened, setVisibility, onUpdate }) => {
  return (
    <Modal
      open={isOpened}
      title="Add Brand"
      onHide={() => setVisibility("brand", false)}
      body={(modal) => {
        return (
          <Fragment>
            <MotoInput
              className="ml10 mr10 flex column pt10 ph15"
              label="Title"
              onChange={(value) => modal.set({ ...modal.data, title: value })}
            />
            <MotoInput
              className="ml10 mr10 flex column pv15 ph15"
              label="Logo URL"
              onChange={(value) =>
                modal.set({ ...modal.data, logo_url: value })
              }
            />
          </Fragment>
        );
      }}
      onConfirm={onUpdate}
    />
  );
};

export default AddBrand;
