import { Fragment, useEffect, useState } from "react";

import {
  alpha,
  Box,
  Card,
  Divider,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import LaunchTwoToneIcon from "@mui/icons-material/LaunchTwoTone";
import api from "src/utils/api";
import { formatDate } from "src/utils/formatDate";
import SuspenseLoader from "src/components/SuspenseLoader";
import { formatFone } from "src/utils/formatFone";

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

const LabelFinalizado = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.colors.success.light};
    color: ${theme.colors.success.dark};

    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelError = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.colors.error.lighter};
    color: ${theme.colors.error.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelComercial = styled(Box)(
  ({ theme }) => `
    display: inline-block;

    background: ${theme.colors.secondary.lighter};
    color: ${theme.colors.secondary.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelPendente = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.colors.warning.lighter};
    color: ${theme.colors.warning.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelCadastro = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.colors.success.lighter};
    color: ${theme.colors.success.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelNegociado = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.colors.primary.lighter};
    color: ${theme.colors.primary.main};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const LabelOutros = styled(Box)(
  ({ theme }) => `
    display: inline-block;
    background: ${theme.colors.warning.light};
    color: ${theme.colors.warning.dark};
    text-transform: uppercase;
    font-size: ${theme.typography.pxToRem(11)};
    font-weight: bold;
    padding: ${theme.spacing(1, 2)};
    border-radius: ${theme.general.borderRadiusSm};
  `
);

const TableRowDivider = styled(TableRow)(
  ({ theme }) => `
    height: ${theme.spacing(2)};
  `
);

const IconButtonWrapper = styled(IconButton)(
  ({ theme }) => `
    transition: ${theme.transitions.create(["transform", "background"])};
    transform: scale(1);
    transform-origin: center;

    &:hover {
        transform: scale(1.1);
    }
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

export function TableIndicate() {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [indicateData, setIndicateData] = useState([]);
  const [load, setLoad] = useState(true);

  const handleChangePage = (_event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    async function getIndicate() {
      try {
        const { data } = await api.get("/cadastro/leads", {
          params: {
            status: "CADASTRO",
          },
        });

        setIndicateData(data.leads);
      } catch (err) {
        console.error(err);
      } finally {
        setLoad(false);
      }
    }
    getIndicate();
  }, []);

  if (load) {
    return <SuspenseLoader />;
  }

  return (
    <Card variant="outlined">
      <Divider />
      <Box px={3} pb={3}>
        <TableContainer>
          <TableWrapper>
            <TableHeadWrapper>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell align="left">Empresa</TableCell>
                {/* <TableCell align="left">Imagem</TableCell> */}
                <TableCell align="center">CNPJ/CPF</TableCell>
                <TableCell align="center">Fone</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="center">Data</TableCell>
                <TableCell align="right">Visualizar</TableCell>
              </TableRow>
            </TableHeadWrapper>
            <TableBody>
              {indicateData.map((item) => {
                return (
                  <Fragment key={item.id}>
                    <TableRow hover>
                      <TableCell>
                        <Box>
                          <Typography variant="h4">{`#${item.code}`}</Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body1" noWrap={false}>
                          {item?.enterpriseName || "Não informado"}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box pl={1}>
                            <Typography
                              color="text.primary"
                              variant="h5"
                              noWrap
                            >
                              {item.identifier || "Não informado"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <Box pl={1}>
                            <Typography
                              color="text.primary"
                              variant="h5"
                              noWrap
                            >
                              {formatFone(item.fone) || "Não informado"}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell align="center">
                        {item?.leadsTypesStatusId === "NEGOCIADO" && (
                          <LabelNegociado>
                            {item?.leadsTypesStatusId}
                          </LabelNegociado>
                        )}

                        {[
                          "NEGADO",
                          "CADASTRO NEGADO",
                          "PERDA COMERCIAL",
                        ].includes(item?.leadsTypesStatusId) && (
                          <LabelError>{item?.leadsTypesStatusId}</LabelError>
                        )}
                        {item?.leadsTypesStatusId === "PENDENTE" && (
                          <LabelPendente>
                            {item?.leadsTypesStatusId}
                          </LabelPendente>
                        )}
                        {item?.leadsTypesStatusId === "FINALIZADO" && (
                          <LabelFinalizado>
                            {item?.leadsTypesStatusId}
                          </LabelFinalizado>
                        )}
                        {item?.leadsTypesStatusId === "CADASTRO" && (
                          <LabelCadastro>
                            {item?.leadsTypesStatusId}
                          </LabelCadastro>
                        )}
                        {item?.leadsTypesStatusId === "COMERCIAL" && (
                          <LabelComercial>
                            {item?.leadsTypesStatusId}
                          </LabelComercial>
                        )}
                        {[
                          "EM ANDAMENTO",
                          "ENCAMINHADO",
                          "EXPIRADO",
                          "PAUSADO",
                        ].includes(item?.leadsTypesStatusId) && (
                          <LabelOutros>{item?.leadsTypesStatusId}</LabelOutros>
                        )}
                      </TableCell>
                      <TableCell align="center">
                        <div>
                          <Typography
                            sx={{
                              pr: 0.5,
                            }}
                            component="span"
                            variant="h4"
                            color="text.primary"
                          >
                            {formatDate(item.createdAt)}
                          </Typography>
                        </div>
                      </TableCell>
                      <TableCell
                        sx={{
                          whiteSpace: "nowrap",
                        }}
                        align="right"
                      >
                        <Box>
                          <Tooltip title="Visualizar" arrow>
                            <IconButtonWrapper
                              sx={{
                                backgroundColor: `${theme.colors.primary.lighter}`,
                                color: `${theme.colors.primary.main}`,
                                transition: `${theme.transitions.create([
                                  "all",
                                ])}`,

                                "&:hover": {
                                  backgroundColor: `${theme.colors.primary.main}`,
                                  color: `${theme.palette.getContrastText(
                                    theme.colors.primary.main
                                  )}`,
                                },
                              }}
                              to={`/app/credit/indicate/${item.id}/details`}
                              component={RouterLink}
                            >
                              <LaunchTwoToneIcon fontSize="small" />
                            </IconButtonWrapper>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                    <TableRowDivider />
                  </Fragment>
                );
              })}
            </TableBody>
          </TableWrapper>
        </TableContainer>
        <Box pt={1} display="flex" justifyContent="flex-end">
          <TablePagination
            component="div"
            count={100}
            page={page}
            labelRowsPerPage="Linhas por página:"
            labelDisplayedRows={({ from, to, count }) => {
              return "" + from + "-" + to + " de " + count;
            }}
            onPageChange={handleChangePage}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Box>
      </Box>
    </Card>
  );
}
