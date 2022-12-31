import { Helmet } from "react-helmet-async";
import { PageHeaderManagerLeads } from "./PageHeaderManagerLeads";
import { TableMyLeads } from "./TableMyLeads";
import Footer from "src/components/Footer";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import api from "src/utils/api";
import { empty } from "src/utils/empty";
import SuspenseLoader from "src/components/SuspenseLoader";
import { useSearchParams } from "react-router-dom";

function DashboardProducts() {
  const [searchParams] = useSearchParams();

  const [leadsData, setLeadsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filterStartDate, setFilterStartDate] = useState(
    searchParams.get("filterStartDate")
  );
  const [filterEndDate, setFilterEndDate] = useState(
    searchParams.get("filterEndDate")
  );
  const [company, setCompany] = useState(searchParams.get("company"));
  const [status, setStatus] = useState(searchParams.get("status"));
  const [agent, setAgent] = useState(searchParams.get("agent"));

  useEffect(() => {
    async function getIndicate() {
      try {
        const { data } = await api.get("/crm/leads", {
          params: {
            filterStartDate: empty(String(filterStartDate))
              ? undefined
              : filterStartDate,
            filterEndDate: empty(String(filterEndDate))
              ? undefined
              : filterEndDate,
            company: empty(company) ? undefined : company,
            status: empty(status) ? undefined : status,
            agent: empty(agent) ? undefined : agent,
          },
        });

        setLeadsData(data.leads);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    getIndicate();
  }, [agent, company, filterEndDate, filterStartDate, status]);

  if (loading) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>Gestão de Indicações CRM - Smart Posto</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderManagerLeads />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 1,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <TableMyLeads
            leadsData={leadsData}
            setFilterStartDate={setFilterStartDate}
            setFilterEndDate={setFilterEndDate}
            setCompany={setCompany}
            setStatus={setStatus}
            setAgent={setAgent}
          />
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default DashboardProducts;
