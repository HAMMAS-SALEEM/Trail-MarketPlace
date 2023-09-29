import { toast } from "react-toastify";
class ToastController {
  static success(message) {
    toast.success(message);
  }
  static info(message) {
    toast.info(message);
  }
  static error(message) {
    toast.error(message);
  }
  static warning(message) {
    toast.warn(message);
  }
  static loading(message){
    toast.loading(message)
  }

  constructor() {
    this.ACTIVE_LOADING_ID = null;
  }
  showProcessing(message = ``) {
    this.ACTIVE_LOADING_ID = toast.loading(message);
  }
  setProcessingMessage(message) {
    toast.update(this.ACTIVE_LOADING_ID, { render: message });
  }
  endProcessing() {
    toast.dismiss(this.ACTIVE_LOADING_ID);
  }
  endProcessingWithSuccess(message) {
    toast.update(this.ACTIVE_LOADING_ID, {
      type: toast.TYPE.SUCCESS,
      render: message,
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
  }
  endProcessingWithError(message) {
    toast.update(this.ACTIVE_LOADING_ID, {
      type: toast.TYPE.ERROR,
      render: message,
      isLoading: false,
      autoClose: true,
      closeButton: true,
    });
  }
}
//
// const Toast = new ToastController();

export default ToastController;
