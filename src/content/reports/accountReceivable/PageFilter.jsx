import { LocalizationProvider } from "@mui/lab";
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { useState } from "react";

const getListClients = [
  { label: "Fulano de tal", value: 1 },
  { label: "Ciclano da norte", value: 2 },
];

const getListGroup = [
  { label: "Fulano de tal", value: 1 },
  { label: "Ciclano da norte", value: 2 },
];

const getCompanies = [
  { label: "0101 - Marajo Ap.Gyn", value: "0101" },
  { label: "0201 - Marajó Belém", value: "0201" },
];

const getTypes = [
  { label: "RA", value: "RA" },
  { label: "CC", value: "CC" },
];

export default function PageFilter() {
  const [startAt, setStartAt] = useState(null);
  const [endAt, setEndAt] = useState(null);
  const [dateType, setDateType] = useState("");

  return (
    <Container
      sx={{
        justifyContent: "center",
        display: "flex",
        alignContent: "center",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Autocomplete
            options={getListClients}
            renderInput={(params) => <TextField {...params} label="Cliente" />}
          />
        </Grid>

        <Grid item xs={6}>
          <Autocomplete
            options={getListGroup}
            renderInput={(params) => <TextField {...params} label="Grupo" />}
          />
        </Grid>

        <Grid
          item
          xs={12}
          container
          spacing={2}
          sx={{
            justifyContent: "space-between",
            display: "flex",
          }}
        >
          <Grid item xs={4}>
            <FormControl>
              <FormLabel>Verificar data</FormLabel>
              <RadioGroup
                row
                value={dateType}
                onChange={(e) => setDateType(e.target.value)}
              >
                <FormControlLabel
                  value="EMISSAO"
                  control={<Radio />}
                  label="Emissão"
                />
                <FormControlLabel
                  value="VENCIMENTO"
                  control={<Radio />}
                  label="Vencimento"
                />
                <FormControlLabel
                  value="BAIXA"
                  control={<Radio />}
                  label="Baixa"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={3}>
            <FormLabel>Status</FormLabel>
            <FormGroup row={true}>
              <FormControlLabel control={<Checkbox />} label="Aberto" />
              <FormControlLabel control={<Checkbox />} label="Baixado" />
            </FormGroup>
          </Grid>

          <Grid
            item
            xs={4}
            container
            spacing={2}
            sx={{
              justifyContent: "space-between",
              display: "flex",
            }}
          >
            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data inicial"
                  value={startAt}
                  onChange={(newValue) => {
                    setStartAt(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Data inicial"
                  value={endAt}
                  onChange={(newValue) => {
                    setEndAt(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              multiple
              options={getCompanies}
              renderInput={(params) => (
                <TextField {...params} label="Empresas" />
              )}
            />
          </Grid>

          <Grid item xs={6}>
            <Autocomplete
              multiple
              options={getTypes}
              renderInput={(params) => <TextField {...params} label="Tipos" />}
            />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth color="error">
            Limpar
          </Button>
        </Grid>

        <Grid item xs={6}>
          <Button fullWidth>Buscar</Button>
        </Grid>
      </Grid>
    </Container>
  );
}
