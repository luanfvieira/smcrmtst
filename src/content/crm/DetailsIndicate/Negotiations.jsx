import {
  Card,
  Box,
  CardHeader,
  Typography,
  Divider,
  ListItem,
  Chip,
  List,
  styled,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { empty } from "src/utils/empty";
import { useEffect } from "react";
import api from "src/utils/api";
import { useState } from "react";
import { formatNumber } from "src/utils/formatNumber";
import { formatDate } from "src/utils/formatDate";

const BoxItemWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    background: ${theme.colors.alpha.black[5]};
    position: relative;
    padding: ${theme.spacing(2)};
    width: 100%;
    
    &::before {
      content: '.';
      background: ${theme.colors.error.main};
      color: ${theme.colors.error.main};
      border-radius: ${theme.general.borderRadius};
      position: absolute;
      text-align: center;
      width: 6px;
      left: 0;
      height: 100%;
      top: 0;
    }
    
    &.wrapper-info {
      &:before {
        background: ${theme.colors.info.main};
        color: ${theme.colors.info.main};
      }
    }
        
    &.wrapper-warning {
      &:before {
        background: ${theme.colors.warning.main};
        color: ${theme.colors.warning.main};
      }
    }
`
);

export function Negotiations({ lead }) {
  const [negotiations, setNegotiations] = useState([]);

  useEffect(() => {
    async function getOldNegotiations() {
      if (empty(lead.clients) && empty(lead.clientGroup)) return;

      const identifierId = empty(lead.clients)
        ? `clientGroupsId=${lead?.clientGroup?.id}`
        : `clientId=${lead?.clients?.id}`;

      const { data } = await api.get(`crm/leads/negotiations?${identifierId}`);

      setNegotiations(data?.negotiations);
    }
    getOldNegotiations();
  }, [lead]);

  if (empty(lead.clients) && empty(lead.clientGroup)) {
    return null;
  }

  return (
    <Card>
      <CardHeader
        sx={{
          display: { xs: "block", sm: "flex" },
        }}
        title="Negociações Anteriores"
      />
      <Divider />
      <List component="div" disablePadding>
        <Divider />
        {negotiations?.map((negotiation) => {
          return negotiation?.info?.negotiations?.map((item) => {
            return (
              <ListItem
                key={item.date}
                component="div"
                sx={{
                  pt: 2,
                  pb: 2,
                }}
              >
                <BoxItemWrapper className="wrapper-info">
                  <Box display="flex" mt={1} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      <b>Irá Abastecer em todas unidades:</b>{" "}
                      {item?.questions.filter(
                        (item) => item.id === "TODA_REDE"
                      )[0].response === false
                        ? "Não"
                        : "Sim"}
                    </Typography>
                  </Box>
                  <Box display="flex" mt={1} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      <b>Estados que não irá Abastecer?:</b>{" "}
                      {item?.questions.filter(
                        (item) => item.id === "ESTADOS_NAO_FECHOU"
                      )[0].response.length === 0
                        ? "N/A"
                        : item?.questions
                            .filter(
                              (item) => item.id === "ESTADOS_NAO_FECHOU"
                            )[0]
                            .response.join(", ")}
                    </Typography>
                  </Box>
                  <Box display="flex" mt={1} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      <b>Motivo:</b>{" "}
                      {item?.questions.filter((item) => item.id === "MOTIVO")[0]
                        .response.length === 0
                        ? "N/A"
                        : item?.questions
                            .filter((item) => item.id === "MOTIVO")[0]
                            .response.join(", ")}
                    </Typography>
                  </Box>
                  <Box display="flex" mt={1} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      <b>Volume Negociado:</b>{" "}
                      {formatNumber(item?.totalVolumeTraded)}
                    </Typography>
                  </Box>
                  <Box display="flex" mt={1} mb={1} alignItems="flex-start">
                    <Typography variant="body2" color="text.secondary">
                      <b>Data:</b> {formatDate(item?.date)}
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      // pl: 2.3,
                      mt: 2,
                    }}
                  >
                    <Chip
                      component={RouterLink}
                      variant="outlined"
                      sx={{
                        mr: 0.5,
                        cursor: "pointer",
                      }}
                      size="small"
                      label={
                        negotiation?.id === lead.id
                          ? "Lead Atual"
                          : "Visualizar Lead"
                      }
                      color="primary"
                      to={`/app/crm/indicate/${negotiation?.id}/details`}
                    />
                  </Box>
                </BoxItemWrapper>
              </ListItem>
            );
          });
        })}
      </List>
    </Card>
  );
}
