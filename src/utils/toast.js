import Toastify from "toastify-js";

export default (text, opts) => {
  const options = {
    className: "info",
    positionLeft: true,
    ...opts
  };
  Toastify({
    text,
    ...options
  }).showToast();
};
