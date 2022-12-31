import { Typography } from "@mui/material";
import useAuth from "src/hooks/useAuth";

function PageHeader() {
  const { user } = useAuth();

  return (
    <>
      <Typography variant="h3" component="h3" gutterBottom>
        Finance Dashboard
      </Typography>
      <Typography variant="subtitle2">
        {user.name}, This could be your beautiful finance administration panel.
      </Typography>
    </>
  );
}

export default PageHeader;
