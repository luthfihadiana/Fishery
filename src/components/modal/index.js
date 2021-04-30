import React, { useState, forwardRef, useImperativeHandle } from "react";

import "./index.scss";
const Index = forwardRef((props, ref) => {
  const [show, setShowModal] = useState(false);
  const showModal = () => {
    setShowModal(true);
  };
  const hideModal = () => {
    setShowModal(false);
  };
  useImperativeHandle(ref, () => {
    return {
      showModal: showModal,
      hideModal: hideModal,
      status: show
    };
  });
  return (
    <div className={`modal__backdrop ${!show && "modal--hide"}`}>
      <div className={`modal ${props.bigger && "modal--bigger"}`}>
        <div
          className={`modal__header ${
            props.headless ? "modal__header--headless" : ""
          }`}
        >
          {!props.headless && <p className="modal__title">{props.title}</p>}
          {!props.none_cancel && (
            <span className="modal__cancel-button" onClick={() => hideModal()}>
              <span className="material-icons">clear</span>
            </span>
          )}
        </div>
        {!props.headless && <hr className="modal__separator" />}
        <div
          className={`modal__content ${
            props.fullscreen && "modal__content--fullscreen"
          }`}
        >
          {props.children}
        </div>
        <div className="modal__submit">{props.act_button}</div>
      </div>
    </div>
  );
});

export default Index;
