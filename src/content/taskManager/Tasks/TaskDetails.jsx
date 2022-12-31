/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  List,
  OutlinedInput,
  Typography,
  Zoom,
} from "@mui/material";
import { useSnackbar } from "notistack";
import { getBoard } from "src/slices/projects_board";
import { useDispatch } from "src/store";
import EditIcon from "@mui/icons-material/Edit";
import api from "src/utils/api";
import EditTask from "./EditTask";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SendIcon from "@mui/icons-material/Send";
import { useNotification } from "src/hooks/useNotification";
import AttachFileIcon from "@mui/icons-material/AttachFile";

export default function TaskDetails({ getOpen, getTask }) {
  const [notify] = useNotification();
  const { openModal, setOpenModal } = getOpen;
  const [open, setOpen] = useState(false);
  const [clickComments, setClickComments] = useState(false);
  const [comment, setComment] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const task = getTask.task;

  function handlerCloseModal() {
    setOpenModal(false);
    setClickComments(false);
    setComment("");
  }

  async function handlerCompleteTask() {
    try {
      setOpenModal(false);
      const { data } = await api.patch(`/activities/tasks/${task.id}`, {
        status: "FINALIZADO",
      });

      enqueueSnackbar(`${data.msg}`, {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
        autoHideDuration: 2000,
      });
      dispatch(getBoard());
    } catch (error) {
      console.log(error);
    }
  }

  async function handlerDeleteTask() {
    try {
      const { data } = await api.delete(
        // `http://11.0.11.59:3333/activities/tasks/${task.id}`
        `/activities/tasks/${task.id}`
      );

      enqueueSnackbar(`${data.msg}`, {
        variant: "info",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
        autoHideDuration: 2000,
      });
      dispatch(getBoard());
    } catch (error) {
      console.log(error);
    }
  }

  const handlerOpenEditTask = () => {
    setOpen(true);
    setOpenModal(false);
  };

  function handlerClickComments() {
    setClickComments(!clickComments);
  }

  async function handlerAddComments() {
    try {
      const { data } = await api.patch(
        `/activities/tasks/addComment/${task.id}`,
        {
          comment,
        }
      );
      notify(`${data.msg}`, "success");
      setComment("");
      dispatch(getBoard());
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Container>
      <Dialog open={openModal} onClose={handlerCloseModal} fullWidth>
        <DialogTitle
          sx={{
            // p: 5,
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Detalhes da tarefa
          </Typography>

          <IconButton
            label="Editar tarefa"
            aria-label="Editar tarefa"
            onClick={handlerOpenEditTask}
            disabled={
              task.belongsToMe === false || task.status === "FINALIZADO"
            }
          >
            <EditIcon />
          </IconButton>
        </DialogTitle>

        <Divider />

        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="subtitle2"> Tarefa: </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2" color="text.primary">
                {task.name}
              </Typography>
            </Grid>

            {task.description && (
              <>
                <Grid item xs={6}>
                  <Typography variant="subtitle2"> Descrição: </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.primary">
                    {task.description}
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item xs={6}>
              <Typography variant="subtitle2"> Status: </Typography>
            </Grid>

            <Grid item xs={6}>
              <Box
                sx={{
                  backgroundColor:
                    task.status === "PENDENTE"
                      ? "#FF1A43"
                      : task.status === "EM ANDAMENTO"
                      ? "#33C2FF"
                      : "#57CA22",
                  marginRight: "50%",
                  borderRadius: "5px",
                }}
              >
                {" "}
                <Typography
                  variant="subtitle2"
                  // color="text.primary"
                  align="center"
                  sx={{
                    color: "#FFF",
                    fontWeight: "bold",
                  }}
                >
                  {task.status}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2"> Responsável: </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>
                {task.usersToExecute.length > 1
                  ? task.usersToExecute.map((item) => `${item.user} | `)
                  : task.usersToExecute.map((item) => `${item.user}`)}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2"> Criado por: </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>{task.users.user}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="subtitle2"> Criado em: </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography>
                {new Date(task.createdAt).toLocaleString()}
              </Typography>
            </Grid>

            {task.appointmentInfo ? (
              <>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">
                    {" "}
                    Tipo de agendamento:{" "}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    {task.appointmentInfo.type === "daily"
                      ? "Diário"
                      : task.appointmentInfo.type === "weekly"
                      ? "Semanal"
                      : task.appointmentInfo.type === "monthly"
                      ? "Mensal"
                      : task.appointmentInfo.type === "daysOfTheWeek"
                      ? "Dias da semana"
                      : task.appointmentInfo.type === "daysOfTheMonth"
                      ? "Dias do mês"
                      : ""}
                  </Typography>
                </Grid>

                {task.appointmentInfo.type === "daily" ? (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">Iniciar às:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>{task.appointmentInfo.start}</Typography>
                    </Grid>
                  </>
                ) : task.appointmentInfo.type === "weekly" ? (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">
                        Agendado para:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {task.appointmentInfo?.daysOfTheWeek?.map((day) =>
                          String(day)
                            .replace(1, "Domingo")
                            .replace(2, "Segunda-feira")
                            .replace(3, "Terça-feira")
                            .replace(4, "Quarta-feira")
                            .replace(5, "Quinta-feira")
                            .replace(6, "Sexta-feira")
                            .replace(7, "Sábado")
                        )}{" "}
                        às {task.appointmentInfo.start}
                      </Typography>
                    </Grid>
                  </>
                ) : task.appointmentInfo.type === "monthly" ||
                  task.appointmentInfo.type === "daysOfTheMonth" ? (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">
                        Agendado para:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {`Dia(s) ${task.appointmentInfo.daysOfTheMonth.map(
                          (day) => day
                        )} às ${task.appointmentInfo.start}`}
                      </Typography>
                    </Grid>
                  </>
                ) : task.appointmentInfo.type === "daysOfTheWeek" ? (
                  <>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2">
                        Agendado para:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography>
                        {task.appointmentInfo?.daysOfTheWeek?.map((day) =>
                          String(day)
                            .replace(1, "Dom. ")
                            .replace(2, "Seg. ")
                            .replace(3, "Ter. ")
                            .replace(4, "Qua. ")
                            .replace(5, "Qui. ")
                            .replace(6, "Sex.")
                            .replace(7, "Sáb.")
                        )}{" "}
                        às {task.appointmentInfo.start}
                      </Typography>
                    </Grid>
                  </>
                ) : (
                  ""
                )}
              </>
            ) : (
              <>
                <Grid item xs={6}>
                  <Typography variant="subtitle2">
                    {" "}
                    Tipo do agendamento:{" "}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>Agendamento único</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="subtitle2">Agendado para:</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography>
                    {new Date(task.startAt).toLocaleString()}
                  </Typography>
                </Grid>
              </>
            )}

            <Grid item xs={12}>
              <Button
                startIcon={!clickComments ? <AddIcon /> : <RemoveIcon />}
                onClick={handlerClickComments}
              >
                {" "}
                Informações adicionais{" "}
              </Button>
            </Grid>

            <Grid item xs={12}>
              <List
                sx={{
                  width: "100%",
                }}
                component="nav"
                aria-labelledby="nested-list-subheader"
              >
                <Collapse in={clickComments} timeout="auto">
                  {/* HISTORICO */}
                  <Card
                    variant="elevation"
                    style={{ border: "0.5px solid LightGrey" }}
                  >
                    <CardHeader title="Histórico" />
                    <CardContent>
                      <FormControl variant="outlined" fullWidth>
                        <InputLabel>Comentário</InputLabel>
                        <OutlinedInput
                          multiline
                          fullWidth
                          label="Comentários"
                          value={comment}
                          onChange={(event) =>
                            setComment(event.target.value.trimStart())
                          }
                          endAdornment={
                            <>
                              {/* --ANEXOS */}
                              <IconButton aria-label="Anexos" size="small">
                                <AttachFileIcon fontSize="medium" />
                              </IconButton>
                              <Divider orientation="vertical" />

                              {/* --ENVIAR */}
                              <IconButton
                                aria-label="Enviar"
                                size="small"
                                color="primary"
                                onClick={handlerAddComments}
                                disabled={comment.length === 0}
                              >
                                <SendIcon fontSize="medium" />
                              </IconButton>
                            </>
                          }
                        />
                      </FormControl>

                      <br />
                      <br />
                      <Divider />

                      {task.comment.length === 0 ? (
                        <>
                          <Typography> Não há movimentações </Typography>
                          <br />
                        </>
                      ) : (
                        task.comment.map((item, index) => (
                          <Card
                            key={index}
                            variant="elevation"
                            style={{
                              border: "1px solid Gainsboro",
                              margin: "15px",
                            }}
                          >
                            <CardHeader
                              title={item.users.user}
                              subheader={new Date(
                                item.createdAt
                              ).toLocaleString()}
                              titleTypographyProps={{
                                fontSize: "5%",
                                fontWeight: "bold",
                              }}
                              style={{
                                justifyContent: "space-between",
                                display: "flex",
                                alignContent: "flex-start",
                              }}
                            />
                            <Divider />
                            <CardContent>{item.obs}</CardContent>
                          </Card>
                        ))
                      )}
                    </CardContent>
                  </Card>
                </Collapse>
              </List>
            </Grid>
          </Grid>
        </DialogContent>

        <Divider />
        <Box
          style={{
            justifyContent: "space-around",
            display: "flex",
          }}
        >
          <Button
            fullWidth
            onClick={handlerDeleteTask}
            color="error"
            disabled={task.status === "FINALIZADO"}
          >
            Excluir tarefa
          </Button>

          <Divider orientation="vertical" variant="middle" />

          <Button
            fullWidth
            onClick={handlerCompleteTask}
            disabled={task.status === "FINALIZADO"}
          >
            Concluir tarefa
          </Button>
        </Box>
      </Dialog>

      {open && <EditTask getEdit={{ open, setOpen }} getTask={task} />}
    </Container>
  );
}
