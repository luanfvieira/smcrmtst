import { useState, Children } from "react";
import {
  Typography,
  Container,
  Button,
  Card,
  CircularProgress,
  Grid,
  Box,
  Step,
  StepLabel,
  Stepper,
  Link,
  Collapse,
  Alert,
  Avatar,
  IconButton,
  styled,
} from "@mui/material";
import { Field, Form, Formik } from "formik";
import { CheckboxWithLabel, TextField } from "formik-mui";
import * as Yup from "yup";
import CloseIcon from "@mui/icons-material/Close";
import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";

import { Helmet } from "react-helmet-async";
import Logo from "src/components/LogoSign";

const MainContent = styled(Box)(
  () => `
    height: 100%;
    overflow: auto;
    flex: 1;
`
);

const BoxActions = styled(Box)(
  ({ theme }) => `
    background: ${theme.colors.alpha.black[5]}
`
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.main};
      color: ${theme.palette.success.contrastText};
      width: ${theme.spacing(12)};
      height: ${theme.spacing(12)};
      box-shadow: ${theme.colors.shadows.success};
      margin-left: auto;
      margin-right: auto;

      .MuiSvgIcon-root {
        font-size: ${theme.typography.pxToRem(45)};
      }
`
);

const sleep = (time) => new Promise((acc) => setTimeout(acc, time));

function RegisterWizard() {
  const [openAlert, setOpenAlert] = useState(true);

  return (
    <>
      <Helmet>
        <title>Register - Wizard</title>
      </Helmet>
      <MainContent>
        <Container
          sx={{
            my: 4,
          }}
          maxWidth="md"
        >
          <Logo />
          <Card
            sx={{
              mt: 3,
              pt: 4,
            }}
          >
            <Box px={4}>
              <Typography
                variant="h2"
                sx={{
                  mb: 1,
                }}
              >
                Create account
              </Typography>
              <Typography
                variant="h4"
                color="text.secondary"
                fontWeight="normal"
                sx={{
                  mb: 3,
                }}
              >
                Fill in the fields below to sign up for an account.
              </Typography>
            </Box>

            <FormikStepper
              initialValues={{
                first_name: "",
                last_name: "",
                terms: true,
                promo: true,
                password: "",
                password_confirm: "",
                email: "",
                phone: "",
                company_name: "",
                company_size: "",
                company_role: "",
              }}
              onSubmit={async () => {
                await sleep(3000);
              }}
            >
              <FormikStep
                validationSchema={Yup.object().shape({
                  email: Yup.string()
                    .email("The email provided should be a valid email address")
                    .max(255)
                    .required("The email field is required"),
                  first_name: Yup.string()
                    .max(255)
                    .required("The first name field is required"),
                  last_name: Yup.string()
                    .max(255)
                    .required("The first name field is required"),
                  password: Yup.string()
                    .min(8)
                    .max(255)
                    .required("The password field is required"),
                  password_confirm: Yup.string()
                    .oneOf(
                      [Yup.ref("password")],
                      "Both password fields need to be the same"
                    )
                    .required("This field is required"),
                })}
                label={"Personal Informations"}
              >
                <Box p={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="first_name"
                        component={TextField}
                        label="First name"
                        placeholder="Write your first name here..."
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="last_name"
                        component={TextField}
                        label="Last name"
                        placeholder="Write your last name here..."
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="email"
                        component={TextField}
                        label="Email"
                        placeholder="Write your email here..."
                      />
                    </Grid>
                    <Grid item xs={12} md={6} />
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        type="password"
                        name="password"
                        component={TextField}
                        label="Password"
                        placeholder="Write a password here..."
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        type="password"
                        name="password_confirm"
                        component={TextField}
                        label="Confirm password"
                        placeholder="Confirm password here..."
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="phone"
                        type="number"
                        component={TextField}
                        label="Phone number"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <Field
                        name="promo"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        Label={{
                          label:
                            "Yes, I want to receive monthly promotional materials.",
                        }}
                      />
                      <br />
                      <Field
                        name="terms"
                        type="checkbox"
                        component={CheckboxWithLabel}
                        Label={{
                          label: (
                            <Typography variant="body2">
                              I accept the{" "}
                              <Link component="a" href="#">
                                terms and conditions
                              </Link>
                              .
                            </Typography>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep
                validationSchema={Yup.object().shape({
                  company_size: Yup.string()
                    .max(55)
                    .required("The first name field is required"),
                  company_name: Yup.string()
                    .max(255)
                    .required("The first name field is required"),
                  company_role: Yup.string()
                    .max(255)
                    .required("The first name field is required"),
                })}
                label="Company Details"
              >
                <Box p={4}>
                  <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_name"
                        component={TextField}
                        label="Company name"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_size"
                        type="number"
                        component={TextField}
                        label="Company size"
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Field
                        fullWidth
                        name="company_role"
                        component={TextField}
                        label="Company role"
                      />
                    </Grid>
                  </Grid>
                </Box>
              </FormikStep>
              <FormikStep label="Complete Registration">
                <Box px={4} py={8}>
                  <Container maxWidth="sm">
                    <AvatarSuccess>
                      <CheckTwoToneIcon />
                    </AvatarSuccess>
                    <Collapse in={openAlert}>
                      <Alert
                        sx={{
                          mt: 5,
                        }}
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
                        A confirmation has been sent to your email address
                      </Alert>
                    </Collapse>

                    <Typography
                      align="center"
                      sx={{
                        pt: 5,
                        pb: 4,
                        lineHeight: 1.5,
                        px: 10,
                      }}
                      variant="h2"
                    >
                      Check your email to confirm your email and start using
                      your account
                    </Typography>

                    <Button
                      fullWidth
                      variant="contained"
                      href="/account/login-basic"
                    >
                      Continue to sign in
                    </Button>
                  </Container>
                </Box>
              </FormikStep>
            </FormikStepper>
          </Card>
        </Container>
      </MainContent>
    </>
  );
}

export function FormikStep({ children }) {
  return <>{children}</>;
}

export function FormikStepper({ children, ...props }) {
  const childrenArray = Children.toArray(children);
  const [step, setStep] = useState(0);
  const currentChild = childrenArray[step];
  const [completed, setCompleted] = useState(false);

  function isLastStep() {
    return step === childrenArray.length - 2;
  }

  return (
    <Formik
      {...props}
      validationSchema={currentChild.props.validationSchema}
      onSubmit={async (values, helpers) => {
        if (isLastStep()) {
          await props.onSubmit(values, helpers);
          setCompleted(true);
          setStep((s) => s + 1);
        } else {
          setStep((s) => s + 1);
          helpers.setTouched({});
        }
      }}
    >
      {({ isSubmitting }) => (
        <Form autoComplete="off">
          <Stepper alternativeLabel activeStep={step}>
            {childrenArray.map((child, index) => (
              <Step
                key={child.props.label}
                completed={step > index || completed}
              >
                <StepLabel>{child.props.label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {currentChild}
          {!completed ? (
            <BoxActions
              p={4}
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Button
                disabled={isSubmitting || step === 0}
                variant="outlined"
                color="primary"
                type="button"
                onClick={() => setStep((s) => s - 1)}
              >
                Previous
              </Button>

              <Button
                startIcon={
                  isSubmitting ? <CircularProgress size="1rem" /> : null
                }
                disabled={isSubmitting}
                variant="contained"
                color="primary"
                type="submit"
              >
                {isSubmitting
                  ? "Submitting"
                  : isLastStep()
                  ? "Complete registration"
                  : "Next step"}
              </Button>
            </BoxActions>
          ) : null}
        </Form>
      )}
    </Formik>
  );
}

export default RegisterWizard;
