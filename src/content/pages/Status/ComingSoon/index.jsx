import { useEffect, useState } from "react";
import { Box, Typography, Container, styled } from "@mui/material";
import { Helmet } from "react-helmet-async";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

const TypographyH1 = styled(Typography)(
  ({ theme }) => `
  font-size: ${theme.typography.pxToRem(75)};
`
);

const TypographyH3 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.colors.alpha.black[50]};
`
);

function StatusComingSoon() {
  const calculateTimeLeft = () => {
    const difference = +new Date(`2022-11-10`) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        dias: Math.floor(difference / (1000 * 60 * 60 * 24)),
        horas: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutos: Math.floor((difference / 1000 / 60) % 60),
        segundos: Math.floor((difference / 1000) % 60),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
  });

  const timerComponents = [];

  Object.keys(timeLeft).forEach((interval) => {
    if (!timeLeft[interval]) {
      return;
    }

    timerComponents.push(
      <Box maxWidth="md" textAlign="center" px={3}>
        <TypographyH1 variant="h1">{timeLeft[interval]}</TypographyH1>
        <TypographyH3 variant="h3">{interval}</TypographyH3>
      </Box>
    );
  });

  return (
    <>
      <Helmet>
        <title>Status - SmartPosto</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="md">
          <img src="/static/images/logo/smart-posto.svg" alt="Smart Posto" />
          <Box textAlign="center" mb={3}>
            <Container maxWidth="xs">
              <Typography
                variant="h1"
                sx={{
                  mt: 4,
                  mb: 2,
                }}
              >
                Em breve
              </Typography>
              <Typography
                variant="h3"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 4,
                }}
              >
                Estamos trabalhando na implementação dos melhores recursos antes
                do lançamento!
              </Typography>
            </Container>
            <img
              alt="Smart Posto"
              height={200}
              src="/static/images/status/coming-soon.svg"
            />
          </Box>

          <Box display="flex" justifyContent="center">
            {timerComponents.length ? timerComponents : <>Time's up!</>}
          </Box>
        </Container>
      </MainContent>
    </>
  );
}

export default StatusComingSoon;
