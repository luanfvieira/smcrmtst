import { Typography } from "@mui/material";

function PageHeader() {
  return (
    <>
      <Typography
        align="center"
        variant="h1"
        component="h3"
        sx={{
          mb: 1,
        }}
      >
        Jobs Platform
      </Typography>
      <Typography
        align="center"
        variant="h4"
        fontWeight="normal"
        color="text.secondary"
      >
        Find your dream job, fast and easy!
      </Typography>
    </>
  );
}

export default PageHeader;
