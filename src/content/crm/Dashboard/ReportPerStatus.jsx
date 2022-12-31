import {
  Box,
  Card,
  Typography,
  Grid,
  CardHeader,
  CardContent,
} from "@mui/material";

import { ReportPerStatusDetails } from "./ReportPerStatusDetails";

import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import PersonAddDisabledIcon from "@mui/icons-material/PersonAddDisabled";
import ProductionQuantityLimitsIcon from "@mui/icons-material/ProductionQuantityLimits";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import MoneyOffIcon from "@mui/icons-material/MoneyOff";
import TrendingDownTwoToneIcon from "@mui/icons-material/TrendingDownTwoTone";
import HourglassEmptyIconIcon from "@mui/icons-material/HourglassEmpty";
import TrendingUpTwoToneIcon from "@mui/icons-material/TrendingUpTwoTone";
import TrendingFlatTwoToneIcon from "@mui/icons-material/TrendingFlatTwoTone";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import QueryStatsIcon from "@mui/icons-material/QueryStats";
import HandshakeIcon from "@mui/icons-material/Handshake";

import Text from "src/components/Text";

export function ReportPerStatus({ data }) {
  return (
    <>
      <Typography variant="h3" sx={{ mb: 1 }}>
        Quantidade de analise
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={2}
          >
            {Object.keys(data)?.map((item, index) => {
              return (
                <Grid item lg={3} sm={6} xs={12} key={item}>
                  <Card
                    sx={{
                      px: 1,
                      pt: 1,
                    }}
                  >
                    <CardHeader
                      sx={{
                        pb: 0,
                      }}
                      titleTypographyProps={{
                        variant: "subtitle2",
                        fontWeight: "bold",
                        color: "textSecondary",
                      }}
                      action={
                        <ReportPerStatusDetails
                          details={
                            Object.values(data).filter(
                              (_, ind) => ind === index
                            )[0]?.info
                          }
                          type={item}
                        />
                      }
                      title={item}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {item === "FINALIZADO" && (
                          <Text color="success">
                            <TrendingUpTwoToneIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "NEGADO" && (
                          <Text color="error">
                            <CloseTwoToneIcon fontSize="large" />
                          </Text>
                        )}

                        {item === "CLIENTES NOVOS" && (
                          <Text color="success">
                            <SensorOccupiedIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "PERDA COMERCIAL" && (
                          <Text color="error">
                            <MoneyOffIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "CADASTRO NEGADO" && (
                          <Text color="error">
                            <PersonAddDisabledIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "NEGOCIADO" && (
                          <Text color="info">
                            <HandshakeIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "EXPIRADO" && (
                          <Text color="warning">
                            <TrendingDownTwoToneIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "PENDENTE" && (
                          <Text color="warning">
                            <HourglassEmptyIconIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "EM ANDAMENTO" && (
                          <Text color="secondary">
                            <TrendingFlatTwoToneIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "CADASTRO" && (
                          <Text>
                            <PersonAddAlt1Icon fontSize="large" />
                          </Text>
                        )}
                        {item === "COMERCIAL" && (
                          <Text color="success">
                            <QueryStatsIcon fontSize="large" />
                          </Text>
                        )}
                        {item === "SEM VOLUME" && (
                          <Text>
                            <ProductionQuantityLimitsIcon fontSize="large" />
                          </Text>
                        )}
                      </Box>

                      <Typography variant="h3">
                        {
                          Object.values(data).filter(
                            (_, ind) => ind === index
                          )[0]?.qtd
                        }
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
