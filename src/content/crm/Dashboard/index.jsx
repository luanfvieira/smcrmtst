import { Helmet } from "react-helmet-async";
import { PageHeaderDashboard } from "./PageHeader";
import { ReportPerStatus } from "./ReportPerStatus";
// import { ReportPerBranch } from "./ReportPerBranch";
// import { ReportPerAgent } from "./ReportPerAgent";

import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { Box, Grid, Typography } from "@mui/material";
import { useState } from "react";
import api from "src/utils/api";
import { empty } from "src/utils/empty";
import SuspenseLoader from "src/components/SuspenseLoader";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useQuery } from "react-query";

function DashboardProducts() {
  const [month, setMonth] = useState(format(new Date(), "M", { locale: ptBR }));

  // console.log(format(new Date(), "M", { locale: ptBR }));

  // const [data, setData] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  const { data, isLoading } = useQuery(
    ["dashboard", month],
    async () => {
      const { data } = await api.get("/crm/leads/quantities", {
        params: { month },
      });

      return data?.quantities;
    },
    { refetchOnWindowFocus: false }
  );

  // useEffect(() => {
  //   async function getData() {
  //     try {
  //       setIsLoading(true);
  //       const { data } = await api.get("/crm/leads/quantities", {
  //         params: { month },
  //       });

  //       setData(data?.quantities);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getData();
  // }, [month]);

  if (isLoading) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard CRM - Smart Posto</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeaderDashboard setMonth={setMonth} updatedAt={data?.updatedAt} />
      </PageTitleWrapper>

      <Grid
        sx={{
          px: 4,
          marginBottom: 2,
        }}
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          {!empty(data?.countPerStatus) ? (
            <ReportPerStatus data={data?.countPerStatus} />
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="stretch"
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h3" sx={{ mb: 1 }}>
                Não há negociações neste mês
              </Typography>
            </Box>
          )}
        </Grid>
        {/* <Grid item md={6} xs={12}>
          {!empty(data?.countPerBranch) ? (
            <ReportPerBranch data={data?.countPerBranch} />
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="stretch"
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Não há Indicações das filiais neste mês
              </Typography>
            </Box>
          )}
        </Grid>
        <Grid item md={6} xs={12}>
          {!empty(data?.countPerAgent) ? (
            <ReportPerAgent data={data?.countPerAgent} />
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="stretch"
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h5" sx={{ mb: 1 }}>
                Não há negociações por representante neste mês
              </Typography>
            </Box>
          )}
        </Grid> */}
      </Grid>
      {/* <Footer /> */}
    </>
  );
}

export default DashboardProducts;
