import { useState, forwardRef } from "react";
import * as Yup from "yup";
import { Formik } from "formik";
import {
  Box,
  Card,
  TextField,
  Typography,
  Container,
  Alert,
  Slide,
  Dialog,
  Collapse,
  Button,
  Avatar,
  IconButton,
  styled,
  CircularProgress,
} from "@mui/material";
import { Helmet } from "react-helmet-async";

import useRefMounted from "src/hooks/useRefMounted";
import CloseIcon from "@mui/icons-material/Close";

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import api from "src/utils/api";
import { Navigate, useLocation } from "react-router";
import { useNotification } from "src/hooks/useNotification";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

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

const DialogWrapper = styled(Dialog)(
  () => `
      .MuiDialog-paper {
        overflow: visible;
      }
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      top: -${theme.spacing(6)};
      position: absolute;
      left: 50%;
      margin-left: -${theme.spacing(6)};

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

function RecoverPasswordBasic() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [notify] = useNotification();
  const { search } = useLocation();
  const user = search.split("=")[1];

  const isMountedRef = useRefMounted();

  const [openAlert, setOpenAlert] = useState(true);

  const [openDialog, setOpenDialog] = useState(false);

  // const handleOpenDialog = () => {
  //   setOpenDialog(true);
  // };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <>
      {shouldRedirect && <Navigate replace to="/" />}
      <Helmet>
        <title>Trocar senha - Smart Posto</title>
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
                Obrigatório a troca de senha!
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3,
                }}
              >
                Necessário que você informe uma nova senha por questões de
                segurança.
              </Typography>
            </Box>

            <Formik
              initialValues={{
                password: "",
                passwordConfirmation: "",
                submit: null,
              }}
              validationSchema={Yup.object().shape({
                password: Yup.string()
                  .min(6, "A senha deve ter pelo menos 6 caracteres")
                  .required("Senha é obrigatória."),
                passwordConfirmation: Yup.string()
                  .required("Senha é obrigatória.")
                  .oneOf(
                    [Yup.ref("password"), null],
                    "As senhas devem ser iguais"
                  ),
              })}
              onSubmit={async (
                values,
                { setErrors, setStatus, setSubmitting }
              ) => {
                try {
                  const { data } = await api.post(
                    "/config/users/changePass",
                    {
                      user: user,
                      newPass: values.passwordConfirmation,
                    },
                    {
                      headers: {
                        "x-key":
                          "@s8e!HgI!ySek$CIJw6Ys$EZJ0o@ZP4dHnP2o33%C9E9TkE%wr",
                      },
                    }
                  );

                  notify(data.msg, "success");

                  if (isMountedRef.current) {
                    setStatus({ success: true });
                    setSubmitting(false);
                  }

                  setShouldRedirect(true);
                } catch (err) {
                  console.error(err);
                  console.error(err.response.data.msg);
                  if (isMountedRef.current) {
                    setStatus({ success: false });
                    setErrors({ submit: err.message });
                    setSubmitting(false);
                  }
                }
              }}
            >
              {({
                errors,
                handleBlur,
                handleChange,
                handleSubmit,
                isSubmitting,
                touched,
                values,
              }) => (
                <form noValidate onSubmit={handleSubmit}>
                  <TextField
                    error={Boolean(touched.password && errors.password)}
                    fullWidth
                    helperText={touched.password && errors.password}
                    label="Senha"
                    margin="normal"
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.password}
                    variant="outlined"
                  />

                  <TextField
                    error={Boolean(
                      touched.passwordConfirmation &&
                        errors.passwordConfirmation
                    )}
                    fullWidth
                    helperText={
                      touched.passwordConfirmation &&
                      errors.passwordConfirmation
                    }
                    label="Confirme a senha"
                    margin="normal"
                    name="passwordConfirmation"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="password"
                    value={values.passwordConfirmation}
                    variant="outlined"
                  />

                  <Button
                    sx={{
                      mt: 3,
                    }}
                    color="primary"
                    disabled={
                      Boolean(
                        touched.passwordConfirmation &&
                          errors.passwordConfirmation
                      ) || isSubmitting
                    }
                    startIcon={
                      isSubmitting ? <CircularProgress size="1rem" /> : null
                    }
                    // disabled={isSubmitting}
                    // onClick={handleOpenDialog}
                    type="submit"
                    fullWidth
                    size="large"
                    variant="contained"
                  >
                    Trocar a Senha
                  </Button>
                </form>
              )}
            </Formik>
          </Card>
        </Container>
      </MainContent>
      <DialogWrapper
        open={openDialog}
        maxWidth="sm"
        fullWidth
        TransitionComponent={Transition}
        keepMounted
        onClose={handleCloseDialog}
      >
        <Box
          sx={{
            px: 4,
            pb: 4,
            pt: 10,
          }}
        >
          <AvatarSuccess>
            <CheckTwoToneIcon />
          </AvatarSuccess>

          <Collapse in={openAlert}>
            <Alert
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setOpenAlert(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              }
              severity="info"
            >
              As instruções de redefinição de senha foram enviadas para seu
              e-mail
            </Alert>
          </Collapse>

          <Typography
            align="center"
            sx={{
              py: 4,
              px: 10,
            }}
            variant="h3"
          >
            Verifique seu e-mail para mais instruções
          </Typography>

          <Button
            fullWidth
            size="large"
            variant="contained"
            onClick={handleCloseDialog}
            href="/"
          >
            Continuar a fazer login
          </Button>
        </Box>
      </DialogWrapper>
    </>
  );
}

export default RecoverPasswordBasic;
