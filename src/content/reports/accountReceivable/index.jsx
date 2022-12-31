/* eslint-disable no-unused-vars */
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { useNotification } from "src/hooks/useNotification";
import PageFilter from "./PageFilter";
import {
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
} from "@mui/material";

function AccountReceivable() {
  const [notify] = useNotification();
  const [load, setLoad] = useState(true);

  return (
    <>
      <Helmet>
        <title>Contas a Receber - Relatórios</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Container>
        <Card variant="outlined">
          <CardHeader />
          <Divider />
          <CardContent>
            <PageFilter />
          </CardContent>
          <Divider />
          <CardHeader />
        </Card>
      </Container>
    </>
  );
}

export default AccountReceivable;
