import { useEffect, useState } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Autocomplete,
  Box,
  Button,
  Card,
  CircularProgress,
  Grid,
  TextField,
} from "@mui/material";

import { Helmet } from "react-helmet-async";

import { PageHeaderIndicate } from "./PageHeaderIndicate";

import useRefMounted from "src/hooks/useRefMounted";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";
import * as _ from "lodash";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import api from "src/utils/api";
import Footer from "src/components/Footer";
import { useNotification } from "src/hooks/useNotification";
import { DocumentsAttachment } from "src/components/DocumentsAttachment";
import { formatAlias } from "src/utils/formatAlias";
import { LinearProgressWithLabel } from "src/components/LinearProgressWithLabel";
import { empty } from "src/utils/empty";

function Indicate() {
  const isMountedRef = useRefMounted();
  const [notify] = useNotification();
  const [documents, setDocuments] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [progress, setProgress] = useState(0);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const { debounce } = _;

  useEffect(() => {
    async function getCompanies() {
      const { data } = await api.get("info/companies?onlyAllowed=true");

      setCompanies(
        data?.companies?.map((company) => {
          return {
            label: `${formatAlias(company.alias)} - ${company.name}`,
            value: company.id,
          };
        })
      );
    }
    getCompanies();
  }, []);

  const _loadSuggestions = async (query) => {
    setLoading(true);
    setOpen(true);

    try {
      const { data } = await api.get("/info/clients", {
        params: {
          search: query.replace(/[.\-/]/g, ""),
        },
      });

      setOptions(data?.clients);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestions = debounce(_loadSuggestions, 750);

  async function getClienteByIdentifier(identifier) {
    const response = await api.get("/info/clients", {
      params: {
        search: identifier.replace(/[.\-/]/g, "").toString(),
      },
    });

    return response?.data?.clients;
  }

  async function getContactCliente(clientId) {
    const response = await api.get("/info/clientContacts", {
      params: {
        clientId,
      },
    });

    return response?.data?.clientContacts;
  }

  return (
    <Formik
      initialValues={{
        companies: "",
        companiesName: "",
        identifier: "",
        enterpriseName: "",
        enterpriseNameInput: "",
        clientId: "",
        fone: "",
        obs: "",
      }}
      validationSchema={Yup.object().shape({
        companies: Yup.string().required("O campo filial é obrigatório"),
        identifier: Yup.string()
          .min(11, "Deve ter ao menos 11 dígitos")
          .max(14, "Não pode exceder 14 dígitos"),
        enterpriseName: Yup.string().max(255),
        fone: Yup.string().max(14),
        obs: Yup.string().max(255),
      })}
      onSubmit={async (
        values,
        { setErrors, setStatus, setSubmitting, resetForm, setFieldValue }
      ) => {
        try {
          const dataSend = new FormData();

          documents.forEach((file) => {
            dataSend.append("file", file, file.name);
          });

          dataSend.append("companyIds", [values.companies]);
          dataSend.append("identifier", values.identifier);
          dataSend.append("enterpriseName", values.enterpriseName);
          dataSend.append("obs", values.obs);

          if (!empty(values.clientId) && empty(values.fone)) {
            const data = await getContactCliente(values.clientId);

            dataSend.append(
              "fone",
              data
                .filter(
                  (contact) =>
                    contact.clientContactsTypesStatusId === "TELEFONE"
                )
                .shift()?.content
            );
          } else {
            dataSend.append("fone", values.fone);
          }
          const { data } = await api.post("/crm/leads", dataSend, {
            onUploadProgress: (e) => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));

              setProgress(progress);
            },
          });

          notify(data?.msg, "success");

          resetForm();
          setDocuments([]);
          setFieldValue("companiesName", "");
          setFieldValue("enterpriseNameInput", "");
          setFieldValue("enterpriseName", "");

          if (isMountedRef.current) {
            setStatus({ success: true });
            setSubmitting(false);
          }
        } catch (err) {
          console.error(err);

          if (isMountedRef.current) {
            setStatus({ success: false });
            setErrors({ submit: err.response.data.msg });
            setSubmitting(false);
          }
        } finally {
          setProgress(0);
        }
      }}
    >
      {({
        errors,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        isSubmitting,
        touched,
        values,
      }) => {
        return (
          <form noValidate onSubmit={handleSubmit}>
            <Helmet>
              <title>CRM Indicações - Smart Posto</title>
            </Helmet>
            <PageTitleWrapper>
              <PageHeaderIndicate />
            </PageTitleWrapper>
            <Grid
              sx={{
                px: 4,
              }}
              container
              direction="row"
              // justifyContent="center"
              justifyContent="space-between"
              alignItems="stretch"
              spacing={3}
            >
              <Grid item md={7} xs={12}>
                <Card
                  sx={{
                    p: 3,
                  }}
                >
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Box pb={1}>
                        <b>Filial:</b>
                      </Box>
                      <Autocomplete
                        // name="companies"
                        disablePortal
                        isOptionEqualToValue={(option, value) =>
                          option.id === value.id
                        }
                        value={values.companiesName}
                        options={companies}
                        onChange={(e, value) => {
                          if (value === null) {
                            setFieldValue("companies", "");
                            setFieldValue("companiesName", "");
                            return;
                          }

                          setFieldValue("companies", value.value);
                          setFieldValue("companiesName", value.label);
                        }}
                        renderInput={(params) => (
                          <TextField
                            fullWidth
                            name="companies"
                            {...params}
                            label="Filial"
                            value={values.companies}
                            error={Boolean(
                              touched.companies && errors.companies
                            )}
                            helperText={touched.companies && errors.companies}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box pb={1}>
                        <b>CNPJ/CPF:</b>
                      </Box>
                      <TextField
                        error={Boolean(touched.identifier && errors.identifier)}
                        helperText={touched.identifier && errors.identifier}
                        fullWidth
                        autoComplete="off"
                        name="identifier"
                        placeholder="Digite aqui o CNPJ..."
                        variant="outlined"
                        // onBlur={handleBlur}
                        onBlur={async (e) => {
                          if ([11, 14].includes(e.target.value.length)) {
                            const data = await getClienteByIdentifier(
                              e.target.value
                            );

                            if (data.length > 0) {
                              setFieldValue("enterpriseName", data[0]?.name);
                              setFieldValue("clientId", data[0]?.value);
                            }
                          }
                          handleBlur("identifier", e);
                        }}
                        onChange={(e) => {
                          setFieldValue(
                            "identifier",
                            e.target.value.replace(/\D/g, "").substring(0, 14)
                          );
                          // handleChange(e);
                        }}
                        value={values.identifier}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Box pb={1}>
                        <b>Nome da empresa:</b>
                      </Box>

                      <Autocomplete
                        id="searchClient"
                        loadingText="Carregando..."
                        noOptionsText="Não há dados..."
                        name="enterpriseName"
                        inputValue={values.enterpriseName}
                        open={open}
                        freeSolo
                        onOpen={() => {
                          setOpen(true);
                        }}
                        onClose={() => {
                          setOpen(false);
                        }}
                        isOptionEqualToValue={(option, value) =>
                          option.label === value.label
                        }
                        getOptionLabel={(option) => option.label}
                        options={options}
                        loading={loading}
                        // disabled={
                        //   lead.clients !== null && lead.clientGroup !== null
                        // }
                        onChange={(event, value) => {
                          if (value === "" || value === null) {
                            return;
                          }

                          setFieldValue("enterpriseName", value.name);
                          setFieldValue("identifier", value.identifier);
                          setFieldValue("clientId", value.value);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            placeholder="Digite aqui o nome da empresa..."
                            fullWidth
                            name="enterpriseNameInput"
                            value={values.enterpriseNameInput}
                            onChange={(ev) => {
                              if (
                                ev.target.value !== "" ||
                                ev.target.value !== null
                              ) {
                                setFieldValue(
                                  "enterpriseName",
                                  ev.target.value
                                );

                                loadSuggestions(ev.target.value);
                              }
                            }}
                            InputProps={{
                              ...params.InputProps,
                              endAdornment: (
                                <>
                                  {loading ? (
                                    <CircularProgress
                                      color="inherit"
                                      size={20}
                                    />
                                  ) : null}
                                  {params.InputProps.endAdornment}
                                </>
                              ),
                            }}
                          />
                        )}
                        renderOption={(props, option, { inputValue }) => {
                          const matches = match(option.label, inputValue);
                          const parts = parse(option.label, matches);
                          return (
                            <li {...props}>
                              <div>
                                {parts.map((part, index) => (
                                  <span
                                    key={index}
                                    style={{
                                      fontWeight: part.highlight ? 700 : 400,
                                      backgroundColor: part.highlight
                                        ? "yellow"
                                        : "#fff",
                                    }}
                                  >
                                    {part.text}
                                  </span>
                                ))}
                              </div>
                            </li>
                          );
                        }}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box pb={1}>
                        <b>Telefone:</b>
                      </Box>
                      <TextField
                        error={Boolean(touched.fone && errors.fone)}
                        helperText={touched.fone && errors.fone}
                        fullWidth
                        name="fone"
                        autoComplete="off"
                        placeholder="Digite aqui o Telefone..."
                        variant="outlined"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.fone}
                      />
                    </Grid>
                    <Grid item md={6} xs={12}>
                      <Box pb={1}>
                        <b>OBS.:</b>
                      </Box>
                      <TextField
                        error={Boolean(touched.obs && errors.obs)}
                        helperText={touched.obs && errors.obs}
                        fullWidth
                        name="obs"
                        autoComplete="off"
                        placeholder="Digite aqui uma observação"
                        variant="outlined"
                        multiline
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.obs}
                      />
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
              <Grid item md={5} xs={12}>
                <>
                  <DocumentsAttachment
                    setDocuments={setDocuments}
                    documents={documents}
                  />
                  {isSubmitting ? (
                    <Box mt={4} sx={{ width: "100%" }}>
                      <LinearProgressWithLabel value={progress} />
                    </Box>
                  ) : (
                    <Button
                      sx={{
                        mt: 3,
                      }}
                      color="primary"
                      startIcon={
                        isSubmitting ? <CircularProgress size="1rem" /> : null
                      }
                      disabled={isSubmitting}
                      type="submit"
                      fullWidth
                      size="large"
                      variant="contained"
                    >
                      Enviar
                    </Button>
                  )}
                </>
              </Grid>
            </Grid>
            <Footer />
          </form>
        );
      }}
    </Formik>
  );
}

export default Indicate;
