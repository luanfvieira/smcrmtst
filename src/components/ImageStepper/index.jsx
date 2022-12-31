import { useState } from "react";
import {
  Typography,
  Link,
  Button,
  Box,
  useTheme,
  Paper,
  styled,
  Avatar,
  MobileStepper,
  CardMedia,
  CardActionArea,
  Tooltip,
} from "@mui/material";

import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  TextSnippetTwoTone,
} from "@mui/icons-material";

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(10)};
    height: ${theme.spacing(7)};
`
);

export function ImageStepper({ images }) {
  const theme = useTheme();

  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  if (images.length === 1) {
    return (
      <div>
        <Link
          href={images[activeStep]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(images[activeStep]) ? (
            <Tooltip arrow placement="top" title="Imagem">
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="64"
                  image={images[activeStep]}
                  alt="..."
                />
              </CardActionArea>
            </Tooltip>
          ) : (
            <Tooltip arrow placement="top" title="Documento">
              <AvatarWrapper variant="rounded">
                <TextSnippetTwoTone fontSize="large" />
              </AvatarWrapper>
            </Tooltip>
          )}
        </Link>
      </div>
    );
  }

  return (
    <Box sx={{ maxWidth: 380, marginTop: 2, flexGrow: 1 }}>
      <Paper
        square
        elevation={0}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",

          height: 50,
          pl: 2,
          bgcolor: "#F2F5F9",
        }}
      >
        <Typography sx={{ color: "#0171BB" }}>
          Clique na imagem ou documento para abrir
        </Typography>
      </Paper>
      <div>
        <Link
          href={images[activeStep]}
          target="_blank"
          rel="noopener noreferrer"
        >
          {/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(images[activeStep]) ? (
            <Box
              component="img"
              sx={{
                height: 180,
                display: "block",
                maxWidth: 400,
                overflow: "hidden",
                width: "100%",
                objectFit: "contain",
                // bgcolor: "background.default",
              }}
              src={images[activeStep]}
            />
          ) : (
            <Box
              sx={{
                height: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                maxWidth: 400,
                width: "100%",
                objectFit: "contain",
                // bgcolor: "background.default",
              }}
            >
              {activeStep % 2 === 0 ? (
                <>
                  <AvatarWrapper variant="rounded">
                    <TextSnippetTwoTone fontSize="large" />
                  </AvatarWrapper>
                  <Button
                    variant="contained"
                    sx={{ marginTop: 2 }}
                    endIcon={<OpenInNewIcon />}
                    size="small"
                  >
                    Abrir Documento
                  </Button>
                </>
              ) : (
                <>
                  <AvatarWrapper
                    variant="rounded"
                    sx={{
                      background: theme.colors.alpha.black[50],
                    }}
                  >
                    <TextSnippetTwoTone fontSize="large" />
                  </AvatarWrapper>
                  <Button
                    variant="contained"
                    sx={{
                      marginTop: 2,
                      background: theme.colors.alpha.black[50],
                    }}
                    endIcon={<OpenInNewIcon />}
                    size="small"
                  >
                    Abrir Documento
                  </Button>
                </>
              )}
            </Box>
          )}
        </Link>
      </div>

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
          >
            Próxima
            <KeyboardArrowRight />
          </Button>
        }
        backButton={
          <Button size="small" onClick={handleBack} disabled={activeStep === 0}>
            <KeyboardArrowLeft />
            Voltar
          </Button>
        }
      />
    </Box>
  );
}
