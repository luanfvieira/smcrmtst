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
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { AddActions } from "./AddActions";
import { CloseLead } from "./CloseLead";

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

export function PageHeaderDetailsIndicate({ lead, reload }) {
  const navigate = useNavigate();
  const [isDrawerActionsOpen, setIsDrawerActionsOpen] = useState(false);
  const [isDrawerCloseOpen, setIsDrawerCloseOpen] = useState(false);
  const { id } = useParams();

  const closeDrawerActions = () => {
    setIsDrawerActionsOpen(false);
    reload(Math.random());
  };

  const closeDrawerClose = () => {
    setIsDrawerCloseOpen(false);
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
            {`#${lead?.code} - Detalhes Indicações`}
          </Typography>
          <Typography variant="subtitle2">
            Acompanhe aqui as suas indicações
          </Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Box display="flex" alignItems="center">
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            onClick={() => navigate(-1)}
            startIcon={<ArrowBackIcon />}
          >
            Voltar
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            onClick={() => setIsDrawerCloseOpen((prev) => !prev)}
            startIcon={<CheckCircleOutlineIcon />}
          >
            Negociar
          </Button>
          <Button
            sx={{ mr: 1 }}
            variant="contained"
            onClick={() => setIsDrawerActionsOpen((prev) => !prev)}
            startIcon={<ModeEditIcon />}
          >
            Interagir
          </Button>
        </Box>
      </Box>

      <Drawer
        variant="temporary"
        anchor="right"
        onClose={closeDrawerActions}
        open={isDrawerActionsOpen}
        elevation={9}
      >
        {isDrawerActionsOpen && (
          <AddActions onCancel={closeDrawerActions} leadsId={id} />
        )}
      </Drawer>
      <Drawer
        variant="temporary"
        anchor="right"
        onClose={closeDrawerClose}
        open={isDrawerCloseOpen}
        elevation={9}
      >
        {isDrawerCloseOpen && (
          <CloseLead onCancel={closeDrawerClose} leadsId={id} />
        )}
      </Drawer>
    </Box>
  );
}
