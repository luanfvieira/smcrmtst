import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Formik } from "formik";

import {
  Box,
  Card,
  TextField,
  Button,
  Divider,
  Typography,
  Autocomplete,
} from "@mui/material";

import api from "src/utils/api";
import { useNotification } from "src/hooks/useNotification";
import { DocumentsAttachment } from "src/components/DocumentsAttachment";
import { LinearProgressWithLabel } from "src/components/LinearProgressWithLabel";
import TextMentions from "src/components/TextMentions";
// import TextMentions from "src/components/TextMentions";

export const AddActions = ({ onCancel, leadsId }) => {
  const [notify] = useNotification();

  const [documents, setDocuments] = useState([]);
  const [typeStatus, setTypeStatus] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function getTypesStatus() {
      try {
        const { data } = await api.get("/info/actionsTypesStatus");

        setTypeStatus(
          data.actionsTypesStatus.map((type) => {
            return {
              value: type.id,
              label: type.id,
            };
          })
        );
      } catch (error) {
        console.error(error);
      } finally {
        setProgress(0);
      }
    }

    getTypesStatus();
  }, []);

  return (
    <Formik
      initialValues={{
        details: "",
        type: "",
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        type: Yup.string().max(255).required("O campo tipo é obrigatório"),
        details: Yup.string().max(5000),
      })}
      onSubmit={async (
        values,
        { resetForm, setErrors, setStatus, setSubmitting }
      ) => {
        try {
          const dataSend = new FormData();

          documents.forEach((file) => {
            dataSend.append("file", file, file.name);
          });

          dataSend.append("leadsId", leadsId);
          dataSend.append("type", values.type);
          dataSend.append("obs", values.details);

          const { data } = await api.post("/crm/actions", dataSend, {
            onUploadProgress: (e) => {
              const progress = parseInt(Math.round((e.loaded * 100) / e.total));

              setProgress(progress);
            },
          });

          setDocuments([]);
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);

          notify(data.msg, "success");

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
        // handleBlur,
        handleChange,
        handleSubmit,
        isSubmitting,
        setFieldValue,
        touched,
        values,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box p={3}>
            <Typography variant="h4">Criar nova interação</Typography>
          </Box>
          <Divider />
          <Box px={3} py={2}>
            <Autocomplete
              // name="companies"
              disablePortal
              isOptionEqualToValue={(option, value) => option.id === value.id}
              options={typeStatus}
              onChange={(e, value) => {
                setFieldValue("type", value.value);
              }}
              renderInput={(params) => (
                <TextField
                  fullWidth
                  name="type"
                  {...params}
                  label="Tipo de contato"
                  value={values.type}
                  error={Boolean(touched.type && errors.type)}
                  helperText={touched.type && errors.type}
                />
              )}
            />
            {/* <TextField
              error={Boolean(touched.details && errors.details)}
              fullWidth
              multiline
              minRows={3}
              helperText={touched.details && errors.details}
              label="Detalhes"
              name="details"
              margin="normal"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.details}
              variant="outlined"
            /> */}

            <div style={{ marginTop: 8, marginBottom: 8, maxWidth: 480 }}>
              <TextMentions handleChange={setFieldValue} />
            </div>

            <DocumentsAttachment
              setDocuments={setDocuments}
              documents={documents}
            />
          </Box>
          <Card
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
            elevation={0}
          >
            <Box></Box>

            {isSubmitting ? (
              <Box p={2} sx={{ width: "100%" }}>
                <LinearProgressWithLabel value={progress} />
              </Box>
            ) : (
              <Box>
                <Button
                  variant="outlined"
                  sx={{
                    mr: 1,
                  }}
                  color="secondary"
                  onClick={onCancel}
                >
                  Cancelar
                </Button>
                <Button
                  color="primary"
                  disabled={isSubmitting}
                  type="submit"
                  size="large"
                  variant="contained"
                >
                  Enviar
                </Button>
              </Box>
            )}
          </Card>
        </form>
      )}
    </Formik>
  );
};

AddActions.propTypes = {
  onCancel: PropTypes.func,
  leadsId: PropTypes.string,
};

AddActions.defaultProps = {
  onCancel: () => {},
};
