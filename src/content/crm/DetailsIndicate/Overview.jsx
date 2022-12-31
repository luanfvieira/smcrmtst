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
  ListItemAvatar,
  Avatar,
  Switch,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import { makeStyles } from "@mui/styles";
import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";
import api from "src/utils/api";
import * as _ from "lodash";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";
import EmailTwoToneIcon from "@mui/icons-material/EmailTwoTone";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import SyncIcon from "@mui/icons-material/Sync";
import Text from "src/components/Text";
import { useNotification } from "src/hooks/useNotification";
import { empty } from "src/utils/empty";
import { formatAlias } from "src/utils/formatAlias";
import { formatFone } from "src/utils/formatFone";
import { formatAliasClient } from "src/utils/formatAliasClient";

const TabsContainerWrapper = styled(Box)(
  ({ theme }) => `
    background-color: ${theme.colors.alpha.black[5]};
    padding: ${theme.spacing(2)};
  `
);

const AvatarWrapperError = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.error.lighter};
      color:  ${theme.colors.error.main};
`
);

const AvatarWrapperSuccess = styled(Avatar)(
  ({ theme }) => `
      background-color: ${theme.colors.success.lighter};
      color:  ${theme.colors.success.main};
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

const AccordionSummaryWrapper = styled(AccordionSummary)(
  ({ theme }) => `
    &.Mui-expanded {
      min-height: 48px;
    }

    .MuiAccordionSummary-content.Mui-expanded {
      margin: 12px 0;
    }

    .MuiSvgIcon-root {
      transition: ${theme.transitions.create(["color"])};
    }

    &.MuiButtonBase-root {

      margin-bottom: ${theme.spacing(0.5)};

      &:last-child {
        margin-bottom: 0;
      }

      &.Mui-expanded,
      &:hover {
        background: ${theme.colors.alpha.black[10]};

        .MuiSvgIcon-root {
          color: ${theme.colors.primary.main};
        }
      }
    }
`
);

export function Overview({ lead, reload }) {
  const classes = useStyles();
  const theme = useTheme();
  const [notify] = useNotification();
  const { debounce } = _;

  const [currentTab, setCurrentTab] = useState("general");
  const [typeClientOrGroup, setTypeOrGroup] = useState("Cliente");
  const [clientSelectedData, setClientSelectedData] = useState([]);
  const [isClienteNew, setIsClientNew] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const [expanded, setExpanded] = useState(false);

  function handleChange() {
    setExpanded((oldState) => !oldState);
  }

  useEffect(() => {
    if (!lead.clients && !lead.clientGroup) return;

    if (!lead.clients) {
      setClientSelectedData([lead.clientGroup]);
    } else {
      setClientSelectedData([lead.clients]);
    }
  }, [lead]);

  const _loadSuggestions = async (query) => {
    setLoading(true);
    setOpen(true);

    try {
      const { data } = await api.get(
        typeClientOrGroup === "Cliente"
          ? "/info/clients"
          : "/info/clientGroups",
        {
          params: {
            search: query.replace(/[.\-/]/g, ""),
          },
        }
      );

      setOptions(
        typeClientOrGroup === "Cliente" ? data?.clients : data?.clientGroups
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadSuggestions = debounce(_loadSuggestions, 750);

  const tabs = [
    { value: "general", label: "Principal" },
    { value: "photos", label: "Fotos" },
    { value: "client", label: "Cliente" },
    { value: "contacts", label: "Contatos" },
    { value: "customersPortfolio", label: "Responsáveis" },
  ];

  const handleTabsChange = (_event, value) => {
    setCurrentTab(value);
  };

  const handleLinkToClient = async () => {
    try {
      const { data } = await api.patch(`/crm/leads/linkToClient/${lead.id}`, {
        clientsId:
          typeClientOrGroup === "Cliente"
            ? clientSelectedData[0].value
            : undefined,
        clientGroupsId:
          typeClientOrGroup !== "Cliente"
            ? clientSelectedData[0].value
            : undefined,
      });

      notify(data?.msg, "success");

      reload(Math.random());
    } catch (err) {
      console.error(err);
    }
  };

  const handleSendToUsers = async (customersPortfolioUserId) => {
    try {
      const { data } = await api.patch(`/crm/leads/sendToUsers/${lead.id}`, {
        usersId: [],
        keepsTheExistingOnes: true,
        newCustomersPortfolio: !customersPortfolioUserId,
      });

      notify(data?.msg, "success");

      reload(Math.random());

      if (!customersPortfolioUserId) {
        setCurrentTab("customersPortfolio");
      }
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
                  py: 0.5,
                  px: 1.5,
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
                      primary="Unidade:"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textOverflow: "ellipsis",
                        textAlign: "end",
                        width: "50%",
                      }}
                    >
                      {!empty(lead?.companies[0]?.fantasyName)
                        ? `${formatAlias(lead?.companies[0]?.alias)} - ${
                            lead?.companies[0]?.fantasyName
                          }`
                        : "Não informado"}
                    </Typography>
                  </ListItem>
                  <ListItem disableGutters>
                    <ListItemText
                      primaryTypographyProps={{
                        variant: "h5",
                      }}
                      primary="Empresa:"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textOverflow: "ellipsis",
                        textAlign: "end",
                        width: "50%",
                      }}
                    >
                      {lead?.enterpriseName || "Não informado"}
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
                    <Typography
                      variant="subtitle1"
                      sx={{
                        textOverflow: "ellipsis",
                        textAlign: "end",
                        width: "50%",
                      }}
                    >
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
                  rowHeight={164}
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
            {!lead.clients &&
              !lead.clientGroup &&
              lead.usersToExecute.length === 0 && (
                <Grid item xs={12}>
                  <Box display="flex" alignItems="center">
                    <ToggleButtonGroup
                      // size="small"
                      value={typeClientOrGroup}
                      exclusive
                      onChange={(e, value) => {
                        setOptions([]);
                        setTypeOrGroup(value);
                      }}
                    >
                      <ToggleButton
                        sx={{
                          px: 2,
                          py: 0.5,
                          lineHeight: 1.5,
                          fontSize: `${theme.typography.pxToRem(12)}`,
                        }}
                        disableRipple
                        value="Cliente"
                      >
                        Cliente
                      </ToggleButton>
                      <ToggleButton
                        sx={{
                          px: 2,
                          py: 0.5,
                          lineHeight: 1.5,
                          fontSize: `${theme.typography.pxToRem(12)}`,
                        }}
                        disableRipple
                        value="Grupo"
                      >
                        Grupo
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>

                  {typeClientOrGroup === "Cliente" && (
                    <List disablePadding>
                      <ListItem
                        sx={{
                          mt: 2,
                          p: 1,
                        }}
                      >
                        <ListItemAvatar>
                          {isClienteNew ? (
                            <AvatarWrapperSuccess>
                              <AccountCircleIcon />
                            </AvatarWrapperSuccess>
                          ) : (
                            <AvatarWrapperError>
                              <AccountCircleIcon />
                            </AvatarWrapperError>
                          )}
                        </ListItemAvatar>
                        <ListItemText
                          primary={<Text color="black">Cliente novo?</Text>}
                          primaryTypographyProps={{
                            variant: "body1",
                            fontWeight: "bold",
                            color: "textPrimary",
                            gutterBottom: true,
                            noWrap: true,
                          }}
                          secondary={
                            isClienteNew ? (
                              <Text color="success">Sim</Text>
                            ) : (
                              <Text color="error">Não</Text>
                            )
                          }
                          secondaryTypographyProps={{
                            variant: "body2",
                            noWrap: true,
                          }}
                        />
                        <Switch
                          edge="end"
                          color="primary"
                          onChange={async () => {
                            // await getSuggestions();
                            setIsClientNew((prev) => !prev);

                            setClientSelectedData([]);
                          }}
                          checked={isClienteNew}
                        />
                      </ListItem>
                      <Divider />
                    </List>
                  )}
                </Grid>
              )}
            {!lead.clients &&
              !lead.clientGroup &&
              !isClienteNew &&
              lead.leadsTypesStatusId !== "CADASTRO" && (
                <Grid item xs={12}>
                  <Autocomplete
                    id="searchClient"
                    loadingText="Carregando..."
                    noOptionsText="Não há dados..."
                    open={open}
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
                    disabled={
                      lead.clients !== null && lead.clientGroup !== null
                    }
                    onChange={async (event, value) => {
                      if (value === "" || value === null) {
                        setClientSelectedData([]);
                        return;
                      }

                      // if (value.customersPortfolio === null) {
                      //   await getSuggestions();
                      // }
                      setClientSelectedData([value]);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={
                          typeClientOrGroup === "Cliente"
                            ? "Pesquisar Cliente"
                            : "Pesquisar Grupo"
                        }
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
            {lead.leadsTypesStatusId === "CADASTRO" && (
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Aguardando aprovação do CADASTRO.
                </Typography>
              </Grid>
            )}

            {isClienteNew && (
              <Grid item xs={12}>
                {/* <Card
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
                        primary="Sugestão Representante:"
                      />
                      <Typography variant="subtitle1">
                        {customersPortfolioSuggestions?.user}
                      </Typography>
                    </ListItem>
                  </List>
                </Card> */}
                {lead.leadsTypesStatusId !== "CADASTRO" && (
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    disabled={
                      lead.clients !== null && lead.clientGroup !== null
                    }
                    fullWidth
                    onClick={() =>
                      handleSendToUsers(
                        !!clientSelectedData[0]?.customersPortfolio
                      )
                    }
                    startIcon={<SyncIcon />}
                  >
                    Enviar
                  </Button>
                )}
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
                      <Typography
                        variant="subtitle1"
                        sx={{
                          textOverflow: "ellipsis",
                          textAlign: "end",
                          width: "50%",
                        }}
                      >
                        {clientSelectedData[0]?.name}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        sx={{
                          textDecoration: !clientSelectedData[0]
                            ?.customersPortfolio
                            ? "line-through"
                            : "none",
                        }}
                        primary="Representante:"
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{
                          textDecoration: !clientSelectedData[0]
                            ?.customersPortfolio
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {!clientSelectedData[0]?.customersPortfolio
                          ? "N/A"
                          : clientSelectedData[0]?.customersPortfolio?.users
                              ?.user}
                      </Typography>
                    </ListItem>
                    {/* {clientSelectedData.length && (
                      <ListItem disableGutters>
                        <ListItemText
                          primaryTypographyProps={{
                            variant: "h5",
                            color: "primary",
                          }}
                          primary="Sugestão Representante:"
                          color="primary"
                        />
                        <Typography
                          variant="subtitle1"
                          sx={{ color: theme.colors.primary.main }}
                        >
                          {customersPortfolioSuggestions.user}
                        </Typography>
                      </ListItem>
                    )} */}
                  </List>
                </Card>

                {!lead.clients && !lead.clientGroup && (
                  <Button
                    sx={{ mr: 2 }}
                    variant="contained"
                    disabled={
                      lead.clients !== null && lead.clientGroup !== null
                    }
                    fullWidth
                    onClick={async () => {
                      await handleLinkToClient();
                      await handleSendToUsers(
                        !!clientSelectedData[0]?.customersPortfolio
                        // ? customersPortfolioSuggestions.id
                        // : clientSelectedData[0]?.customersPortfolio?.users?.id
                      );
                      // if (clientSelectedData[0]?.customersPortfolio === null) {
                      // }
                    }}
                    startIcon={<SyncIcon />}
                  >
                    Vincular
                  </Button>
                )}
              </Grid>
            )}
          </Grid>
        )}
        {currentTab === "contacts" && (
          <Grid container spacing={3}>
            {lead?.clients?.clientContacts?.length > 0 && (
              <Grid item xs={12}>
                <Card
                  elevation={0}
                  sx={{
                    mb: 1,
                    p: 1,
                    background: `${alpha(theme.colors.alpha.black[100], 0.05)}`,
                  }}
                >
                  <List disablePadding>
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        primary="TELEFONE"
                      />
                      <Typography variant="subtitle1">
                        {formatFone(
                          lead?.clients?.clientContacts.filter(
                            (contactFone) =>
                              contactFone.clientContactsTypesStatusId ===
                              "TELEFONE"
                          )[0]?.content
                        )}
                      </Typography>
                    </ListItem>
                    <ListItem disableGutters>
                      <ListItemText
                        primaryTypographyProps={{
                          variant: "h5",
                        }}
                        primary="EMAIL"
                      />
                      <Tooltip
                        arrow
                        placement="top"
                        title="Clique para enviar e-mail"
                      >
                        <Link
                          href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${
                            lead?.clients?.clientContacts.filter(
                              (contactFone) =>
                                contactFone.clientContactsTypesStatusId ===
                                "EMAIL"
                            )[0]?.content
                          }`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                            }}
                          >
                            {
                              lead?.clients?.clientContacts.filter(
                                (contactFone) =>
                                  contactFone.clientContactsTypesStatusId ===
                                  "EMAIL"
                              )[0]?.content
                            }
                            <EmailTwoToneIcon />
                          </div>
                        </Link>
                      </Tooltip>
                    </ListItem>
                  </List>
                </Card>
                <Accordion expanded={expanded} onChange={handleChange}>
                  <AccordionSummaryWrapper expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h5">Mais Contatos</Typography>
                  </AccordionSummaryWrapper>
                  <AccordionDetails
                    sx={{
                      p: 0,
                    }}
                  >
                    <List disablePadding>
                      {lead.clients?.clientContacts
                        ?.sort((a, b) => {
                          if (a.clientContactsTypesStatusId === "TELEFONE")
                            return -1;
                          if (b.clientContactsTypesStatusId === "EMAIL")
                            return 1;
                          return 0;
                        })
                        .map((i, idx) => {
                          return (
                            <ListItem disableGutters key={idx}>
                              <ListItemText
                                primaryTypographyProps={{
                                  variant: "h5",
                                }}
                                primary={`${i.clientContactsTypesStatusId}:`}
                              />

                              {i.clientContactsTypesStatusId === "TELEFONE" ? (
                                <Typography variant="subtitle1">
                                  {formatFone(i.content)}
                                </Typography>
                              ) : (
                                <Tooltip
                                  arrow
                                  placement="top"
                                  title="Clique para enviar e-mail"
                                >
                                  <Link
                                    href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${i.content}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                  >
                                    <div
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                      }}
                                    >
                                      {i.content}
                                      <EmailTwoToneIcon />
                                    </div>
                                  </Link>
                                </Tooltip>
                              )}
                            </ListItem>
                          );
                        })}
                    </List>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            )}

            {!!lead?.clientGroup &&
              lead.clientGroup.clients
                ?.filter((item) => item.clientContacts.length > 0)
                ?.map((client) => (
                  <Grid item xs={12} key={client.id}>
                    <Card
                      elevation={0}
                      sx={{
                        // mb: 1,
                        p: 1,
                        background: `${alpha(
                          theme.colors.alpha.black[100],
                          0.05
                        )}`,
                      }}
                    >
                      <Accordion>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                          <Typography>
                            Contatos - {formatAliasClient(client.alias)} /{"  "}
                            {client.name}
                          </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <List>
                            {client?.clientContacts
                              ?.sort((a, b) => {
                                if (
                                  a.clientContactsTypesStatusId === "TELEFONE"
                                )
                                  return -1;
                                if (b.clientContactsTypesStatusId === "EMAIL")
                                  return 1;
                                return 0;
                              })
                              .map((i, idx) => {
                                return (
                                  <ListItem disableGutters key={idx}>
                                    <ListItemText
                                      primaryTypographyProps={{
                                        variant: "h5",
                                      }}
                                      primary={`${i.clientContactsTypesStatusId}:`}
                                    />

                                    {i.clientContactsTypesStatusId ===
                                    "TELEFONE" ? (
                                      <Typography variant="subtitle1">
                                        {formatFone(i.content)}
                                      </Typography>
                                    ) : (
                                      <Tooltip
                                        arrow
                                        placement="top"
                                        title="Clique para enviar e-mail"
                                      >
                                        <Link
                                          href={`https:mail.google.com/mail/?view=cm&fs=1&tf=1&to=${i.content}`}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                        >
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            {i.content}
                                            <EmailTwoToneIcon />
                                          </div>
                                        </Link>
                                      </Tooltip>
                                    )}
                                  </ListItem>
                                );
                              })}
                          </List>
                        </AccordionDetails>
                      </Accordion>
                    </Card>
                  </Grid>
                ))}

            {!lead?.clientGroup?.clients?.every(
              (client) => client.clientContacts.length === 0
            ) &&
              lead?.clients?.clientContacts.length === 0 && (
                <Grid item xs={12}>
                  <Typography variant="subtitle1">
                    Sem contatos cadastrados.{" "}
                  </Typography>
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
      </Box>
    </Card>
  );
}
