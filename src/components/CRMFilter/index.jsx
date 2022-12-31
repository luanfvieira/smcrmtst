import {
  Box,
  Button,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import FilterAltOffIconIcon from "@mui/icons-material/FilterAltOff";
import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "src/utils/api";
import { formatAlias } from "src/utils/formatAlias";
import { DatePicker } from "@mui/lab";

export const CRMFilter = ({
  setFilterStartDate,
  setFilterEndDate,
  setCompany,
  setStatus,
  setAgent,
  isChangedStatus = true,
}) => {
  const [, setSearchParams] = useSearchParams();

  const actionRef1 = useRef(null);
  const [companies, setCompanies] = useState([]);
  const [leadStatus, setLeadStatus] = useState([]);
  const [customersPortfolio, setCustomersPortfolio] = useState([]);

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [openPeriod, setOpenMenuPeriod] = useState(false);

  const [companyFiltered, setCompanyFiltered] = useState({
    status: null,
  });

  const [statusFiltered, setStatusFiltered] = useState({
    status: null,
  });

  const [customersPortfolioFiltered, setCustomersPortfolioFiltered] = useState({
    status: null,
  });

  const handleFilterCompany = (e) => {
    let value = null;

    if (e.target.value !== "TODOS") {
      value = e.target.value;
    }

    setCompanyFiltered((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  const handleFilterStatus = (e) => {
    let value = isChangedStatus ? null : "NEGOCIADO,FINALIZADO,EXPIRADO";

    if (e.target.value !== "TODOS") {
      value = e.target.value;
    }

    setStatusFiltered((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  useEffect(() => {
    async function getFilterData() {
      const response = await Promise.all([
        api.get("info/companies?onlyAllowed=true"),
        api.get("info/leadsTypesStatus"),
        api.get("info/customersPortfolio/all"),
      ]);

      setCompanies([
        {
          id: "TODOS",
          name: "TODOS",
          fantasyName: null,
          alias: "TODOS",
          group: null,
          identifier: null,
        },
        ...response[0].data?.companies,
      ]);

      setLeadStatus([
        {
          id: "TODOS",
        },
        ...response[1].data?.leadsTypesStatus.filter((item) =>
          isChangedStatus
            ? true
            : ["NEGOCIADO", "FINALIZADO", "EXPIRADO"].includes(item.id)
        ),
      ]);

      setCustomersPortfolio([
        {
          users: {
            id: "TODOS",
            user: "TODOS",
          },
        },
        {
          users: {
            id: "SEM_REPRESENTANTE",
            user: "SEM REPRESENTANTE",
          },
        },
        ...response[2].data?.customersPortfolio,
      ]);
    }

    getFilterData();
  }, [isChangedStatus]);

  const handleFilterCustomersPortfolio = (e) => {
    let value = null;

    if (e.target.value !== "TODOS") {
      value = e.target.value;
    }

    setCustomersPortfolioFiltered((prevFilters) => ({
      ...prevFilters,
      status: value,
    }));
  };

  function handleFilter() {
    setFilterStartDate(startDate);
    setFilterEndDate(endDate);
    setCompany(companyFiltered.status);
    // setStatus(statusFiltered.status);
    setAgent(customersPortfolioFiltered.status);

    if (isChangedStatus || !!statusFiltered.status) {
      setStatus(statusFiltered.status);
    } else {
      setStatus("NEGOCIADO,FINALIZADO,EXPIRADO");
    }

    setSearchParams({
      filterStartDate: startDate,
      filterEndDate: endDate,
      company: companyFiltered.status,
      status: isChangedStatus
        ? statusFiltered.status
        : "NEGOCIADO,FINALIZADO,EXPIRADO",
      agent: customersPortfolioFiltered.status,
    });
    setOpenMenuPeriod(false);
  }

  function handleClearFilter() {
    setFilterStartDate(null);
    setFilterEndDate(null);
    setCompany(null);

    setAgent(null);

    setStartDate("");
    setEndDate("");

    if (isChangedStatus) {
      setStatus(null);
    } else {
      setStatus("NEGOCIADO,FINALIZADO,EXPIRADO");
    }

    setStatusFiltered((prevFilters) => ({
      ...prevFilters,
      status: null,
    }));

    setCompanyFiltered((prevFilters) => ({
      ...prevFilters,
      status: null,
    }));

    setCustomersPortfolioFiltered((prevFilters) => ({
      ...prevFilters,
      status: null,
    }));

    setSearchParams({});
    setOpenMenuPeriod(false);
  }

  return (
    <CardHeader
      action={
        <>
          <Button
            sx={{ marginRight: 2 }}
            onClick={() => handleClearFilter()}
            variant="outlined"
            size="small"
            endIcon={<FilterAltOffIconIcon fontSize="small" />}
          >
            Limpar Filtros
          </Button>
          <Button
            size="small"
            variant="outlined"
            ref={actionRef1}
            onClick={() => setOpenMenuPeriod(true)}
            endIcon={<FilterAltTwoToneIcon fontSize="small" />}
          >
            Filtros
          </Button>
          <Menu
            disableScrollLock
            anchorEl={actionRef1?.current}
            onClose={() => setOpenMenuPeriod(false)}
            open={openPeriod}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Box
              sx={{
                pt: 1,
                minWidth: "360px",
                outline: "none",
              }}
            >
              <Grid container spacing={3}>
                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Filial</InputLabel>
                    <Select
                      label="Type"
                      value={companyFiltered.status || "TODOS"}
                      onChange={handleFilterCompany}
                    >
                      {companies?.map((company) => (
                        <MenuItem key={company.id} value={company.alias}>
                          {company.alias === "TODOS"
                            ? company.alias
                            : `${formatAlias(company.alias)} - ${company.name}`}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Status</InputLabel>
                    <Select
                      label="Customers"
                      value={statusFiltered.status || "TODOS"}
                      onChange={handleFilterStatus}
                      // disabled={!isChangedStatus}
                    >
                      {leadStatus?.map((statusOption) => (
                        <MenuItem key={statusOption.id} value={statusOption.id}>
                          {statusOption.id}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <DatePicker
                      value={startDate}
                      onChange={(date) => setStartDate(date)}
                      label="Data inicial"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          variant="outlined"
                          name="start"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <DatePicker
                      value={endDate}
                      onChange={(date) => setEndDate(date)}
                      label="Data final"
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          margin="normal"
                          variant="outlined"
                          name="end"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item md={6}>
                  <FormControl fullWidth variant="outlined" size="small">
                    <InputLabel>Resp.</InputLabel>
                    <Select
                      label="Customers"
                      value={customersPortfolioFiltered.status || "TODOS"}
                      onChange={handleFilterCustomersPortfolio}
                    >
                      {customersPortfolio?.map((statusOption) => (
                        <MenuItem
                          key={statusOption?.users?.id}
                          value={statusOption?.users?.id}
                        >
                          {statusOption.users.user}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
              <Divider
                sx={{
                  mb: 2,
                  mt: 2,
                }}
              />
              <Box
                pb={1}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Button
                  onClick={() => handleFilter()}
                  variant="contained"
                  size="small"
                >
                  Filtrar resultados
                </Button>
              </Box>
            </Box>
          </Menu>
        </>
      }
    />
  );
};
