/* eslint-disable no-unused-vars */
import {
  Typography,
  Box,
  alpha,
  lighten,
  Avatar,
  styled,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { formatDate } from "src/utils/formatDate";
import KeyboardArrowDownTwoToneIcon from "@mui/icons-material/KeyboardArrowDownTwoTone";
import { format, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useRef, useState } from "react";

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

export default function PageHeader({ setMonth }) {
  const periods = [
    {
      value: format(subMonths(new Date(), 2), "M", { locale: ptBR }),
      text: "Penúltimo Mês",
    },
    {
      value: format(subMonths(new Date(), 1), "M", { locale: ptBR }),
      text: "Último Mês",
    },
    {
      value: format(new Date(), "M", { locale: ptBR }),
      text: "Mês atual",
    },
  ];

  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[2].text);
  const actionRef1 = useRef(null);

  return (
    <Box
      display="flex"
      alignItems={{ xs: "stretch", md: "center" }}
      flexDirection={{ xs: "column", md: "row" }}
      justifyContent="space-between"
    >
      <Box display="flex" alignItems="center">
        <AvatarPageTitle variant="rounded">
          <AssignmentIcon fontSize="large" />
        </AvatarPageTitle>
        <Box>
          <Typography variant="h3" component="h3" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="subtitle2">
            {`Ultima atualização: ${formatDate(new Date(Date.now()))}`}
          </Typography>
        </Box>
      </Box>
      <Box mt={{ xs: 3, md: 0 }}>
        <Button
          variant="outlined"
          ref={actionRef1}
          onClick={() => setOpenMenuPeriod(true)}
          sx={{
            mr: 1,
          }}
          endIcon={<KeyboardArrowDownTwoToneIcon fontSize="small" />}
        >
          {period}
        </Button>
        <Menu
          disableScrollLock
          anchorEl={actionRef1.current}
          onClose={() => setOpenMenuPeriod(false)}
          open={openPeriod}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
        >
          {periods.map((_period) => (
            <MenuItem
              key={_period.value}
              onClick={() => {
                setMonth(_period.value);
                setPeriod(_period.text);
                setOpenMenuPeriod(false);
              }}
            >
              {_period.text}
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
}
