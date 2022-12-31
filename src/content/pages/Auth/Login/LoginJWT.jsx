import * as Yup from "yup";

import { Formik } from "formik";
import { Link as RouterLink } from "react-router-dom";

import { Box, Button, TextField, CircularProgress, Link } from "@mui/material";
import useAuth from "src/hooks/useAuth";
import useRefMounted from "src/hooks/useRefMounted";

const LoginJWT = () => {
  const { login } = useAuth();
  const isMountedRef = useRefMounted();

  return (
    <Formik
      initialValues={{
        user: process.env.NODE_ENV === "development" ? "admin" : "",
        password: process.env.NODE_ENV === "development" ? "berggg" : "",
      }}
      validationSchema={Yup.object().shape({
        user: Yup.string()
          .max(255)
          .required("O campo de usuário é obrigatório"),
        password: Yup.string()
          .max(255)
          .required("O campo de senha é obrigatório"),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login(values.user, values.password);

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
            error={Boolean(touched.user && errors.user)}
            fullWidth
            margin="normal"
            autoFocus
            helperText={touched.user && errors.user}
            label="Usuário"
            name="user"
            onBlur={handleBlur}
            onChange={handleChange}
            type="user"
            value={values.user}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            margin="normal"
            helperText={touched.password && errors.password}
            label="Senha"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
            variant="outlined"
          />
          <Box
            alignItems="center"
            display={{ xs: "block", md: "flex" }}
            justifyContent="space-between"
          >
            <Link component={RouterLink} to="/recover-password">
              <b>Esqueceu sua senha?</b>
            </Link>
          </Box>

          <Button
            sx={{
              mt: 3,
            }}
            color="primary"
            startIcon={isSubmitting ? <CircularProgress size="1rem" /> : null}
            disabled={isSubmitting}
            type="submit"
            fullWidth
            size="large"
            variant="contained"
          >
            Entrar
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
