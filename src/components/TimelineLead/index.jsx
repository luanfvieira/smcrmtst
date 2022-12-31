import { Fragment } from "react";
import {
  Box,
  CardHeader,
  Card,
  Typography,
  styled,
  useTheme,
  Divider,
} from "@mui/material";

import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import TimelineOppositeContent from "@mui/lab/TimelineOppositeContent";

import Scrollbar from "src/components/Scrollbar";
import { formatDate } from "src/utils/formatDate";
import { formatNumber } from "src/utils/formatNumber";

import { ImageStepper } from "src/components/ImageStepper";

const LabelWrapper = styled(Box)(
  ({ theme }) => `
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    text-transform: uppercase;
    border-radius: ${theme.general.borderRadiusSm};
    padding: ${theme.spacing(0.5, 1)};
  `
);

export function TimelineLead({ lead }) {
  const theme = useTheme();

  if (lead.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        Carregando...
      </Typography>
    );
  }

  return (
    <Card>
      <CardHeader
        sx={{
          p: 3,
        }}
        disableTypography
        title={<Typography variant="h4">Histórico</Typography>}
      />
      <Box
        sx={{
          height: 420,
        }}
      >
        <Scrollbar>
          <Timeline
            sx={{
              m: 0,
            }}
          >
            {lead?.actions.map((action) => {
              return (
                <TimelineItem
                  key={action.code}
                  sx={{
                    p: 0,
                  }}
                >
                  <TimelineOppositeContent
                    sx={{
                      width: "120px",
                      flex: "none",
                    }}
                    color="text.secondary"
                  >
                    {formatDate(action.createdAt)}
                  </TimelineOppositeContent>
                  <TimelineSeparator
                    sx={{
                      position: "relative",
                    }}
                  >
                    <TimelineDot
                      sx={{
                        marginTop: 0,
                        top: theme.spacing(1.2),
                      }}
                      variant="outlined"
                      color={
                        action.actionsTypesStatusId === "INICIADO" ||
                        action.actionsTypesStatusId === "NEGOCIADO"
                          ? "success"
                          : [
                              "NEGADO",
                              "CADASTRO NEGADO",
                              "PERDA COMERCIAL",
                            ].includes(action.actionsTypesStatusId)
                          ? "error"
                          : "primary"
                      }
                    ></TimelineDot>
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent
                    sx={{
                      pb: 4,
                    }}
                  >
                    <LabelWrapper
                      component="span"
                      sx={{
                        background: `${
                          action.actionsTypesStatusId === "INICIADO" ||
                          action.actionsTypesStatusId === "NEGOCIADO"
                            ? theme.colors.success.main
                            : [
                                "NEGADO",
                                "CADASTRO NEGADO",
                                "PERDA COMERCIAL",
                              ].includes(action.actionsTypesStatusId)
                            ? theme.colors.error.main
                            : theme.colors.primary.main
                        }`,
                        color: `${theme.palette.getContrastText(
                          theme.colors.success.dark
                        )}`,
                      }}
                    >
                      {action.actionsTypesStatusId}
                    </LabelWrapper>

                    {action.actionsTypesStatusId === "NEGOCIADO" && (
                      <>
                        {lead?.info?.negotiations
                          ?.filter((item) => item.date === action?.createdAt)
                          .map((negotiation) => {
                            return (
                              <Fragment key={negotiation.date}>
                                <Box
                                  display="flex"
                                  mt={1}
                                  alignItems="flex-start"
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <b>Irá Abastecer em todas unidades:</b>{" "}
                                    {negotiation?.questions.filter(
                                      (item) => item.id === "TODA_REDE"
                                    )[0].response === false
                                      ? "Não"
                                      : "Sim"}
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  mt={1}
                                  alignItems="flex-start"
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <b>Estados que não irá Abastecer?:</b>{" "}
                                    {negotiation?.questions.filter(
                                      (item) => item.id === "ESTADOS_NAO_FECHOU"
                                    )[0].response.length === 0
                                      ? "N/A"
                                      : negotiation?.questions
                                          .filter(
                                            (item) =>
                                              item.id === "ESTADOS_NAO_FECHOU"
                                          )[0]
                                          .response.join(", ")}
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  mt={1}
                                  alignItems="flex-start"
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <b>Motivo:</b>{" "}
                                    {negotiation?.questions.filter(
                                      (item) => item.id === "MOTIVO"
                                    )[0].response.length === 0
                                      ? "N/A"
                                      : negotiation?.questions
                                          .filter(
                                            (item) => item.id === "MOTIVO"
                                          )[0]
                                          .response.join(", ")}
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  mt={1}
                                  alignItems="flex-start"
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    <b>Volume Negociado:</b>{" "}
                                    {formatNumber(
                                      negotiation?.totalVolumeTraded
                                    )}
                                  </Typography>
                                </Box>
                                <Box
                                  display="flex"
                                  mt={1}
                                  mb={1}
                                  alignItems="flex-start"
                                >
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    Ação feita por:{" "}
                                    {
                                      lead.actions.filter(
                                        (action) =>
                                          action.createdAt === negotiation.date
                                      )[0]?.users?.name
                                    }
                                  </Typography>
                                </Box>
                                <Divider />
                              </Fragment>
                            );
                          })}
                      </>
                    )}

                    <Box display="flex" mt={1} alignItems="flex-start">
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ whiteSpace: "pre-line" }}
                        dangerouslySetInnerHTML={{
                          __html: action.obs
                            .replace(/\n/g, " ")
                            .replace(/ {2,}/g, " ")
                            .split(" ")
                            .map((word) => {
                              if (
                                word.match(/@[a-z]+[.][a-z]+/gm) &&
                                !word.includes(".com")
                              )
                                return `<span style="text-decoration: underline; color: #015A95"><i><b>${word}</b></i></span>`;
                              return word;
                            })
                            .join(" "),
                        }}
                      />
                    </Box>
                    <Box display="flex" mt={1} alignItems="flex-start">
                      <Typography variant="body2" color="text.secondary">
                        Ação feita por: {action.users.name}
                      </Typography>
                    </Box>

                    <Box display="flex" mt={1} alignItems="flex-start">
                      {action?.documentUrls?.urls.length && (
                        <ImageStepper images={action?.documentUrls?.urls} />
                      )}
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              );
            })}
          </Timeline>
        </Scrollbar>
      </Box>
    </Card>
  );
}
