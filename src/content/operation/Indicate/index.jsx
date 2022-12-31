import { PageHeaderIndicate } from "./PageHeaderIndicate";
// import Footer from "src/components/Footer";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";
import { Helmet } from "react-helmet-async";

import { Box, Card, Grid, TextField } from "@mui/material";

import { DocumentsAttachment } from "src/components/DocumentsAttachment";

function DashboardReports() {
  return (
    <>
      <Helmet>
        <title>CRM - Smart Posto</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderIndicate />
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
        <Grid item md={5} xs={12}>
          <Card
            sx={{
              p: 3,
            }}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Box pb={1}>
                  <b>CNPJ:</b>
                </Box>
                <TextField
                  fullWidth
                  name="CNPJ"
                  placeholder="Digite aqui o CNPJ..."
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Box pb={1}>
                  <b>Nome da empresa:</b>
                </Box>
                <TextField
                  fullWidth
                  name="companyName"
                  placeholder="Digite aqui o nome da empresa..."
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <Box pb={1}>
                  <b>Telefone:</b>
                </Box>
                <TextField
                  fullWidth
                  name="phone"
                  placeholder="Digite aqui o Telefone..."
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid item md={5} xs={12}>
          <DocumentsAttachment />
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </>
  );
}

export default DashboardReports;
