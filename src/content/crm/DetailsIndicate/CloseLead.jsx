import { useState } from "react";
import { Formik } from "formik";

import {
  styled,
  Box,
  Typography,
  CardHeader,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Grid,
  useTheme,
  Divider,
  Switch,
  alpha,
  Autocomplete,
  TextField,
  Button,
  CircularProgress,
  Card,
  IconButton,
  lighten,
} from "@mui/material";
import Label from "src/components/Label";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
import DataThresholdingIcon from "@mui/icons-material/DataThresholding";
import FilterAltOffIcon from "@mui/icons-material/FilterAltOff";
import DoNotTouchIcon from "@mui/icons-material/DoNotTouch";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone";

import api from "src/utils/api";
import { useNotification } from "src/hooks/useNotification";

const TimelineWrapper = styled(Timeline)(
  ({ theme }) => `
    margin-left: ${theme.spacing(2)};

    .MuiTimelineDot-root {
      left: -${theme.spacing(2)};
      margin-top: 0;
      top: ${theme.spacing(0.5)};
    }
    
    .MuiTimelineContent-root {
      padding-left: ${theme.spacing(4)};
    }
    
    .MuiFormControlLabel-root {
      margin-left: -${theme.spacing(0.7)};
    }
    
    .MuiFormControlLabel-label {
      color: ${theme.colors.alpha.black[50]};
    }
`
);

const CheckboxWrapper = styled(Checkbox)(
  ({ theme }) => `
    padding: ${theme.spacing(0.5)};
`
);

const SwitchSuccess = styled(Switch)(
  ({ theme }) => `
  .MuiSwitch-colorPrimary.Mui-checked + .MuiSwitch-track,
    .MuiSwitch-colorPrimary.Mui-checked .MuiSwitch-thumb {
      background: ${theme.colors.success.main};
    }
    
    .MuiSwitch-colorPrimary.Mui-checked {
      color: ${theme.colors.success.main};
    }
    
    .MuiSwitch-colorPrimary.Mui-checked:hover {
      background-color: ${alpha(theme.colors.success.main, 0.1)};
    }
`
);

const DotError = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.error.main};
    width: ${theme.spacing(1.1)};
    height: ${theme.spacing(1.1)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

const DotSuccess = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    background: ${theme.colors.success.main};
    width: ${theme.spacing(1.1)};
    height: ${theme.spacing(1.1)};
    display: inline-block;
    margin-right: ${theme.spacing(0.5)};
`
);

export const CloseLead = ({ onCancel, leadsId }) => {
  const theme = useTheme();
  const [notify] = useNotification();
  const [salesAllCompanies, setSalesAllCompanies] = useState(false);
  const [companyNotSales, setCompanyNotSales] = useState([]);
  const [reasonNotSales, setReasonNotSales] = useState([]);
  const [quantitySales, setQuantitySales] = useState([]);
  const [leadApproved, setLeadApproved] = useState(null);
  const [obs, setObs] = useState("");

  const states = ["GO", "MG", "MT", "PA", "TO"];

  const IconButtonSuccess = styled(IconButton)(
    ({ theme }) => `
        background: ${
          leadApproved === true ? theme.colors.success.lighter : "none"
        };
        color: ${theme.colors.success.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        margin: ${theme.spacing(1.5)};
  
        &:hover {
            background: ${lighten(theme.colors.success.lighter, 0.4)};
        }
  `
  );

  const IconButtonError = styled(IconButton)(
    ({ theme }) => `
        background: ${
          leadApproved === false ? theme.colors.error.lighter : "none"
        };
        color: ${theme.colors.error.main};
        width: ${theme.spacing(8)};
        height: ${theme.spacing(8)};
        margin: ${theme.spacing(1.5)};
  
        &:hover {
            background: ${lighten(theme.colors.error.lighter, 0.4)};
        }
  `
  );

  return (
    <Formik
      initialValues={{
        // denied: "",
        // obs: "",
        submit: null,
      }}
      // validationSchema={Yup.object().shape({
      //   obs: Yup.string().when("denied", {
      //     is: (denied) => denied.length === false,
      //     then: Yup.string().required("Observação é obrigatório"),
      //   }),
      //   // details: Yup.string().max(5000),
      // })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          const { data } = await api.patch(
            `/crm/leads/approveCommercial/${leadsId}`,
            {
              denied: !leadApproved,
              info: {
                obs,
                questions: [
                  {
                    id: "TODA_REDE",
                    response: salesAllCompanies,
                  },
                  {
                    id: "ESTADOS_NAO_FECHOU",
                    response: companyNotSales,
                  },
                  {
                    id: "MOTIVO",
                    response: reasonNotSales,
                  },
                  {
                    id: "VOLUME",
                    response: quantitySales,
                  },
                ],
              },
            }
          );

          resetForm();
          setStatus({ success: true });
          setSubmitting(false);

          notify(data?.msg, "success");

          onCancel();
        } catch (err) {
          console.error(err);
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Grid
            container
            spacing={0}
            sx={{
              // width: calc(30 % -"100vh"),
              width: `calc(100vw - ${theme.spacing(3)})`,
              maxWidth: 460,
            }}
          >
            <Grid item xs={12}>
              <Box
                p={4}
                sx={{
                  background: `${theme.colors.alpha.white[70]}`,
                }}
              >
                <CardHeader
                  sx={{
                    px: 0,
                    pt: 0,
                  }}
                  // title="Encerrar Indicação"
                />
                <Grid
                  item
                  xs={12}
                  sx={{
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    flexDirection: "column",
                    p: 1,
                  }}
                >
                  <Typography
                    variant="h3"
                    sx={{
                      fontSize: `${theme.typography.pxToRem(14)}`,
                    }}
                  >
                    Negocio fechado? {leadApproved === true && "Sim"}
                    {leadApproved === false && "Não"}
                  </Typography>
                  <Box py={1}>
                    <IconButtonSuccess
                      onClick={() =>
                        setLeadApproved((state) => {
                          if (state === false || state === null) return true;
                          if (state === true) return null;
                        })
                      }
                    >
                      <ThumbUpTwoToneIcon fontSize="large" />
                    </IconButtonSuccess>
                    <IconButtonError
                      onClick={() =>
                        setLeadApproved((state) => {
                          if (state === true || state === null) return false;
                          if (state === false) return null;
                        })
                      }
                    >
                      <ThumbDownTwoToneIcon fontSize="large" />
                    </IconButtonError>
                  </Box>

                  {leadApproved === false && (
                    <TextField
                      sx={{
                        mt: 2,
                        mb: 1,
                        // p: 6,
                      }}
                      multiline
                      rows={4}
                      fullWidth
                      value={obs}
                      onChange={(e) => setObs(e.target.value)}
                      placeholder="Observação..."
                    />
                  )}

                  {leadApproved && (
                    <TimelineWrapper>
                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="primary">
                            <FilterAltIcon />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography
                            variant="h4"
                            sx={{
                              pb: 2,
                            }}
                          >
                            Irá abastecer em todas unidades?
                          </Typography>
                          <Box display="flex">
                            {salesAllCompanies ? (
                              <Label color="success">
                                <DotSuccess />
                                Sim
                              </Label>
                            ) : (
                              <Label color="error">
                                <DotError />
                                Não
                              </Label>
                            )}
                            <Divider
                              sx={{
                                mx: 2,
                              }}
                              orientation="vertical"
                              flexItem
                            />
                            <SwitchSuccess
                              checked={salesAllCompanies}
                              onChange={() =>
                                setSalesAllCompanies((prevState) => !prevState)
                              }
                              color="primary"
                              name="server"
                            />
                          </Box>
                        </TimelineContent>
                      </TimelineItem>
                      {salesAllCompanies === false && (
                        <>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary">
                                <FilterAltOffIcon />
                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="h4"
                                sx={{
                                  pb: 2,
                                }}
                              >
                                Quais estados não irá Abastecer?
                              </Typography>
                              <Autocomplete
                                multiple
                                fullWidth
                                limitTags={2}
                                options={states}
                                getOptionLabel={(option) => option}
                                onChange={(e, value) => {
                                  setCompanyNotSales(value);
                                }}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    fullWidth
                                    variant="outlined"
                                    label="Estados"
                                    placeholder="Selecione um ou mais estados..."
                                  />
                                )}
                              />
                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary">
                                <DoNotTouchIcon />
                              </TimelineDot>
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Typography
                                variant="h4"
                                sx={{
                                  pb: 2,
                                }}
                              >
                                Motivo que impediu de negociar para todos
                                estados?
                              </Typography>
                              <FormGroup>
                                <FormControlLabel
                                  onChange={(e, value) => {
                                    setReasonNotSales((prevState) =>
                                      value
                                        ? [...prevState, e.target.name]
                                        : [
                                            ...prevState.filter(
                                              (item) => item !== e.target.name
                                            ),
                                          ]
                                    );
                                  }}
                                  control={
                                    <CheckboxWrapper
                                      color="primary"
                                      name="PRECO"
                                    />
                                  }
                                  label="Preço"
                                />
                                <FormControlLabel
                                  onChange={(e, value) => {
                                    setReasonNotSales((prevState) =>
                                      value
                                        ? [...prevState, e.target.name]
                                        : [
                                            ...prevState.filter(
                                              (item) => item !== e.target.name
                                            ),
                                          ]
                                    );
                                  }}
                                  control={
                                    <CheckboxWrapper
                                      color="primary"
                                      name="ROTA"
                                    />
                                  }
                                  label="Rota"
                                />
                                <FormControlLabel
                                  onChange={(e, value) => {
                                    setReasonNotSales((prevState) =>
                                      value
                                        ? [...prevState, e.target.name]
                                        : [
                                            ...prevState.filter(
                                              (item) => item !== e.target.name
                                            ),
                                          ]
                                    );
                                  }}
                                  control={
                                    <CheckboxWrapper
                                      color="primary"
                                      name="SERASA"
                                    />
                                  }
                                  label="Serasa"
                                />
                                <FormControlLabel
                                  onChange={(e, value) => {
                                    setReasonNotSales((prevState) =>
                                      value
                                        ? [...prevState, e.target.name]
                                        : [
                                            ...prevState.filter(
                                              (item) => item !== e.target.name
                                            ),
                                          ]
                                    );
                                  }}
                                  control={
                                    <CheckboxWrapper
                                      color="primary"
                                      name="PRAZO"
                                    />
                                  }
                                  label="Prazo"
                                />
                                <FormControlLabel
                                  onChange={(e, value) => {
                                    setReasonNotSales((prevState) =>
                                      value
                                        ? [...prevState, e.target.name]
                                        : [
                                            ...prevState.filter(
                                              (item) => item !== e.target.name
                                            ),
                                          ]
                                    );
                                  }}
                                  control={
                                    <CheckboxWrapper
                                      color="primary"
                                      name="FORMA DE PGTO"
                                    />
                                  }
                                  label="Forma de pagamento"
                                />
                              </FormGroup>
                            </TimelineContent>
                          </TimelineItem>
                        </>
                      )}

                      <TimelineItem>
                        <TimelineSeparator>
                          <TimelineDot color="primary">
                            <DataThresholdingIcon />
                          </TimelineDot>
                          <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                          <Typography
                            variant="h4"
                            sx={{
                              pb: 2,
                            }}
                          >
                            Volume esperado?
                          </Typography>

                          <Grid container spacing={1}>
                            {!salesAllCompanies &&
                              states
                                .filter(
                                  (item) => !companyNotSales.includes(item)
                                )
                                .map((state) => {
                                  return (
                                    <Grid item xs={12} sm={6} key={state}>
                                      <TextField
                                        size="small"
                                        onChange={(e) => {
                                          setQuantitySales((prevState) => [
                                            ...prevState.filter(
                                              (item) => item.state !== state
                                            ),
                                            {
                                              state: state,
                                              qtd: Number(
                                                e.target.value.replace(
                                                  /[^0-9]/g,
                                                  ""
                                                )
                                              ),
                                            },
                                          ]);
                                        }}
                                        value={
                                          quantitySales.filter(
                                            (item) => item.state === state
                                          )[0]?.qtd || ""
                                        }
                                        variant="outlined"
                                        placeholder={state}
                                      />
                                    </Grid>
                                  );
                                })}

                            <Grid item xs={12} sm={6}>
                              <TextField
                                size="small"
                                onChange={(e) => {
                                  setQuantitySales((prevState) => [
                                    ...prevState.filter(
                                      (item) => item.state !== "REDE"
                                    ),
                                    {
                                      state: "REDE",
                                      qtd: Number(
                                        e.target.value.replace(/[^0-9]/g, "")
                                      ),
                                    },
                                  ]);
                                }}
                                value={
                                  quantitySales.filter(
                                    (item) => item.state === "REDE"
                                  )[0]?.qtd || ""
                                }
                                variant="outlined"
                                placeholder="Rede"
                              />
                            </Grid>
                          </Grid>
                        </TimelineContent>
                      </TimelineItem>
                    </TimelineWrapper>
                  )}
                </Grid>

                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    p: 2,
                  }}
                  elevation={0}
                >
                  {leadApproved !== null && (
                    <Box>
                      <Button
                        variant="outlined"
                        onClick={onCancel}
                        color="primary"
                        sx={{ mr: 2 }}
                      >
                        Cancelar
                      </Button>
                      <Button
                        variant="contained"
                        type="submit"
                        startIcon={
                          isSubmitting ? <CircularProgress size="1rem" /> : null
                        }
                        disabled={isSubmitting}
                        color="primary"
                      >
                        Salvar
                      </Button>
                    </Box>
                  )}
                </Card>
              </Box>
            </Grid>
          </Grid>
        </form>
      )}
    </Formik>
  );
};
