import { useTheme } from "@mui/material";

import Swal from "sweetalert2";

import axios, { AxiosError } from "axios";

export default function useAlert() {
  const theme = useTheme();

  function error(title = "Oops...", text = "Algo deu errado!") {
    Swal.fire({
      icon: "error",
      title,
      text,
      confirmButtonColor: theme.palette.primary.main,
    });
  }

  function extractError(err: Error | AxiosError) {
    if (axios.isAxiosError(err)) {
      const data = err.response?.data as {
        error?: string;
        message: string;
        statusCode: number;
      };

      let title = data?.statusCode
        ? `${data.statusCode} ${data.message}`
        : undefined;
      let text = undefined;

      if (data?.error) {
        title = `${data.statusCode} ${data.error}`;
        text = data.message;
      }
      return error(title, text);
    }
    return error(err?.message, err?.stack);
  }

  return {
    error,
    extractError,
  };
}
