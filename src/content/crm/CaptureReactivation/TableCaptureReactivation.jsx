import {
  Box,
  Card,
  Typography,
  alpha,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Table,
  TableContainer,
  styled,
  useTheme,
  Divider,
} from "@mui/material";
import Text from "src/components/Text";
import { Link as RouterLink } from "react-router-dom";

import ArrowUpwardTwoToneIcon from "@mui/icons-material/ArrowUpwardTwoTone";
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import React, { useEffect } from "react";
import { formatNumber } from "src/utils/formatNumber";
import { formatDate } from "src/utils/formatDate";
import { formatAlias } from "src/utils/formatAlias";
import { CRMFilter } from "src/components/CRMFilter";

const TableWrapper = styled(Table)(
  ({ theme }) => `

    thead tr th {
        border: 0;
    }

    tbody tr td {
        position: relative;
        border: 0;

        & > div {
            position: relative;
            z-index: 5;
        }

        &::before {
            position: absolute;
            left: 0;
            top: 0;
            transition: ${theme.transitions.create(["all"])};
            height: 100%;
            width: 100%;
            content: "";
            background: ${theme.colors.alpha.white[100]};
            border-top: 1px solid ${theme.colors.alpha.black[10]};
            border-bottom: 1px solid ${theme.colors.alpha.black[10]};
            pointer-events: none;
            z-index: 4;
        }

        &:first-of-type:before {
            border-top-left-radius: ${theme.general.borderRadius};
            border-bottom-left-radius: ${theme.general.borderRadius};
            border-left: 1px solid ${theme.colors.alpha.black[10]};
        }
        

        &:last-child:before {
            border-top-right-radius: ${theme.general.borderRadius};
            border-bottom-right-radius: ${theme.general.borderRadius};
            border-right: 1px solid ${theme.colors.alpha.black[10]};
        }
    }

    tbody tr:hover td::before {
        background: ${alpha(theme.colors.primary.main, 0.02)};
        border-color: ${alpha(theme.colors.alpha.black[100], 0.25)} !important;
    }

  `
);

const TableRowDivider = styled(TableRow)(
  ({ theme }) => `
    height: ${theme.spacing(2)};
  `
);

const LabelWarning = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.palette.warning.main};
    color: ${theme.palette.warning.contrastText};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    line-height: 23px;
    height: 22px;
    padding: ${theme.spacing(0, 2)};
    border-radius: ${theme.general.borderRadius};
  `
);

const LabelPrimary = styled(Box)(
  ({ theme }) => `
      display: inline-block;
      background: ${theme.colors.primary.main};
      color: ${theme.palette.primary.contrastText};
      text-transform: uppercase;
      font-size: ${theme.typography.pxToRem(10)};
      font-weight: bold;
      line-height: 23px;
      height: 22px;
      padding: ${theme.spacing(0, 2)};
      border-radius: ${theme.general.borderRadius};
  `
);

const LabelSuccess = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.palette.success.main};
    color: ${theme.palette.success.contrastText};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(10)};
    font-weight: bold;
    line-height: 23px;
    height: 22px;
    padding: ${theme.spacing(0, 2)};
    border-radius: ${theme.general.borderRadius};
  `
);

const TableHeadWrapper = styled(TableHead)(
  ({ theme }) => `
      .MuiTableCell-root {
          text-transform: none;
          font-weight: normal;
          color: ${theme.colors.alpha.black[100]};
          font-size: ${theme.typography.pxToRem(16)};
          padding: ${theme.spacing(2)};
      }

      .MuiTableRow-root {
          background: transparent;
      }
  `
);

export function TableCaptureReactivation({
  leadsData,
  setSummaryTotal,
  setFilterStartDate,
  setFilterEndDate,
  setCompany,
  setStatus,
  setAgent,
}) {
  const theme = useTheme();

  const lowLeads = leadsData.filter(
    (lead) => lead?.leadsTypesStatusId === "NEGOCIADO"
  ).length;

  const highLeads = leadsData.filter(
    (lead) => lead?.leadsTypesStatusId === "FINALIZADO"
  ).length;

  useEffect(() => {
    setSummaryTotal({ low: lowLeads, high: highLeads });
  }, [highLeads, lowLeads, setSummaryTotal]);

  return (
    <Card>
      <Box px={1} pb={1}>
        <CRMFilter
          setFilterStartDate={setFilterStartDate}
          setFilterEndDate={setFilterEndDate}
          setCompany={setCompany}
          setStatus={setStatus}
          setAgent={setAgent}
          isChangedStatus={false}
        />

        <Divider />
        <TableContainer>
          <TableWrapper>
            <TableHeadWrapper>
              <TableRow>
                <TableCell>#</TableCell>
                <TableCell style={{ width: 120 }}>Indicador/Filial</TableCell>
                <TableCell align="left">Cliente/Grupo</TableCell>
                <TableCell align="left">Resp.</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">V. 1</TableCell>
                <TableCell align="center">V. 2</TableCell>
                <TableCell align="center">V. N.</TableCell>
              </TableRow>
            </TableHeadWrapper>
            <TableBody>
              <TableRowDivider />
              {leadsData.map((lead) => (
                <React.Fragment key={lead.id}>
                  <TableRow>
                    <TableCell>
                      <Box>
                        <Typography
                          to={`/app/crm/indicate/${lead.id}/details`}
                          variant="h4"
                          component={RouterLink}
                          noWrap
                          style={{
                            color: theme.palette.primary.main,
                          }}
                        >
                          <Typography variant="h5" noWrap>
                            {lead?.code}
                          </Typography>
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell style={{ maxWidth: 160 }}>
                      <Typography variant="h4" noWrap>
                        {lead?.users?.name}
                      </Typography>
                      <Typography variant="body1" noWrap={false}>
                        <b>{formatAlias(lead?.companies[0]?.alias)}</b>
                        {" - "}
                        {lead?.companies[0]?.name}
                      </Typography>
                    </TableCell>
                    <TableCell style={{ maxWidth: 160 }}>
                      <Typography variant="body1" noWrap={false}>
                        {!lead?.clients
                          ? lead?.clientGroup?.name
                          : lead?.clients?.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="h6" noWrap={false}>
                        {lead?.customersPortfolio?.users?.user}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" style={{ maxWidth: 80 }}>
                      <Typography noWrap={false}>
                        {formatDate(lead?.info?.date)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      {lead?.leadsTypesStatusId === "NEGOCIADO" && (
                        <LabelPrimary>{lead?.leadsTypesStatusId}</LabelPrimary>
                      )}
                      {lead?.leadsTypesStatusId === "FINALIZADO" && (
                        <LabelSuccess>{lead?.leadsTypesStatusId}</LabelSuccess>
                      )}
                      {lead?.leadsTypesStatusId === "EXPIRADO" && (
                        <LabelWarning>{lead?.leadsTypesStatusId}</LabelWarning>
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <Typography variant="h6" noWrap>
                          {formatNumber(lead?.info?.volume1)}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <div>
                        <Typography variant="h6" noWrap>
                          {lead?.leadsTypesStatusId === "FINALIZADO" ? (
                            <div>
                              <Typography
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                }}
                                color="text.secondary"
                              >
                                <Typography
                                  sx={{
                                    pr: 0.5,
                                  }}
                                  component="span"
                                  variant="h6"
                                  color="text.primary"
                                >
                                  <Text color="success">
                                    {formatNumber(lead?.info?.volume2)}
                                  </Text>
                                </Typography>
                                <Text color="success">
                                  <ArrowUpwardTwoToneIcon
                                    sx={{
                                      opacity: 0.6,
                                    }}
                                  />
                                </Text>
                              </Typography>
                            </div>
                          ) : (
                            <div>
                              <Typography
                                sx={{
                                  display: "flex",
                                  justifyContent: "flex-end",
                                  alignItems: "center",
                                }}
                                color="text.secondary"
                              >
                                <Typography
                                  sx={{
                                    pr: 0.5,
                                  }}
                                  component="span"
                                  variant="h6"
                                  color="text.primary"
                                >
                                  <Text color="error">
                                    {formatNumber(lead?.info?.volume2)}
                                  </Text>
                                </Typography>
                                <Text color="error">
                                  <ArrowDownwardTwoToneIcon
                                    sx={{
                                      opacity: 0.6,
                                    }}
                                  />
                                </Text>
                              </Typography>
                            </div>
                          )}
                        </Typography>
                      </div>
                    </TableCell>
                    <TableCell align="right">
                      <div>
                        <Typography variant="h6" noWrap>
                          {formatNumber(lead?.info?.totalVolumeTraded)}
                        </Typography>
                      </div>
                    </TableCell>
                  </TableRow>
                  <TableRowDivider />
                </React.Fragment>
              ))}
            </TableBody>
          </TableWrapper>
        </TableContainer>
      </Box>
    </Card>
  );
}
