/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { useNotification } from "src/hooks/useNotification";

import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  Grid,
  TextField,
} from "@mui/material";

import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import api from "src/utils/api";
import { empty } from "src/utils/empty";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

function UserRegistration() {
  const [notify] = useNotification();
  const [user, setUser] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRoles] = useState([]);
  const [roleSelected, setRolesSelected] = useState([]);

  useEffect(() => {
    async function getUsersRoles() {
      const { data } = await api.get("/info/roles");

      setRoles(data.roles);
    }
    getUsersRoles();
  }, []);

  async function handlerCreateUser() {
    try {
      const { data } = await api.post(`/config/users`, {
        user,
        name,
        email,
        rolesIds: roleSelected.map((role) => role.id),
      });

      notify(data?.msg, "success");

      setUser("");
      setName("");
      setEmail("");
      setRolesSelected([]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Helmet>
        <title>Cadastro - Usuários</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
      <Box
        sx={{
          p: 2,
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
            alignItems: "center",
            display: "flex",
          }}
        >
          <Grid item xs={6}>
            <Grid
              container
              spacing={2}
              sx={{
                justifyContent: "center",
                alignItems: "center",
                display: "flex",
              }}
            >
              <Grid item xs={8}>
                <TextField
                  name="name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);

                    if (empty(e.target.value)) return;

                    let user = e.target.value
                      .trim()
                      .split(" ")[0]
                      .toLocaleLowerCase();
                    user +=
                      "." +
                      e.target.value
                        .trim()
                        .split(" ")
                        .pop()
                        .toLocaleLowerCase();

                    setUser(user);
                  }}
                  label="Nome"
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <TextField
                  name="user"
                  value={user}
                  onChange={(e) => setUser(e.target.value)}
                  label="Usuário"
                  variant="outlined"
                  type="text"
                  fullWidth
                />
              </Grid>

              <Grid item xs={8}>
                <TextField
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  label="Email"
                  variant="outlined"
                  type="email"
                  fullWidth
                />
              </Grid>
              <Grid item xs={8}>
                <Autocomplete
                  multiple
                  options={role}
                  disableCloseOnSelect
                  value={roleSelected}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => {
                    if (value === null) {
                      return;
                    }

                    setRolesSelected(value);
                  }}
                  renderOption={(props, option, { selected }) => (
                    <li {...props}>
                      <Checkbox
                        icon={icon}
                        checkedIcon={checkedIcon}
                        style={{ marginRight: 8 }}
                        checked={selected}
                      />
                      {option.name}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Papeis"
                      placeholder="Selecione os papeis"
                    />
                  )}
                />
                {/* <Autocomplete
                  multiple
                  fullWidth
                  // limitTags={2}
                  value={roleSelected}
                  options={role}
                  getOptionLabel={(option) => option.name}
                  // onChange={(e, value) => {
                  //   if (value === null) {
                  //     return;
                  //   }

                  //   console.log(value);
                  //   // setRolesSelected((oldState) => oldState.concat(value));
                  // }}
                  onChange={(event, value) => {
                    if (value === null) {
                      return;
                    }

                    console.log(value);
                    setRolesSelected(value);
                  }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      fullWidth
                      variant="outlined"
                      // value={values.names}
                      label="Papeis"
                      placeholder="Selecione os papeis"
                    />
                  )}
                /> */}
              </Grid>
              <Grid item xs={8}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={handlerCreateUser}
                >
                  Cadastrar
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default UserRegistration;
