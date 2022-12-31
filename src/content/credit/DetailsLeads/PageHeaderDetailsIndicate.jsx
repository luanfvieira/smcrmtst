import { useState } from "react";
import {
  Typography,
  Button,
  Box,
  alpha,
  lighten,
  Avatar,
  styled,
  Drawer,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";

import ArrowBack from "@mui/icons-material/ArrowBack";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

import { AddActions } from "./AddActions";

const AvatarPageTitle = styled(Avatar)(
  ({ theme }) => `
      width: ${theme.spacing(8)};
      height: ${theme.spacing(8)};
      color: ${theme.colors.primary.main};
      margin-right: ${theme.spacing(2)};
      background: ${
        theme.palette.mode === "dark"
          ? theme.colors.alpha.trueWhite[10]
          : theme.colors.alpha.white[50]
      };
      box-shadow: ${
        theme.palette.mode === "dark"
          ? "0 1px 0 " +
            alpha(lighten(theme.colors.primary.main, 0.8), 0.2) +
            ", 0px 2px 4px -3px rgba(0, 0, 0, 0.3), 0px 5px 16px -4px rgba(0, 0, 0, .5)"
          : "0px 2px 4px -3px " +
            alpha(theme.colors.alpha.black[100], 0.4) +
            ", 0px 5px 16px -4px " +
            alpha(theme.colors.alpha.black[100], 0.2)
      };
`
);

export function PageHeaderDetailsIndicate({ reload, lead }) {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { id } = useParams();

  const closeDrawer = () => {
    setIsDrawerOpen(false);
    reload(Math.random());
  };

  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <AddShoppingCartIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            {`#${lead.code} - Analise de Crédito`}
          </Typography>
          <Typography variant="subtitle2">Analise de Crédito</Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Box display="flex" alignItems="center">
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBack />}
          >
            Voltar
          </Button>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => setIsDrawerOpen((prev) => !prev)}
            startIcon={<ModeEditIcon />}
          >
            Interagir
          </Button>
        </Box>
      </Box>

      <Drawer
        variant="temporary"
        anchor="right"
        onClose={closeDrawer}
        open={isDrawerOpen}
        elevation={9}
      >
        {isDrawerOpen && <AddActions onCancel={closeDrawer} leadsId={id} />}
      </Drawer>
    </Box>
  );
}
