import { Fragment } from "react";
import {
  Card,
  Box,
  CardActions,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  List,
  Badge,
  styled,
  useTheme,
  Typography,
} from "@mui/material";
import Text from "src/components/Text";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import TrendingUp from "@mui/icons-material/TrendingUp";
import TrendingDown from "@mui/icons-material/TrendingDown";

import Scrollbar from "src/components/Scrollbar";

import { ReportPerStatusDetails } from "./ReportPerStatusDetails";

import Chart from "react-apexcharts";
import Label from "src/components/Label";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    width: ${theme.spacing(6)};
    height: ${theme.spacing(6)};
`
);

const ArrowTrendingUpWrapper = styled(TrendingUp)(
  ({ theme }) => `
      color:  ${theme.palette.success.main};
`
);

const ArrowTrendingDownWrapper = styled(TrendingDown)(
  ({ theme }) => `
      color:  ${theme.palette.error.main};
`
);

export function ReportPerBranch({ data }) {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "45%",
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      hover: {
        filter: {
          type: "none",
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: "none",
          value: 0,
        },
      },
    },
    colors: [theme.colors.success.light, theme.colors.error.light],
    dataLabels: {
      enabled: true,
      formatter: function (val, opts) {
        return opts.w.config.series[opts.seriesIndex];
      },
      dropShadow: {
        enabled: true,
        top: 1,
        left: 1,
        blur: 1,
        color: theme.colors.alpha.black[50],
        opacity: 0.5,
      },
    },
    fill: {
      opacity: 1,
    },
    labels: ["GANHO", "PERDA"],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  return (
    <Card
      sx={{
        height: "100%",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        p={2}
      >
        <Box>
          <Typography variant="h4">Indicações por unidade</Typography>
        </Box>
        <Box>
          <Box
            sx={{
              mt: 0.5,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            <Label color="success">GANHO</Label>
            <ArrowTrendingUpWrapper
              sx={{
                mt: 0.7,
              }}
              fontSize="small"
            />
            <Label sx={{ ml: 0.5 }} color="error">
              PERDA
            </Label>
            <ArrowTrendingDownWrapper
              sx={{
                mt: 0.7,
              }}
              fontSize="small"
            />
          </Box>
        </Box>
      </Box>
      <Divider />
      <Divider />
      <Box
        sx={{
          height: 458,
        }}
      >
        <Scrollbar>
          <List disablePadding>
            {Object.keys(data)?.map((item, index) => {
              return (
                <Fragment key={item}>
                  <ListItem
                    sx={{
                      py: 0.8,
                    }}
                  >
                    <ListItemAvatar
                      sx={{
                        mr: 1,
                      }}
                    >
                      <Badge
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        overlap="rectangular"
                      >
                        <AvatarWrapper variant="rounded">
                          <LocalGasStationIcon />
                        </AvatarWrapper>
                      </Badge>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: "h4", noWrap: true }}
                    />
                    <Box
                      display="flex"
                      flexDirection="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      <Text color="black">
                        Total:{" "}
                        {
                          Object.values(data).filter(
                            (_, ind) => ind === index
                          )[0][2]?.qtd
                        }
                      </Text>
                      <Chart
                        height={100}
                        width={100}
                        options={chartOptions}
                        series={[
                          Object.values(data).filter(
                            (_, ind) => ind === index
                          )[0][0]?.qtd,
                          Object.values(data).filter(
                            (_, ind) => ind === index
                          )[0][1]?.qtd,
                        ]}
                        type="donut"
                      />
                      <Box sx={{ marginTop: -6 }}>
                        <ReportPerStatusDetails
                          details={
                            Object.values(data).filter(
                              (_, ind) => ind === index
                            )[0][3]?.info
                          }
                          type={item}
                        />
                      </Box>
                    </Box>
                  </ListItem>
                  <Divider component="li" />
                </Fragment>
              );
            })}
          </List>
        </Scrollbar>
      </Box>
      <Divider />

      <CardActions
        disableSpacing
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Button size="small">View all trainers</Button> */}
      </CardActions>
    </Card>
  );
}
