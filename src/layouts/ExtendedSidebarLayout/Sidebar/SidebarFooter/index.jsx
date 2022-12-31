import {
  Box,
  IconButton,
  // Badge,
  Tooltip,
  alpha,
  tooltipClasses,
  styled,
  useTheme,
} from "@mui/material";
import EventTwoToneIcon from "@mui/icons-material/EventTwoTone";
import PowerSettingsNewTwoToneIcon from "@mui/icons-material/PowerSettingsNewTwoTone";
// import SmsTwoToneIcon from "@mui/icons-material/SmsTwoTone";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import useAuth from "src/hooks/useAuth";

const LightTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.colors.alpha.trueWhite[100],
    color: theme.palette.getContrastText(theme.colors.alpha.trueWhite[100]),
    boxShadow: theme.shadows[24],
    fontWeight: "bold",
    fontSize: theme.typography.pxToRem(12),
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.colors.alpha.trueWhite[100],
  },
}));

function SidebarFooter() {
  const theme = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box
      sx={{
        height: 60,
      }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <LightTooltip placement="top" arrow title="Tarefas">
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(["all"])}`,

            "&:hover": {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            },
          }}
          to="/app/tarefas/myTasks"
          component={RouterLink}
        >
          <EventTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
      {/* <LightTooltip placement="top" arrow title="Notificações">
        <Badge
          color="success"
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          sx={{
            ".MuiBadge-badge": {
              animation: "pulse 1s infinite",
              top: "5%",
              transition: `${theme.transitions.create(["all"])}`,
            },
          }}
          variant="dot"
          overlap="circular"
        >
          <IconButton
            to="/"
            component={RouterLink}
            sx={{
              background: `${theme.colors.alpha.trueWhite[10]}`,
              color: `${theme.colors.alpha.trueWhite[70]}`,
              transition: `${theme.transitions.create(["all"])}`,

              "&:hover": {
                background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
                color: `${theme.colors.alpha.trueWhite[100]}`,
              },
              mx: 1,
            }}
          >
            <SmsTwoToneIcon fontSize="small" />
          </IconButton>
        </Badge>
      </LightTooltip> */}
      <LightTooltip placement="top" arrow title="Sair">
        <IconButton
          sx={{
            background: `${theme.colors.alpha.trueWhite[10]}`,
            color: `${theme.colors.alpha.trueWhite[70]}`,
            transition: `${theme.transitions.create(["all"])}`,

            "&:hover": {
              background: `${alpha(theme.colors.alpha.trueWhite[100], 0.2)}`,
              color: `${theme.colors.alpha.trueWhite[100]}`,
            },
            mx: 1,
          }}
          onClick={handleLogout}
        >
          <PowerSettingsNewTwoToneIcon fontSize="small" />
        </IconButton>
      </LightTooltip>
    </Box>
  );
}

export default SidebarFooter;
