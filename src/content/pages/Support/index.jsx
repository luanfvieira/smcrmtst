import { Box, Card, Typography, styled, Container, Link } from "@mui/material";
import { Helmet } from "react-helmet-async";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

function RecoverPasswordBasic() {
  return (
    <>
      <Helmet>
        <title>Suporte - Smart Posto</title>
      </Helmet>
      <MainContent>
        <Container maxWidth="sm">
          <img src="/static/images/logo/smart-posto.svg" alt="Smart Posto" />
          <Card
            sx={{
              mt: 3,
              p: 4,
            }}
          >
            <Box>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                }}
              >
                Fale com a gente
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mt: 3,
                  mb: 1,
                }}
              >
                Telefone: 62 3999-6262
              </Typography>

              <Link
                href="mailto:ajuda@redemarajo.com.br"
                target="_blank"
                rel="noopener noreferrer"
                sx={{ cursor: "pointer" }}
              >
                E-mail: ajuda@redemarajo.com.br
              </Link>
            </Box>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export default RecoverPasswordBasic;
