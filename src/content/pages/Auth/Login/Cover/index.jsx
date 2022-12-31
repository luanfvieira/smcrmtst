import {
  Box,
  Card,
  // Tooltip,
  Typography,
  Container,
  styled,
} from "@mui/material";
import { Helmet } from "react-helmet-async";
import useAuth from "src/hooks/useAuth";
import JWTLogin from "../LoginJWT";

// import Scrollbar from "src/components/Scrollbar";

// const icons = {
//   RedeFrota: "/static/images/logo/rede-frota.svg",
//   PegaPontos: "/static/images/logo/pega-pontos.svg",
//   FastPDV: "/static/images/logo/fast-pdv.svg",
//   FrotaBank: "/static/images/logo/frotabank.svg",
//   RedeMarajo: "/static/images/logo/rede-marajo.svg",
// };

const Content = styled(Box)(
  () => `
    display: flex;
    flex: 1;
    width: 100%;
`
);

const MainContent = styled(Box)(
  ({ theme }) => `
  // @media (min-width: ${theme.breakpoints.values.md}px) {
  //   padding: 0 0 0 440px;
  // }
  // width: 100%;
  // display: flex;
  // align-items: center;
  height: 100%;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`
);

// const SidebarWrapper = styled(Box)(
//   ({ theme }) => `
//     position: fixed;
//     left: 0;
//     top: 0;
//     height: 100%;
//     background: ${theme.colors.alpha.white[100]};
//     width: 440px;
// `
// );

// const SidebarContent = styled(Box)(
//   ({ theme }) => `
//   display: flex;
//   flex-direction: column;
//   padding: ${theme.spacing(6)};
// `
// );

// const CardImg = styled(Card)(
//   ({ theme }) => `
//     border-radius: 100%;
//     display: inline-flex;
//     align-items: center;
//     justify-content: center;
//     position: relative;
//     border: 1px solid ${theme.colors.alpha.black[10]};
//     transition: ${theme.transitions.create(["border"])};
//     position: absolute;

//     &:hover {
//       border-color: ${theme.colors.primary.main};
//     }
// `
// );

// const TypographyH1 = styled(Typography)(
//   ({ theme }) => `
//     font-size: ${theme.typography.pxToRem(33)};
// `
// );

function LoginCover() {
  const { method } = useAuth();

  return (
    <>
      <Helmet>
        <title>Login - Smart Posto</title>
      </Helmet>
      <Content>
        {/* <SidebarWrapper
          sx={{
            display: { xs: "none", md: "flex" },
          }}
        >
          <Scrollbar>
            <SidebarContent>
              <img
                src="/static/images/logo/smart-posto.svg"
                alt="Smart Posto"
              />
              <Box mt={6}>
                <TypographyH1
                  variant="h1"
                  sx={{
                    mb: 7,
                  }}
                >
                  Mais um produto Grupo Marajó
                </TypographyH1>
                <Box
                  sx={{
                    position: "relative",
                    width: 300,
                    height: 120,
                  }}
                >
                  <Tooltip arrow placement="top" title="Rede Frota">
                    <CardImg
                      sx={{
                        width: 80,
                        height: 80,
                        left: -20,
                        top: -40,
                      }}
                    >
                      <img
                        width={40}
                        alt="RedeFrota"
                        src={icons["RedeFrota"]}
                      />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Pega Pontos">
                    <CardImg
                      sx={{
                        width: 90,
                        height: 90,
                        left: 70,
                      }}
                    >
                      <img
                        width={50}
                        alt="PegaPontos"
                        src={icons["PegaPontos"]}
                      />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Fast PDV">
                    <CardImg
                      sx={{
                        width: 110,
                        height: 110,
                        top: -30,
                        left: 170,
                      }}
                    >
                      <img width={80} alt="Fast" src={icons["FastPDV"]} />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Frota Bank">
                    <CardImg
                      sx={{
                        width: 70,
                        height: 70,
                        bottom: 0,
                        right: -55,
                      }}
                    >
                      <img
                        width={50}
                        alt="FrotaBank"
                        src={icons["FrotaBank"]}
                      />
                    </CardImg>
                  </Tooltip>
                  <Tooltip arrow placement="top" title="Rede Marajó">
                    <CardImg
                      sx={{
                        width: 90,
                        height: 90,
                        bottom: -55,
                        right: 55,
                      }}
                    >
                      <img
                        width={50}
                        alt="Rede Marajó"
                        src={icons["RedeMarajo"]}
                      />
                    </CardImg>
                  </Tooltip>
                </Box>
              </Box>
            </SidebarContent>
          </Scrollbar>
        </SidebarWrapper> */}
        <MainContent>
          <Container
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
            maxWidth="sm"
          >
            <img src="/static/images/logo/smart-posto.svg" alt="Smart Posto" />
            <Card
              sx={{
                p: 4,
                my: 4,
              }}
            >
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  sx={{
                    mb: 1,
                  }}
                >
                  Entrar
                </Typography>
                <Typography
                  variant="h4"
                  color="text.secondary"
                  fontWeight="normal"
                  sx={{
                    mb: 3,
                  }}
                >
                  Preencha os campos abaixo para entrar em sua conta.
                </Typography>
              </Box>
              {method === "JWT" && <JWTLogin />}
            </Card>
          </Container>
        </MainContent>
      </Content>
    </>
  );
}

export default LoginCover;
