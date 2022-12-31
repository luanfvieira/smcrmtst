import { useRef, useState } from "react";
import { Typography, Button, Menu, MenuItem, Grid } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import ExpandMoreTwoToneIcon from "@mui/icons-material/ExpandMoreTwoTone";

function PageHeader() {
  const { user } = useAuth();

  const periods = [
    {
      value: "today",
      text: "Today",
    },
    {
      value: "yesterday",
      text: "Yesterday",
    },
    {
      value: "last_month",
      text: "Last month",
    },
    {
      value: "last_year",
      text: "Last year",
    },
  ];

  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);
  const [period, setPeriod] = useState(periods[3].text);

  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          Hello, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Check the latest banking stats under this beautiful dashboard!
        </Typography>
      </Grid>
      <Grid item>
        <Button
          size="small"
          variant="contained"
          sx={{
            mt: { xs: 2, sm: 0 },
          }}
          ref={actionRef1}
          onClick={() => setOpenMenuPeriod(true)}
          endIcon={<ExpandMoreTwoToneIcon fontSize="small" />}
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
                setPeriod(_period.text);
                setOpenMenuPeriod(false);
              }}
            >
              {_period.text}
            </MenuItem>
          ))}
        </Menu>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
