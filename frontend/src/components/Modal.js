import { useState } from "react";

const Modal = ({ open, title, body, onHide, onConfirm }) => {
  const [modalData, setData] = useState({});

  return open ? (
    <div className="modal-backdrop">
      <div className="modal flex column">
        <div className="justify-between w100">
          <div className="font22 flex center pl5">{title}</div>
          <div className="btn bright" onClick={() => onHide()}>
            X
          </div>
        </div>
        <div className="pv30">
          {body ? body({ data: modalData, set: setData }) : null}
        </div>
        <div className="justify-end p5 pt10">
          <div
            className="btn success"
            onClick={() => {
              onConfirm(modalData);
              onHide();
              setData({});
            }}
          >
            Ok
          </div>
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
