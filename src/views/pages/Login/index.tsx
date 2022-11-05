import { Grid, TextField, Paper, Typography, Button } from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";

import useAuth from "@hooks/useAuth";
import { yupResolver } from "@hookform/resolvers/yup";

import { FormLogin } from "@contexts/AuthContext";

const schema = yup.object({
  email: yup
    .string()
    .email("Informe um email válido")
    .required("Informe um email"),
  password: yup.string().required("Informe uma senha"),
});

export default function Login() {
  const navigate = useNavigate();
  const { isLoading, login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormLogin>({
    resolver: yupResolver(schema),
  });

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
      <form onSubmit={handleSubmit(login)}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h6" align="center" pb={1} color="secondary">
              Bem vindo de volta!
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              placeholder="Informe um email"
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
              placeholder="Informe sua senha"
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
            <LoadingButton size="medium" loading={isLoading} type="submit">
              Entrar
            </LoadingButton>
          </Grid>
          <Grid item xs={12}>
            <Button
              size="medium"
              variant="text"
              onClick={() => navigate("/register")}
            >
              Não tenho uma conta!
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}
