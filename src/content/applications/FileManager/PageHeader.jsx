import { Typography, Grid } from "@mui/material";

function PageHeader() {
  return (
    <Grid container justifyContent="space-between" alignItems="center">
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          File Manager
        </Typography>
        <Typography variant="subtitle2">
          This is an example file manager that can be used to manage your files
          and folders
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
