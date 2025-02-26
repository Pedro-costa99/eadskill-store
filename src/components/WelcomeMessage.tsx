import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";

const WelcomeMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
      }}
    >
      <Container>
        <Typography variant="h4" gutterBottom>
          Bem-vindo à Eadskill Store
        </Typography>
        <Typography variant="body1">
          Aplicação para gerenciamento de produtos com CRUD completo.
        </Typography>

        <Button variant="contained" color="primary" sx={{ mt: 3 }}>
          BUTTON MUI
        </Button>
      </Container>
    </Box>
  );
};

export default WelcomeMessage;
