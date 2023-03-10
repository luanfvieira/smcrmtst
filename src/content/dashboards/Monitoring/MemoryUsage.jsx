import { Card, Typography, useTheme } from "@mui/material";
import Chart from "react-apexcharts";

function MemoryUsage() {
  const theme = useTheme();

  const data = {
    series: [
      {
        bg: theme.colors.success.light,
        data: 25,
        title: "Free",
      },
      {
        bg: theme.colors.error.light,
        data: 40,
        title: "Used",
      },
      {
        bg: theme.colors.info.light,
        data: 35,
        title: "Available",
      },
    ],
  };

  const chartOptions = {
    chart: {
      background: "transparent",
      stacked: false,
      toolbar: {
        show: false,
      },
    },
    labels: data.series.map((chart) => chart.title),
    plotOptions: {
      radialBar: {
        track: {
          background: theme.colors.alpha.black[10],
        },
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 10,
          size: "15%",
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
      },
    },
    states: {
      normal: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
      active: {
        filter: {
          type: "none",
        },
      },
    },
    colors: data.series.map((chart) => chart.bg),
    legend: {
      show: true,
      floating: true,
      fontSize: "14px",
      position: "left",
      offsetX: 0,
      offsetY: 25,
      labels: {
        useSeriesColors: true,
      },
      formatter(seriesName, opts) {
        return `${seriesName}:  ${opts.w.globals.series[opts.seriesIndex]}`;
      },
      itemMargin: {
        vertical: 3,
      },
    },
    theme: {
      mode: theme.palette.mode,
    },
  };

  const chartSeries = data.series.map((item) => item.data);

  return (
    <Card
      sx={{
        display: "flex",
        alignItems: "center",
      }}
    >
      <Chart
        height={300}
        options={chartOptions}
        series={chartSeries}
        type="radialBar"
      />
      <Typography variant="h1">
        Memory
        <br />
        Usage
      </Typography>
    </Card>
  );
}

export default MemoryUsage;
