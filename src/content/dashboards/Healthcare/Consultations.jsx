import { Card, Box, Typography, useTheme } from "@mui/material";
import Label from "src/components/Label";
import Chart from "react-apexcharts";

function Consultations() {
  const theme = useTheme();

  const chartOptions = {
    chart: {
      background: "transparent",
      selection: {
        enabled: false,
      },
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: "60%",
        },
      },
    },
    colors: [theme.colors.success.main, theme.colors.primary.main],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${val}%`;
      },
      style: {
        colors: [theme.colors.alpha.trueWhite[100]],
      },
      background: {
        enabled: true,
        foreColor: theme.colors.alpha.trueWhite[100],
        padding: 8,
        borderRadius: 4,
        borderWidth: 0,
        opacity: 0.3,
        dropShadow: {
          enabled: true,
          top: 1,
          left: 1,
          blur: 1,
          color: theme.colors.alpha.black[70],
          opacity: 0.5,
        },
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
    labels: ["Yesterday", "Today"],
    legend: {
      labels: {
        colors: theme.colors.alpha.trueWhite[100],
      },
      show: false,
    },
    stroke: {
      width: 0,
    },
    tooltip: {
      followCursor: true,
      x: {
        show: true,
      },
      y: {
        formatter: (value) => {
          return value + " appointments";
        },
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = [38, 62];

  return (
    <Card
      sx={{
        p: 3,
      }}
    >
      <Chart
        height={250}
        options={chartOptions}
        series={chartSeries}
        type="donut"
      />
      <Box
        display="flex"
        alignItems="center"
        sx={{
          py: 2,
        }}
        justifyContent="center"
      >
        <Typography
          variant="h3"
          align="center"
          sx={{
            mr: 1,
          }}
        >
          Consultations
        </Typography>
        <Label color="success">
          <b>+10%</b>
        </Label>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="center">
        <Typography
          variant="h1"
          align="center"
          lineHeight={1}
          sx={{
            mr: 1,
          }}
        >
          21
        </Typography>
        <Typography variant="subtitle2" fontWeight="bold">
          Today
        </Typography>
      </Box>
    </Card>
  );
}

export default Consultations;
