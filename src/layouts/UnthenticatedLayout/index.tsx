import { useEffect, Suspense } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Container, CircularProgress } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import useAuth from "@hooks/useAuth";

import { nameApp } from "@services/utils";

function UnthenticatedLayout() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  useEffect(() => {
    logout();
  }, []);

  return (
    <Box sx={{ height: "100%" }}>
      <AppBar position="static">
        <Container>
          <Toolbar>
            <Box
              sx={{
                flexGrow: 1,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  width: 160,
                  "&:hover": {
                    cursor: "pointer",
                  },
                }}
                onClick={() => navigate("/")}
              >
                {nameApp()}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button fullWidth={false} onClick={() => navigate("/login")}>
                Entrar
              </Button>
              <Button fullWidth={false} onClick={() => navigate("/register")}>
                Registrar
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container>
        <Suspense fallback={<CircularProgress />}>
          <Outlet />
        </Suspense>
      </Container>
    </Box>
  );
}

export default UnthenticatedLayout;
