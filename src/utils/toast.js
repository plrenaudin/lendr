import Toastify from "toastify-js";

export default text => {
  Toastify({
    text,
    className: "info"
  }).showToast();
};
