import { Fragment, forwardRef, useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  Tooltip,
  Typography,
  Card,
  Dialog,
  alpha,
  Slide,
  styled,
  useTheme,
} from "@mui/material";

import { Link as RouterLink } from "react-router-dom";

import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import Scrollbar from "src/components/Scrollbar";

import PageviewIcon from "@mui/icons-material/Pageview";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";

const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="down" ref={ref} {...props} />;
});

const DialogWrapper = styled(Dialog)(
  () => `
    .MuiDialog-container {
        height: auto;
    }
    
    .MuiDialog-paperScrollPaper {
        max-height: calc(100vh - 64px)
    }
`
);

const ListButton = styled(Box)(
  ({ theme }) => `
      background-color: transparent;
      color:  ${theme.colors.alpha.black[100]};
      transition: ${theme.transitions.create(["all"])};
      border: ${theme.colors.alpha.black[10]} solid 1px;
      border-radius: ${theme.general.borderRadius};
      padding: ${theme.spacing(1)};
      margin: ${theme.spacing(1, 0)};
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: space-between;

      & > div > .MuiSvgIcon-root {
        color:  ${theme.colors.alpha.black[50]};
        transition: ${theme.transitions.create(["all"])};
      }

      &:hover {
        background-color: ${alpha(theme.colors.primary.main, 0.08)};
        color:  ${theme.colors.primary.main};
        border-color: ${alpha(theme.colors.primary.main, 0.3)};

        & > div > .MuiSvgIcon-root {
          color:  ${theme.colors.primary.main};
        }
      }
`
);

export function ReportPerStatusDetails({ details, type }) {
  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip arrow title="Detalhes">
        <ZoomOutMapIcon color="primary" onClick={handleClickOpen}>
          <SearchTwoToneIcon fontSize="small" />
        </ZoomOutMapIcon>
      </Tooltip>

      <DialogWrapper
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        scroll="paper"
        onClose={handleClose}
      >
        <Box>
          <Box display="flex" alignItems="center">
            <Box flexGrow={1} display="flex" alignItems="center">
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
                sx={{ p: 2 }}
              >
                Detalhes Indicações
              </Typography>
            </Box>
            <Card
              sx={{
                ml: "auto",
                mr: 2,
                py: 0.5,
                px: 1,
                background: theme.colors.alpha.black[10],
              }}
            >
              <Typography
                variant="body2"
                color="text.secondary"
                fontWeight="bold"
              >
                esc
              </Typography>
            </Card>
          </Box>
        </Box>
        <Divider />

        <Box
          sx={{
            height: 450,
          }}
        >
          <Scrollbar>
            <Box pb={2} px={2}>
              <Typography
                sx={{
                  mt: 2,
                  pb: 0.5,
                }}
                variant="h5"
              >
                {`Lista de Indicações - ${type}`}
              </Typography>
              {details?.map((item) => {
                let name;

                if (!item?.client && !item.group) {
                  name = "Não vinculado";
                } else if (item?.client) {
                  name = `Cliente: ${item?.client}`;
                } else {
                  name = `Grupo: ${item?.group}`;
                }

                return (
                  <Fragment key={item.id}>
                    <ListButton>
                      <Box display="flex" alignItems="center">
                        <Typography>{`Indicação: ${item.code} - ${name}`}</Typography>
                      </Box>
                      <Box>
                        <Tooltip
                          placement="top"
                          arrow
                          title="Visualizar Indicação"
                        >
                          <IconButton
                            component={RouterLink}
                            to={`/app/crm/indicate/${item.id}/details`}
                            size="small"
                            color="primary"
                          >
                            <PageviewIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </ListButton>
                  </Fragment>
                );
              })}
            </Box>
          </Scrollbar>
        </Box>
      </DialogWrapper>
    </>
  );
}
