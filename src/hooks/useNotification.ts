import { toast } from "react-toastify";

export default function useNotification() {
  function success(message = "Requesição feita com sucesso!") {
    return toast.success(message);
  }

  return {
    success,
  };
}
