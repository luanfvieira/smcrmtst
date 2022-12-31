import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { PageHeaderDetailsIndicate } from "./PageHeaderDetailsIndicate";
// import Footer from "src/components/Footer";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";

import { Overview } from "./Overview";

import api from "src/utils/api";
import SuspenseLoader from "src/components/SuspenseLoader";
import { TimelineLead } from "src/components/TimelineLead";
import { Negotiations } from "./Negotiations";
import { SalesAmount } from "./SalesAmount";
import { empty } from "src/utils/empty";

function Index() {
  const { id } = useParams();
  const [lead, setLead] = useState([]);
  const [forceReload, setForceReload] = useState(null);
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function getIndicateDetails() {
      try {
        const { data } = await api.get(`crm/leads/show/${id}`);

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
        <PageHeaderDetailsIndicate reload={setForceReload} lead={lead} />
      </PageTitleWrapper>
      <Grid
        sx={{
          px: 2,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={2}
      >
        <Grid item md={6} xs={12}>
          <Grid>
            <Overview lead={lead} reload={setForceReload} />
          </Grid>
          <Grid sx={{ mt: 2, mb: 2 }}>
            <Negotiations lead={lead} />
          </Grid>
        </Grid>
        <Grid item md={6} xs={12}>
          {!empty(lead?.info?.negotiations[0]) && (
            <Grid sx={{ mb: 2 }}>
              <SalesAmount lead={lead} />
            </Grid>
          )}
          <Grid sx={{}}>
            <TimelineLead lead={lead} />
          </Grid>
        </Grid>
      </Grid>
      {/* <Footer /> */}
    </>
  );
}

export default Index;
