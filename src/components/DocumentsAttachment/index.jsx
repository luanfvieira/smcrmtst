import {
  Alert,
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  Divider,
  ListItem,
  ListItemText,
  styled,
  Typography,
} from "@mui/material";

import CheckTwoToneIcon from "@mui/icons-material/CheckTwoTone";
import CloseTwoToneIcon from "@mui/icons-material/CloseTwoTone";
import CloudUploadTwoToneIcon from "@mui/icons-material/CloudUploadTwoTone";
import TextSnippetTwoTone from "@mui/icons-material/TextSnippetTwoTone";

import { useDropzone } from "react-dropzone";
import { useState } from "react";
import { useNotification } from "src/hooks/useNotification";

const UploadBox = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    // padding: ${theme.spacing(8.5)};
    background: ${theme.colors.alpha.trueWhite[10]};
`
);

const BoxUploadWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    padding: ${theme.spacing(2)};
    margin-top: ${theme.spacing(2)};
    background: ${theme.colors.alpha.trueWhite[10]};
    border: 1px dashed ${theme.colors.alpha.trueWhite[30]};
    outline: none;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: ${theme.transitions.create(["border", "background"])};

    &:hover {
      background: ${theme.colors.alpha.trueWhite[5]};
      border-color: ${theme.colors.alpha.trueWhite[70]};
    }
`
);

const TypographyPrimary = styled(Typography)(
  ({ theme }) => `
    color: ${theme.colors.alpha.trueWhite[100]};
  `
);

const TypographySecondary = styled(Typography)(
  ({ theme }) => `
    color: ${theme.colors.alpha.trueWhite[70]};
  `
);

const AvatarSuccess = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.success.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDanger = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.error.light};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const DividerContrast = styled(Divider)(
  ({ theme }) => `
    background: ${theme.colors.alpha.trueWhite[10]};
  `
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.alpha.trueWhite[10]};
    width: ${theme.spacing(7)};
    height: ${theme.spacing(7)};
`
);

const AvatarDocument = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(18.2)};
    height: ${theme.spacing(18.2)};
`
);

export function DocumentsAttachment({ setDocuments, documents }) {
  const [notify] = useNotification();

  const [isError, setIsError] = useState(false);
  const [filePaste, setFilePaste] = useState(null);

  const handleTransformDataTransferIntoURL = (dataTransfer) => {
    const [firstItem] = dataTransfer.items;

    const blob = firstItem.getAsFile();

    if (blob === null) return null;
    setFilePaste(blob);

    return blob;
  };

  const handlePaste = (e) => {
    const event = e;
    if (event.clipboardData) {
      const file = handleTransformDataTransferIntoURL(event.clipboardData);

      if (file === null) {
        notify("Arquivo inválido", "warning");
        return;
      }

      setDocuments((oldState) => oldState.concat(file));
    }
  };

  const {
    // acceptedFiles,
    isDragActive,
    isDragAccept,
    isDragReject,
    getRootProps,
    getInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setIsError(false);
      for (let index = 0; index < acceptedFiles.length; index++) {
        const file = acceptedFiles[index];

        setDocuments((oldState) => oldState.concat(file));
      }
    },
    onDropRejected: (err) => {
      if (err[0].errors[0].code === "too-many-files") {
        setIsError(true);
      }
    },
    maxFiles: 60,
  });

  const files = documents.map((file, index) => (
    <ListItem disableGutters component="div" key={index}>
      <ListItemText primary={file.name} />
      <b>{file.size} bytes</b>
      <DividerContrast />
    </ListItem>
  ));

  return (
    <Card onPaste={handlePaste}>
      {filePaste !== null ? (
        <Box
          sx={{
            padding: 4,
          }}
        >
          <UploadBox
            sx={{
              padding: files.length > 0 ? 5.5 : 8.5,
            }}
          >
            {/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filePaste.name) ? (
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="160"
                  image={URL.createObjectURL(filePaste)}
                  alt="..."
                />
              </CardActionArea>
            ) : (
              <CardActionArea
                sx={{
                  height: 160,
                  width: 300,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "#fff",
                }}
              >
                <AvatarDocument variant="rounded">
                  <TextSnippetTwoTone fontSize="large" />
                </AvatarDocument>
              </CardActionArea>
            )}
          </UploadBox>
        </Box>
      ) : (
        <>
          <Box px={2} py={1.8} style={{ backgroundColor: "#0071BC" }}>
            <UploadBox
              sx={{
                padding: files.length > 0 ? 5.5 : 8.5,
              }}
            >
              <TypographyPrimary variant="h4" gutterBottom>
                Envio Rápido
              </TypographyPrimary>
              <TypographySecondary variant="body1">
                Envie sua fotos de indicação aqui...
              </TypographySecondary>

              <BoxUploadWrapper {...getRootProps({ className: "dropzone" })}>
                <input
                  {...getInputProps({ className: "dropzone" })}
                  className="dropzone"
                />
                {isDragAccept && (
                  <>
                    <AvatarSuccess variant="rounded">
                      <CheckTwoToneIcon />
                    </AvatarSuccess>
                    <TypographyPrimary
                      sx={{
                        mt: 2,
                      }}
                    >
                      Solte os arquivos para iniciar o upload
                    </TypographyPrimary>
                  </>
                )}
                {isDragReject && (
                  <>
                    <AvatarDanger variant="rounded">
                      <CloseTwoToneIcon />
                    </AvatarDanger>
                    <TypographyPrimary
                      sx={{
                        mt: 2,
                      }}
                    >
                      Você não pode fazer upload desses tipos de arquivo
                    </TypographyPrimary>
                  </>
                )}
                {!isDragActive && (
                  <>
                    <AvatarWrapper variant="rounded">
                      <CloudUploadTwoToneIcon />
                    </AvatarWrapper>
                    <TypographyPrimary
                      sx={{
                        mt: 2,
                      }}
                    >
                      Arraste arquivos ou clique aqui
                    </TypographyPrimary>
                  </>
                )}
              </BoxUploadWrapper>
              {files.length > 0 && (
                <>
                  <Alert
                    sx={{
                      py: 0,
                      mt: 2,
                    }}
                    severity="success"
                  >
                    Você selecionou <b>{files.length}</b> arquivos!
                  </Alert>
                </>
              )}
              {isError && (
                <Alert
                  sx={{
                    py: 0,
                    mt: 2,
                  }}
                  severity="error"
                >
                  Apenas 60 arquivos são permitidos por indicação
                </Alert>
              )}
            </UploadBox>
          </Box>
        </>
      )}
    </Card>
  );
}
