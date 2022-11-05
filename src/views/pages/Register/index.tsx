import { useState } from "react";

import { Grid, TextField, Paper, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import { yupResolver } from "@hookform/resolvers/yup";
import useNotification from "@hooks/useNotification";
import useAlert from "@hooks/useAlert";
import useAuth from "@hooks/useAuth";

import { FixMeLater } from "@services/FixeMeLater";
import api from "@services/api";
import * as yup from "yup";

interface FormFields {
  name?: string;
  email: string;
  password: string;
  passwordConfirmation?: string;
}

const schema = yup.object({
  name: yup.string().required("Informe um Nome"),
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Informe um email"),
  password: yup.string().required("Informe uma senha"),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
    .required("Informe uma senha de confirmação"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>({ resolver: yupResolver(schema) });

  const [isLoading, setLoading] = useState(false);

  const alert = useAlert();
  const { login } = useAuth();
  const navigate = useNavigate();
  const notification = useNotification();

  async function onSubmit(data: FormFields) {
    setLoading(true);
    try {
      delete data.passwordConfirmation;
      await api.post("/user/create", data);
      delete data.name;
      await login(data);
    } catch (error: FixMeLater) {
      alert.extractError(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Paper
      sx={{
        height: 500,
        width: { sm: "60%", md: "50%" },
        padding: 4,
        display: "flex",
        alignItems: "center",
        marginX: "auto",
        mt: 6,
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" pb={1} color="secondary">
              Registre sua conta
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Nome"
              placeholder="Informe um nome"
              inputProps={{
                maxLength: 55,
              }}
              {...register("name")}
              error={!!errors["name"]}
              helperText={errors["name"]?.message || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              placeholder="Informe um email"
              type="email"
              autoComplete="username"
              inputProps={{
                maxLength: 55,
              }}
              {...register("email")}
              error={!!errors["email"]}
              helperText={errors["email"]?.message || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha"
              placeholder="Informe uma senha"
              type="password"
              autoComplete="password"
              inputProps={{
                maxLength: 55,
              }}
              {...register("password")}
              error={!!errors["password"]}
              helperText={errors["password"]?.message || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Senha de confirmação"
              placeholder="Informe uma senha de confirmação"
              type="password"
              autoComplete="new-password"
              inputProps={{
                maxLength: 55,
              }}
              {...register("passwordConfirmation")}
              error={!!errors["passwordConfirmation"]}
              helperText={errors["passwordConfirmation"]?.message || ""}
            />
          </Grid>
          <Grid item xs={12}>
            <LoadingButton size="medium" loading={isLoading} type="submit">
              Registrar
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="medium"
              variant="text"
              onClick={() => navigate("/login")}
            >
              Já tenho uma conta!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}