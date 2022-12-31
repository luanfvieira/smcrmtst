import {
  Box,
  Card,
  Typography,
  Button,
  styled,
  Grid,
  CardContent,
  useTheme,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

const CardIndicatorWrapper = styled(Card)(
  () => `
    position: relative;
    
    .MuiCard-indicator {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      height: 5px;
    }
`
);

export default function AppPlayStore() {
  const theme = useTheme();
  return (
    <>
      <Helmet>
        <title>Aplicativo Download - Smart Posto</title>
      </Helmet>

      <Grid
        container
        spacing={3}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          mb: 4,
        }}
      >
        <Grid item xs={12}>
          <Typography
            variant="h3"
            sx={{
              my: 1,
              mt: 8,
            }}
          >
            O App do Smart Posto já está disponível.
          </Typography>
        </Grid>
        <br />
        <br />

        <Grid item xs={12} sm={6} md={5} lg={4} sx={{ mt: 6 }}>
          <CardIndicatorWrapper>
            <Box
              className="MuiCard-indicator"
              sx={{
                background: `${theme.colors.info.main}`,
              }}
            />
            <CardContent
              sx={{
                pb: 4,
                pt: 7,
                px: 3,
                textAlign: "center",
              }}
            >
              <img
                style={{ height: "90px" }}
                src="/static/images/logo/applestore.gif"
                alt="..."
              />
              <Typography
                variant="h3"
                sx={{
                  pt: 2,
                  px: 3,
                }}
                gutterBottom
              >
                Aplicativo para celulares iPhone
              </Typography>
              <Button
                href="https://apps.apple.com/br/app/smartposto/id6444860739"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
              >
                Baixar App iOS
              </Button>
            </CardContent>
          </CardIndicatorWrapper>
        </Grid>
        <Grid item xs={12} sm={6} md={5} lg={4} sx={{ mt: 6 }}>
          <CardIndicatorWrapper>
            <Box
              className="MuiCard-indicator"
              sx={{
                background: `${theme.colors.success.main}`,
              }}
            />
            <CardContent
              sx={{
                pb: 4,
                pt: 7,
                px: 3,
                textAlign: "center",
              }}
            >
              <img
                style={{ height: "90px" }}
                src="/static/images/logo/playstore.gif"
                alt="..."
              />
              <Typography
                variant="h3"
                sx={{
                  pt: 2,
                  px: 3,
                }}
                gutterBottom
              >
                Aplicativo para celulares Android
              </Typography>
              <Button
                href="https://play.google.com/store/apps/details?id=com.redemarajo.smartposto"
                target="_blank"
                rel="noopener noreferrer"
                variant="outlined"
                sx={{ mr: 4 }}
              >
                Baixar App Android
              </Button>
            </CardContent>
          </CardIndicatorWrapper>
        </Grid>
      </Grid>
      {/* </MainContent> */}
    </>
  );
}
