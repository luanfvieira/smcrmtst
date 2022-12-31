import { Box, Stack, Card, Typography, Divider, useTheme } from "@mui/material";
import { formatNumber } from "src/utils/formatNumber";

export function SalesAmount({ lead }) {
  const theme = useTheme();

  const volumes = lead?.info?.negotiations[0];

  return (
    <Card
      sx={{
        mt: { xs: 3, lg: 0 },
      }}
    >
      <Stack
        direction="row"
        divider={
          <Divider
            sx={{
              background: `${theme.colors.alpha.black[10]}`,
            }}
            orientation="vertical"
            flexItem
          />
        }
        justifyContent="space-around"
        alignItems="center"
        spacing={0}
      >
        <Box px={3} py={2} textAlign="center">
          <Typography
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            gutterBottom
          >
            Volume Anterior
          </Typography>
          <Typography color="text.primary" variant="h4">
            {formatNumber(volumes?.volume1)}
          </Typography>
        </Box>
        <Box px={3} py={2} textAlign="center">
          <Typography
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            gutterBottom
          >
            Volume Atual
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography color="text.primary" variant="h4">
              {formatNumber(volumes?.volume2)}
            </Typography>
          </Box>
        </Box>
        <Box px={3} py={2} textAlign="center">
          <Typography
            variant="h4"
            fontWeight="normal"
            color="text.secondary"
            gutterBottom
          >
            Volume Negociado
          </Typography>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Typography color="text.primary" variant="h4">
              {formatNumber(volumes?.totalVolumeTraded)}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </Card>
  );
}
