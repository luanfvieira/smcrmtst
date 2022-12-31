import {
  Breadcrumbs,
  Box,
  Grid,
  Link,
  Typography,
  Tooltip,
  Button,
  Container,
  IconButton,
} from "@mui/material";
import { useNavigate, useLocation, Link as RouterLink } from "react-router-dom";

import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";
import PropTypes from "prop-types";

const PageHeader = ({ invoice }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    return navigate(`/${location.pathname.split("/")[1]}/management/invoices`);
  };
  return (
    <Container maxWidth="lg">
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Tooltip arrow placement="top" title="Go back">
              <IconButton
                onClick={handleBack}
                color="primary"
                sx={{
                  p: 2,
                  mr: 2,
                }}
              >
                <ArrowBackTwoToneIcon />
              </IconButton>
            </Tooltip>
            <Box>
              <Typography variant="h3" component="h3" gutterBottom>
                #{invoice.number}
              </Typography>
              <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link color="inherit" href="#">
                  "Home"
                </Link>
                <Link color="inherit" href="#">
                  Management
                </Link>
                <Link color="inherit" href="#">
                  Commerce
                </Link>
                <Link
                  color="inherit"
                  component={RouterLink}
                  to={`/${location.pathname.split("/")[1]}/management/invoices`}
                >
                  Invoices
                </Link>
                <Typography color="text.primary">
                  Invoice #{invoice.number}
                </Typography>
              </Breadcrumbs>
            </Box>
          </Box>
        </Grid>
        <Grid item>
          <Button
            sx={{
              mt: { xs: 2, sm: 0 },
            }}
            onClick={handleBack}
            variant="contained"
          >
            View all invoices
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

PageHeader.propTypes = {
  invoice: PropTypes.object.isRequired,
};

export default PageHeader;
