import { useRef, useState } from "react";
import useAuth from "src/hooks/useAuth";
import { useNavigate } from "react-router-dom";

import {
  Avatar,
  Box,
  Button,
  Divider,
  alpha,
  List,
  ListItem,
  ListItemText,
  Popover,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import UnfoldMoreTwoToneIcon from "@mui/icons-material/UnfoldMoreTwoTone";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import BusinessIcon from "@mui/icons-material/Business";
import { formatAlias } from "src/utils/formatAlias";

function SidebarTopSection() {
  const theme = useTheme();

  const navigate = useNavigate();
  const { user, logout, update } = useAuth();

  const ref = useRef(null);
  const [isOpen, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      handleClose();
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        textAlign: "center",
        mx: 2,
        pt: 1,
        position: "relative",
      }}
    >
      <Avatar
        sx={{
          width: 48,
          height: 48,
          mb: 2,
          mx: "auto",
          bgcolor: "#0071BC",
        }}
      >
        {user.avatarName}
      </Avatar>

      <Typography
        variant="h4"
        sx={{
          color: `${theme.colors.alpha.trueWhite[100]}`,
        }}
      >
        {user.name}
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          color: `${theme.colors.alpha.trueWhite[70]}`,
        }}
      >
        {user.companySelected?.fantasyName ||
          user.companySelected?.name ||
          "Empresa não selecionada"}
      </Typography>
      <IconButton
        size="small"
        sx={{
          position: "absolute",
          right: theme.spacing(0),
          color: `${theme.colors.alpha.trueWhite[70]}`,
          top: theme.spacing(0),
          background: `${theme.colors.alpha.trueWhite[10]}`,

          "&:hover": {
            color: `${theme.colors.alpha.trueWhite[100]}`,
            background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
          },
        }}
        ref={ref}
        onClick={handleOpen}
      >
        <UnfoldMoreTwoToneIcon fontSize="small" />
      </IconButton>
      <Popover
        disableScrollLock
        anchorEl={ref.current}
        onClose={handleClose}
        open={isOpen}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <Box m={1}>
          <Typography color="primary" textAlign="center" variant="inherit">
            Selecione a Filial
          </Typography>
        </Box>
        <Divider
          sx={{
            mb: 0,
          }}
        />
        <List
          sx={{
            p: 1,
          }}
          component="nav"
        >
          {user.companies.map((company) => {
            return (
              <ListItem
                key={company.identifier}
                onClick={() => {
                  update(company);
                  handleClose();
                }}
                button
              >
                <BusinessIcon fontSize="small" />
                <ListItemText
                  primary={
                    company?.fantasyName === null
                      ? company?.name
                      : `${formatAlias(company?.alias)} - ${
                          company?.fantasyName
                        }`
                  }
                />
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Box m={1}>
          <Button color="primary" fullWidth onClick={handleLogout}>
            <LockOpenTwoToneIcon
              sx={{
                mr: 1,
              }}
            />
            Sair
          </Button>
        </Box>
      </Popover>
    </Box>
  );
}

export default SidebarTopSection;
