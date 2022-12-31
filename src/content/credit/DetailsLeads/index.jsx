import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeaderDetailsIndicate } from "./PageHeaderDetailsIndicate";
import Footer from "src/components/Footer";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import SuspenseLoader from "src/components/SuspenseLoader";
import { TimelineLead } from "src/components/TimelineLead";

import { Overview } from "./Overview";

import api from "src/utils/api";

function Index() {
  const { id } = useParams();

  const [lead, setLead] = useState([]);
  const [forceReload, setForceReload] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function getIndicateDetails() {
      try {
        const { data } = await api.get(`cadastro/leads/show/${id}`);

        setLead(data.lead);
      } catch (err) {
        console.error(err);
      } finally {
        setLoad(false);
      }
    }

    getIndicateDetails();
  }, [id, forceReload]);

  if (load) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>CRM Indicação Detalhada - Smart Posto</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderDetailsIndicate lead={lead} reload={setForceReload} />
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
        <Grid item md={6} xs={12}>
          <Overview lead={lead} reload={setForceReload} />
        </Grid>
        <Grid item md={6} xs={12}>
          <TimelineLead lead={lead} />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default Index;
