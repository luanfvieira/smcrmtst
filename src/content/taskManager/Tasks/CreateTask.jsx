/* eslint-disable no-unused-vars */
import {
  Button,
  DialogContent,
  TextField,
  DialogActions,
  CircularProgress,
  InputLabel,
  Checkbox,
  FormControl,
  Select,
  FormControlLabel,
  FormGroup,
  Box,
  Typography,
  Divider,
  Stack,
  OutlinedInput,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import { useState, useEffect } from "react";
import { Formik } from "formik";
import * as Yup from "yup";
import { DateTimePicker, TimePicker } from "@mui/lab";
import api from "src/utils/api";

import wait from "src/utils/wait";
import { getBoard } from "src/slices/projects_board";
import { useDispatch } from "src/store";
import { useNotification } from "src/hooks/useNotification";
import { empty } from "src/utils/empty";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

const types = [
  { type: "Diário", value: "daily" },
  { type: "Semanal", value: "weekly" },
  { type: "Mensal", value: "monthly" },
  { type: "Dias da semana", value: "daysOfTheWeek" },
  { type: "Dias do mês", value: "daysOfTheMonth" },
];

const daysWeek = [
  { day: "Domingo", value: 1 },
  { day: "Segunda-feira", value: 2 },
  { day: "Terça-feira", value: 3 },
  { day: "Quarta-feira", value: 4 },
  { day: "Quinta-feira", value: 5 },
  { day: "Sexta-feira", value: 6 },
  { day: "Sábado", value: 7 },
];

const days = [
  { day: 1 },
  { day: 2 },
  { day: 3 },
  { day: 4 },
  { day: 5 },
  { day: 6 },
  { day: 7 },
  { day: 8 },
  { day: 9 },
  { day: 10 },
  { day: 11 },
  { day: 12 },
  { day: 13 },
  { day: 14 },
  { day: 15 },
  { day: 16 },
  { day: 17 },
  { day: 18 },
  { day: 19 },
  { day: 20 },
  { day: 21 },
  { day: 22 },
  { day: 23 },
  { day: 24 },
  { day: 25 },
  { day: 26 },
  { day: 27 },
  { day: 28 },
  { day: 29 },
  { day: 30 },
  { day: 31 },
];

export default function DrawerHead({ getOpen }) {
  const [notify] = useNotification();
  const [isChecked, setIsChecked] = useState(false);
  const [startAt, setStartAt] = useState("");
  const [endAt, setEndAt] = useState("");
  const [usersToExecute, setUsersToExecute] = useState([]);
  const [type, setType] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [daysOfTheWeek, setDaysOfTheWeek] = useState([]);
  const [daysOfTheMonth, setDaysOfTheMonth] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [listUsers, setListUsers] = useState([]);
  const [listCategories, setListCategories] = useState([]);
  const [listPriorities, setListPriorities] = useState([]);

  const dispatch = useDispatch();

  const { open, setOpen } = getOpen;

  const handleCreateTaskOpen = () => {
    setOpen(true);
  };

  const handleCreateTaskClose = () => {
    setOpen(false);
    setIsChecked(false);
    setType("");
    setStart("");
    setEnd("");
    setUsersToExecute([]);
    setDaysOfTheWeek([]);
    setDaysOfTheMonth([]);
    setPriority("");
    setCategory("");
    setTitle("");
  };

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await api.get(
          // `http://11.0.11.59:3333/info/users?onlyAllowed=true`
          `info/users?onlyAllowed=true`
        );
        setListUsers(response?.data?.users);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  useEffect(() => {
    async function getCategories() {
      try {
        const { data } = await api.get(
          `info/tasksCategories`
          // `http://11.0.11.59:3333/info/tasksCategories`
        );
        setListCategories(data.tasksCategories);
      } catch (error) {
        console.log(error);
      }
    }
    getCategories();
  }, []);

  useEffect(() => {
    async function getPriorities() {
      try {
        const { data } = await api.get(
          `info/tasksPriorities`
          // `http://11.0.11.59:3333/info/tasksCategories`
        );
        setListPriorities(data.tasksPriorities);
      } catch (error) {
        console.log(error);
      }
    }
    getPriorities();
  }, []);

  async function handleCreateTaskSuccess(_values) {
    if (isChecked && (empty(startAt) || empty(endAt))) {
      notify("Preenchimento de datas obrigatório!", "warning");
      return;
    }

    try {
      const { data } = await api.post(
        // `http://11.0.11.59:3333/activities/tasks`,
        `/activities/tasks`,
        {
          title,
          unique: isChecked,
          appointmentInfo:
            isChecked === false
              ? {
                  type: type,
                  start: start,
                  end: end,
                  daysOfTheWeek: daysOfTheWeek,
                  daysOfTheMonth: daysOfTheMonth,
                }
              : null,
          category,
          priority,
          usersToExecute,
          description: _values.description,
          startAt: isChecked === true && new Date(startAt)?.toISOString(),
          endAt: isChecked === true && new Date(endAt)?.toISOString(),
        }
      );

      dispatch(getBoard());

      notify(data?.msg, "success");

      setTitle("");
      setType("");
      setStart("");
      setEnd("");
      setUsersToExecute([]);
      setDaysOfTheWeek([]);
      setDaysOfTheMonth([]);
      setIsChecked(false);
      setPriority("");
      setCategory("");
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  }

  const handleChanger = (event) => {
    const {
      target: { value },
    } = event;
    setUsersToExecute(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  if (type === "weekly" && daysOfTheWeek.length > 1) {
    notify(
      `Por favor selecione apenas um dia da semana ou altere o tipo de agendamento para "dias da semana".`,
      "warning"
    );

    setDaysOfTheWeek([]);
  }

  if (type === "monthly" && daysOfTheMonth.length > 1) {
    notify(
      `Por favor selecione apenas um dia ou altere  o tipo de agendamento para "dias do mês".`,
      "warning"
    );

    setDaysOfTheMonth([]);
  }

  return (
    <Box>
      <SwipeableDrawer
        anchor="right"
        open={open}
        onOpen={handleCreateTaskOpen}
        onClose={handleCreateTaskClose}
        sx={{ width: "80%" }}
      >
        <Formik
          initialValues={{
            submit: null,
          }}
          onSubmit={async (
            _values,
            { resetForm, setErrors, setStatus, setSubmitting }
          ) => {
            try {
              await wait(1000);
              resetForm();
              setStatus({ success: true });
              setSubmitting(false);
              handleCreateTaskSuccess(_values);
            } catch (error) {
              console.log(error);
              setStatus({ success: false });
              setErrors({ submit: error.message });
              setSubmitting(false);
            }
          }}
        >
          {({
            errors,
            handleBlur,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue,
            touched,
            values,
          }) => (
            <form onSubmit={handleSubmit} style={{ margin: [0, 5, 0, 5] }}>
              <Box p={3}>
                <Typography variant="h4">Adicionar uma nova tarefa</Typography>
              </Box>
              <Divider />
              <DialogContent
                dividers
                sx={{
                  p: 3,
                }}
              >
                <Stack spacing={2}>
                  <TextField
                    fullWidth
                    name="title"
                    onBlur={handleBlur}
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                    variant="outlined"
                    label="Título"
                  />

                  <FormGroup
                    style={{
                      alignContent: "center",
                      justifyContent: "center",
                    }}
                  >
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={isChecked}
                          onChange={(event) =>
                            setIsChecked(event.target.checked)
                          }
                          inputProps={{ "aria-label": "controlled" }}
                        />
                      }
                      label="Agendamento Único"
                    />
                  </FormGroup>

                  <TextField
                    fullWidth
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                    variant="outlined"
                    label="Descrição"
                    multiline
                  />

                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Responsáveis
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      multiple
                      multiline
                      value={usersToExecute}
                      onChange={handleChanger}
                      input={<OutlinedInput label="Responsáveis" />}
                      MenuProps={MenuProps}
                    >
                      {listUsers.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Categorias
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      input={<OutlinedInput label="Categorias" />}
                      MenuProps={MenuProps}
                    >
                      {listCategories.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel id="demo-multiple-name-label">
                      Prioridade
                    </InputLabel>
                    <Select
                      fullWidth
                      labelId="demo-multiple-name-label"
                      id="demo-multiple-name"
                      value={priority}
                      onChange={(e) => setPriority(e.target.value)}
                      input={<OutlinedInput label="Prioridade" />}
                      MenuProps={MenuProps}
                    >
                      {listPriorities.map((item, i) => (
                        <MenuItem key={i} value={item.id}>
                          {item.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  {isChecked === false && (
                    <>
                      <FormControl sx={{ m: 1, width: 300 }}>
                        <InputLabel id="demo-multiple-name-label">
                          Tipo de agendamento
                        </InputLabel>
                        <Select
                          labelId="demo-multiple-name-label"
                          id="demo-multiple-name"
                          value={type}
                          onChange={(event) => setType(event.target.value)}
                          input={<OutlinedInput label="Tipo de agendamento" />}
                          MenuProps={MenuProps}
                        >
                          <MenuItem default>Nenhum</MenuItem>
                          {types.map((item, index) => (
                            <MenuItem key={index} value={item.value}>
                              {item.type}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {type === "daily" && (
                        <>
                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </>
                      )}

                      {type === "weekly" && (
                        <>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">
                              Dia da semana
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              value={daysOfTheWeek}
                              multiple
                              onChange={(event) =>
                                setDaysOfTheWeek(event.target.value)
                              }
                              input={<OutlinedInput label="Dia da semana" />}
                              MenuProps={MenuProps}
                            >
                              <MenuItem default>Nenhum</MenuItem>
                              {daysWeek.map((item, index) => (
                                <MenuItem key={index} value={item.value}>
                                  {item.day}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </>
                      )}

                      {type === "monthly" && (
                        <>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">
                              Dia da tarefa
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              value={daysOfTheMonth}
                              multiple
                              onChange={(event) =>
                                setDaysOfTheMonth(event.target.value)
                              }
                              input={<OutlinedInput label="Dia da tarefa" />}
                              MenuProps={MenuProps}
                            >
                              <MenuItem default>Nenhum</MenuItem>
                              {days.map((item, index) => (
                                <MenuItem key={index} value={item.day}>
                                  {item.day}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </>
                      )}

                      {type === "daysOfTheWeek" && (
                        <>
                          <FormControl
                            sx={{ m: 1, width: 300 }}
                            error={
                              type === "daysOfTheWeek" &&
                              daysOfTheWeek.length <= 1 &&
                              daysOfTheWeek.length > 0
                            }
                          >
                            <InputLabel id="demo-multiple-name-label">
                              Dias da semana
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              value={daysOfTheWeek}
                              multiple
                              onChange={(event) =>
                                setDaysOfTheWeek(event.target.value)
                              }
                              input={<OutlinedInput label="Dias da semana" />}
                              MenuProps={MenuProps}
                            >
                              <MenuItem default>Nenhum</MenuItem>
                              {daysWeek.map((item, index) => (
                                <MenuItem key={index} value={item.value}>
                                  {item.day}
                                </MenuItem>
                              ))}
                            </Select>
                            <FormHelperText>
                              {type === "daysOfTheWeek" &&
                                daysOfTheWeek.length <= 1 &&
                                daysOfTheWeek.length > 0 &&
                                "Favor selecionar dois ou mais dias."}
                            </FormHelperText>
                          </FormControl>

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </>
                      )}

                      {type === "daysOfTheMonth" && (
                        <>
                          <FormControl sx={{ m: 1, width: 300 }}>
                            <InputLabel id="demo-multiple-name-label">
                              Dias da tarefa
                            </InputLabel>
                            <Select
                              labelId="demo-multiple-name-label"
                              id="demo-multiple-name"
                              value={daysOfTheMonth}
                              multiple
                              onChange={(event) =>
                                setDaysOfTheMonth(event.target.value)
                              }
                              input={<OutlinedInput label="Dias da tarefa" />}
                              MenuProps={MenuProps}
                            >
                              <MenuItem default>Nenhum</MenuItem>
                              {days.map((item, index) => (
                                <MenuItem key={index} value={item.day}>
                                  {item.day}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={start}
                            onChange={(e) => setStart(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />

                          <TextField
                            label="Iniciar às"
                            type="time"
                            value={end}
                            onChange={(e) => setEnd(e.target.value)}
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </>
                      )}
                    </>
                  )}

                  {isChecked === true && (
                    <>
                      <TextField
                        id="date"
                        variant="outlined"
                        label="Data de início do evento"
                        type="datetime-local"
                        fullWidth
                        value={startAt}
                        helperText={
                          endAt < startAt &&
                          "Data término não pode ser menor que a data inicial."
                        }
                        onChange={(e) => setStartAt(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                      />

                      <TextField
                        id="date"
                        variant="outlined"
                        label="Data de término do evento"
                        type="datetime-local"
                        fullWidth
                        value={endAt}
                        onChange={(e) => setEndAt(e.target.value)}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        error={endAt < startAt}
                        helperText={
                          endAt < startAt &&
                          "Data término não pode ser menor que a data inicial."
                        }
                      />
                    </>
                  )}
                </Stack>
              </DialogContent>
              <DialogActions
                sx={{
                  p: 3,
                }}
              >
                <Button color="secondary" onClick={handleCreateTaskClose}>
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  startIcon={
                    isSubmitting ? <CircularProgress size="1rem" /> : null
                  }
                  disabled={Boolean(errors.submit) || isSubmitting}
                  variant="contained"
                >
                  Adicionar nova tarefa
                </Button>
              </DialogActions>
            </form>
          )}
        </Formik>
      </SwipeableDrawer>
    </Box>
  );
}
