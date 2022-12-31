import { Helmet } from "react-helmet-async";
import { PageHeaderListIndicate } from "./PageHeaderListIndicate";
import Footer from "src/components/Footer";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { Grid } from "@mui/material";

import { TableIndicate } from "./TableIndicate";

function DashboardProducts() {
  return (
    <>
      <Helmet>
        <title>CRM Minhas Indicações - Smart Posto</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderListIndicate />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <TableIndicate />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardProducts;
