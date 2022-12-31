import { useEffect, useState } from "react";

import {
  TextField,
  Grid,
  Tab,
  Box,
  Tabs,
  Typography,
  Divider,
  Card,
  styled,
  List,
  ListItem,
  ListItemText,
  alpha,
  useTheme,
  Link,
  ImageList,
  ImageListItem,
  Autocomplete,
  CircularProgress,
  Button,
  Avatar,
  IconButton,
  lighten,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import api from "src/utils/api";
import * as _ from "lodash";

import SyncIcon from "@mui/icons-material/Sync";

import ThumbUpTwoToneIcon from "@mui/icons-material/ThumbUpTwoTone";
import ThumbDownTwoToneIcon from "@mui/icons-material/ThumbDownTwoTone";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import UnpublishedIcon from "@mui/icons-material/Unpublished";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";
import { useNavigate } from "react-router";
import { useNotification } from "src/hooks/useNotification";
import { formatFone } from "src/utils/formatFone";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
  `
);

const AvatarWrapper = styled(Avatar)(
  ({ theme }) => `
    background: ${theme.colors.primary.main};
    width: ${theme.spacing(18.2)};
    height: ${theme.spacing(18.2)};
`
);

const useStyles = makeStyles({
  a: {
    display: "block",
    height: "100%",
  },
  img: {
    objectFit: "cover",
    width: "100%",
    height: "100%",
  },
});

export function Overview({ lead, reload }) {
  const navigate = useNavigate();
  const [notify] = useNotification();

  const classes = useStyles();
  const theme = useTheme();
  const { debounce } = _;

  const [currentTab, setCurrentTab] = useState("general");
  const [open, setOpen] = useState(false);
  const [clientSelectedData, setClientSelectedData] = useState([]);

  const [creditApproved, setCreditApproved] = useState(null);
  const [obs, setObs] = useState("");
  const [options, setOptions] = useState([]);

  // const loading = open;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!lead.clients) return;
    setClientSelectedData([lead.clients]);
  }, [lead]);

  const _loadSuggestions = async (query) => {
    setLoading(true);
    setOpen(true);

    try {
      const { data } = await api.get("/info/clients", {
        params: {
          search: query.replace(/[.\-/]/g, ""),
        },
      });

      setOptions(data.clients);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestions = debounce(_loadSuggestions, 750);

  const tabs = [
    { value: "general", label: "Principal" },
    // { value: "photos", label: "Fotos" },
    { value: "client", label: "Cliente" },
    { value: "customersPortfolio", label: "Responsáveis" },
    { value: "credit", label: "Crédito" },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const handleLinkToClient = async () => {
    try {
      const { data } = await api.patch(
        `/cadastro/leads/linkToClient/${lead.id}`,
        {
          clientsId: clientSelectedData[0].value,
        }
      );

      notify(data?.msg, "success");

      reload(Math.random());
    } catch (err) {
      console.error(err);
    }
  };

  const handleApproveDisapprove = async () => {
    if (!creditApproved && obs === "") {
      notify("A justificativa é obrigatório!", "warning");

      return;
    }
    try {
      const { data } = await api.patch(
        `/cadastro/leads/approveRegistration/${lead.id}`,
        {
          denied: !creditApproved,
          obs,
        }
      );
      notify(data?.msg, "success");

      navigate("/app/credit/indicate");
    } catch (err) {
      console.error(err);
    }
  };

  if (lead.length === 0) {
    return (
      <Typography variant="h5" gutterBottom>
        Carregando...
      </Typography>
    );
  }

  const IconButtonSuccess = styled(IconButton)(
    ({ theme }) => `
        background: ${
          creditApproved === true ? theme.colors.success.lighter : "none"
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
          creditApproved === false ? theme.colors.error.lighter : "none"
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
    <Card>
      <Divider />
      <TabsContainerWrapper>
        <Tabs
          onChange={handleTabsChange}
          value={currentTab}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
        >
          {tabs.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </TabsContainerWrapper>
      <Divider />
      <Box p={3}>
        {currentTab === "general" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Card
                elevation={0}
                sx={{
                  mb: 1,
                  p: 2.5,
                  background: `${alpha(theme.colors.alpha.black[100], 0.05)}`,
                }}
              >
                <List
                  disablePadding
                  sx={{
                    my: 1.5,
                  }}
                >
                  <ListItem disableGutters>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "h5",
                      }}
                      primary="Empresa:"
                    />
                    <Typography variant="subtitle1">
                      {lead.enterpriseName || "Não informado"}
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "h5",
                      }}
                      primary="CNPJ/CPF"
                    />
                    <Typography variant="subtitle1">
                      {lead.identifier || "Não informado"}
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "h5",
                      }}
                      primary="Telefone:"
                    />
                    <Typography variant="subtitle1">
                      {formatFone(lead.fone) || "Não informado"}
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "h5",
                      }}
                      primary="Obs:"
                    />
                    <Typography variant="subtitle1">
                      {lead.obs || "Não informado"}
                    </Typography>
                  </ListItem>
                </List>
              </Card>
            </Grid>
          </Grid>
        )}
        {currentTab === "photos" && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              {lead?.documentUrls?.urls.length > 0 ? (
                <ImageList
                  // sx={{ width: 500, height: 500 }}
                  cols={3}
                  rowHeight={184}
                >
                  {lead?.documentUrls?.urls.map((filename) => (
                    <ImageListItem key={filename}>
                      <Link
                        href={filename}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={classes.a}
                      >
                        {/\.(gif|jpe?g|tiff?|png|webp|bmp)$/i.test(filename) ? (
                          <img
                            className={classes.img}
                            src={filename}
                            // srcSet={item}
                            alt=""
                            loading="lazy"
                          />
                        ) : (
                          <AvatarWrapper variant="square">
                            <TextSnippetTwoToneIcon fontSize="large" />
                          </AvatarWrapper>
                        )}
                      </Link>
                    </ImageListItem>
                  ))}
                </ImageList>
              ) : (
                <Typography variant="subtitle1">Sem fotos anexadas.</Typography>
              )}
            </Grid>
          </Grid>
        )}
        {currentTab === "client" && (
          <Grid container spacing={3}>
            {lead.clients === null && (
              <Grid item xs={12}>
                <Autocomplete
                  id="searchClient"
                  loadingText="Carregando..."
                  open={open}
                  noOptionsText="Não há dados..."
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
                  disabled={lead.clients !== null}
                  onChange={(event, value) => {
                    if (value === "" || value === null) {
                      setClientSelectedData([]);
                      return;
                    }
                    setClientSelectedData([value]);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Pesquisar Cliente"
                      fullWidth
                      onChange={(ev) => {
                        if (
                          ev.target.value !== "" ||
                          ev.target.value !== null
                        ) {
                          loadSuggestions(ev.target.value);
                        }
                      }}
                      InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                          <>
                            {loading ? (
                              <CircularProgress color="inherit" size={20} />
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
            )}

            {clientSelectedData.length > 0 && (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    mb: 1,
                    p: 2.5,
                    background: `${alpha(theme.colors.alpha.black[100], 0.05)}`,
                  }}
                >
                  <List
                    disablePadding
                    sx={{
                      my: 1.5,
                    }}
                  >
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        primary="COD. CRM:"
                      />
                      <Typography variant="subtitle1">
                        {clientSelectedData[0]?.code}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        primary="COD. EXT.:"
                      />
                      <Typography variant="subtitle1">
                        {clientSelectedData[0]?.alias}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        primary="CNPJ/CPF"
                      />
                      <Typography variant="subtitle1">
                        {clientSelectedData[0]?.identifier}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        primary="Nome:"
                      />
                      <Typography variant="subtitle1">
                        {clientSelectedData[0]?.name}
                      </Typography>
                    </ListItem>
                  </List>
                </Card>
                {lead.clients === null && (
                  <Button
                    // sx={{ mr: 2 }}
                    variant="contained"
                    disabled={lead.clients !== null}
                    fullWidth
                    onClick={() => handleLinkToClient()}
                    startIcon={<SyncIcon />}
                  >
                    Vincular
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        )}
        {currentTab === "customersPortfolio" && (
          <Grid container spacing={3}>
            {lead.usersToExecute.length > 0 ? (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    mb: 1,
                    p: 1,
                    background: `${alpha(theme.colors.alpha.black[100], 0.05)}`,
                  }}
                >
                  <List
                    disablePadding
                    sx={
                      {
                        // my: 1.5,
                      }
                    }
                  >
                    {lead.usersToExecute.map((i) => {
                      return (
                        <ListItem disableGutters key={i.user}>
                          <ListItemText
                            primaryTypographyProps={{
                              variant: "h5",
                            }}
                            primary="Representante:"
                          />
                          <Typography variant="subtitle1">{i.name}</Typography>
                        </ListItem>
                      );
                    })}
                  </List>
                </Card>
                {/* {lead.clients === null && ( */}
                {/* <Button
                  sx={{ mr: 2 }}
                  variant="contained"
                  disabled={lead.clients !== null}
                  fullWidth
                  onClick={() => handleSendToUsers()}
                  startIcon={<SyncIcon />}
                >
                  Enviar
                </Button> */}
                {/* )} */}
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Typography variant="subtitle1">Sem responsáveis.</Typography>
              </Grid>
            )}
          </Grid>
        )}
        {currentTab === "credit" && (
          <Grid container spacing={3}>
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
                Análise de Crédito Aprovada? {creditApproved === true && "Sim"}
                {creditApproved === false && "Não"}
              </Typography>
              <Box py={1}>
                <IconButtonSuccess
                  onClick={() =>
                    setCreditApproved((state) => {
                      if (state === false || state === null) return true;
                      if (state === true) return null;
                    })
                  }
                >
                  <ThumbUpTwoToneIcon fontSize="large" />
                </IconButtonSuccess>
                <IconButtonError
                  onClick={() =>
                    setCreditApproved((state) => {
                      if (state === true || state === null) return false;
                      if (state === false) return null;
                    })
                  }
                >
                  <ThumbDownTwoToneIcon fontSize="large" />
                </IconButtonError>
              </Box>
              {creditApproved === false && (
                <TextField
                  sx={{
                    mt: 2,
                    mb: 1,
                  }}
                  multiline
                  rows={4}
                  fullWidth
                  value={obs}
                  onChange={(e) => setObs(e.target.value)}
                  placeholder="Justificativa..."
                />
              )}
              {creditApproved !== null &&
                lead.leadsTypesStatusId !== "COMERCIAL" && (
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleApproveDisapprove()}
                    startIcon={
                      creditApproved === false ? (
                        <UnpublishedIcon />
                      ) : (
                        <CheckCircleOutlineIcon />
                      )
                    }
                  >
                    Salvar
                  </Button>
                )}
            </Grid>
          </Grid>
        )}
      </Box>
    </Card>
  );
}
