/* eslint-disable no-unused-vars */
import { Typography, Box, alpha, lighten, Avatar, styled } from "@mui/material";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { useState } from "react";

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

export default function PageHeader() {
  const [open, setOpen] = useState(false);

  return (
    <>
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
              Relatório
            </Typography>
            <Typography variant="subtitle2">Contas a receber</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
}
