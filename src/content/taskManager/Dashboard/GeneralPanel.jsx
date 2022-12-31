/* eslint-disable no-unused-vars */
import {
  Autocomplete,
  Box,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import Text from "src/components/Text";
import SyncProblemOutlinedIcon from "@mui/icons-material/SyncProblemOutlined";
import PublishedWithChangesOutlinedIcon from "@mui/icons-material/PublishedWithChangesOutlined";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import { useCallback, useEffect, useState } from "react";
import api from "src/utils/api";
import ReportPerResponsible from "./ReportPerResponsible";
import GeneralTaskReport from "./GeneralTaskReport";
import { empty } from "src/utils/empty";

export default function GeneralPanel({ getData, getTasks }) {
  const [quantities, setQuantities] = useState(getData);
  const [listStatus, setListStatus] = useState([]);
  const [status, setStatus] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [usersToExecute, setUsersToExecute] = useState("");
  const [load, setLoad] = useState(true);

  useEffect(() => {
    async function getUsers() {
      try {
        const { data } = await api.get(`info/users?onlyAllowed=true`);

        setListUsers(
          data?.users?.map((item) => {
            return {
              label: `${item.name}`,
              value: item.id,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function getStatus() {
      try {
        const { data } = await api.get(`/info/tasksTypesStatus`);

        setListStatus(
          data.tasksTypesStatus.map((item) => {
            return {
              label: `${item.id}`,
              value: item.id,
            };
          })
        );
      } catch (error) {
        console.log(error);
      }
    }
    getStatus();
  }, []);

  if (quantities.length === 0) {
    return (
      <Box
        display="flex"
        justifyContent="space-evenly"
        alignItems="stretch"
        sx={{
          p: 2,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1 }}>
          Não há tarefas neste mês...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 2 }}>
      <Grid
        sx={
          {
            // px: 4,
          }
        }
        container
        direction="row"
        justifyContent="center"
        alignItems="stretch"
        spacing={4}
      >
        <Grid item xs={12}>
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="stretch"
            spacing={4}
          >
            {Object.entries(getData?.countPerStatus)?.map(
              ([status, quantities]) => (
                <Grid item lg={3} sm={6} xs={12} key={status}>
                  <Card
                    sx={{
                      px: 1,
                      pt: 1,
                      border:
                        (status === "PENDENTE" && "solid #FF1A43 2px") ||
                        (status === "EM ANDAMENTO" && "solid #33C2FF 2px") ||
                        (status === "FINALIZADO" && "solid #57CA22 2px"),
                    }}
                  >
                    <CardHeader
                      sx={{
                        pb: 0,
                      }}
                      titleTypographyProps={{
                        variant: "subtitle2",
                        fontWeight: "bold",
                        color: "textSecondary",
                      }}
                      title={status}
                    />
                    <CardContent
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        {status === "PENDENTE" && (
                          <Text color="error">
                            <SyncProblemOutlinedIcon
                              fontSize="large"
                              sx={{ animation: ` 2s infinite` }}
                            />
                          </Text>
                        )}

                        {status === "EM ANDAMENTO" && (
                          <Text color="info">
                            <PublishedWithChangesOutlinedIcon
                              fontSize="large"
                              sx={{ animation: ` 2s infinite` }}
                            />
                          </Text>
                        )}

                        {status === "FINALIZADO" && (
                          <Text color="success">
                            <CheckCircleOutlineOutlinedIcon fontSize="large" />
                          </Text>
                        )}
                      </Box>
                      <Typography variant="h3">{quantities}</Typography>
                    </CardContent>
                  </Card>
                </Grid>
              )
            )}
          </Grid>
        </Grid>

        <Grid item xs={12}>
          {!empty(getData.countPerStatus) ? (
            <Card variant="outlined" sx={{ p: 1 }}>
              {/* <CardHeader title="Lista de tarefas" /> */}
              <CardContent>
                <Box>
                  <Box
                    sx={{
                      p: 1,
                      justifyContent: "center",
                      alignItems: "center",
                      display: "flex",
                    }}
                  >
                    <Grid
                      container
                      spacing={2}
                      sx={{
                        justifyContent: "center",
                        alignContent: "center",
                      }}
                    >
                      <Grid item xs={12} md={4}>
                        <Autocomplete
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          value={usersToExecute}
                          options={listUsers}
                          onChange={(e, value) => {
                            if (value === null) {
                              setUsersToExecute("");
                              return;
                            }
                            setUsersToExecute(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              name="responsible"
                              {...params}
                              label="Responsáveis"
                              value={usersToExecute}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Autocomplete
                          disablePortal
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id
                          }
                          value={status}
                          options={listStatus}
                          onChange={(e, value) => {
                            if (value === null) {
                              setStatus("");
                              return;
                            }
                            setStatus(value);
                          }}
                          renderInput={(params) => (
                            <TextField
                              fullWidth
                              name="status"
                              {...params}
                              label="Status"
                              value={status}
                            />
                          )}
                        />
                      </Grid>

                      <Grid item xs={12} md={6}>
                        {usersToExecute ? (
                          <ReportPerResponsible
                            data={Object.entries(getData.countPerResponsible)
                              .map((a) => {
                                return {
                                  user: a[0],
                                  data: a[1],
                                };
                              })
                              .filter(
                                (item) => item.user === usersToExecute.label
                              )}
                          />
                        ) : (
                          <ReportPerResponsible
                            data={Object.entries(
                              getData.countPerResponsible
                            ).map((a) => {
                              return {
                                user: a[0],
                                data: a[1],
                              };
                            })}
                          />
                        )}
                      </Grid>

                      <Grid item xs={12} md={6}>
                        {status && usersToExecute?.label ? (
                          <GeneralTaskReport
                            data={getTasks.filter(
                              (task) =>
                                task.usersToExecute[0].id ===
                                  usersToExecute.value &&
                                task.tasksTypesStatusId === status?.value
                            )}
                          />
                        ) : !empty(usersToExecute?.label) ? (
                          <GeneralTaskReport
                            data={getTasks.filter(
                              (task) =>
                                task.usersToExecute[0].id ===
                                usersToExecute.value
                            )}
                          />
                        ) : !empty(status) ? (
                          <GeneralTaskReport
                            data={getTasks.filter(
                              (task) =>
                                task.tasksTypesStatusId === status?.value
                            )}
                          />
                        ) : (
                          <GeneralTaskReport data={getTasks} />
                        )}
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          ) : (
            <Box
              display="flex"
              justifyContent="space-evenly"
              alignItems="stretch"
              sx={{
                p: 2,
              }}
            >
              <Typography variant="h3" sx={{ mb: 1 }}>
                Não há tarefas neste mês...
              </Typography>
            </Box>
          )}
        </Grid>
      </Grid>
    </Box>
  );
}
