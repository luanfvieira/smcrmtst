import { useRef, useState } from "react";
import {
  Button,
  Card,
  Box,
  Grid,
  CardHeader,
  Menu,
  Link,
  ListItemText,
  List,
  ListItem,
  Tooltip,
  Typography,
  Divider,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import FilterAltTwoToneIcon from "@mui/icons-material/FilterAltTwoTone";
import Text from "src/components/Text";
import { format, subDays } from "date-fns";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";

function PrescriptionRequests() {
  const actionRef1 = useRef(null);
  const [openPeriod, setOpenMenuPeriod] = useState(false);

  const [status, setStatus] = useState("");

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const [type, setType] = useState("");

  const handleType = (event) => {
    setType(event.target.value);
  };

  return (
    <Card>
      <CardHeader
        action={
          <>
            <Button
              size="small"
              variant="outlined"
              ref={actionRef1}
              onClick={() => setOpenMenuPeriod(true)}
              endIcon={<FilterAltTwoToneIcon fontSize="small" />}
            >
              Filters
            </Button>
            <Menu
              disableScrollLock
              anchorEl={actionRef1.current}
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
                      <InputLabel>Type</InputLabel>
                      <Select label="Type" value={type} onChange={handleType}>
                        <MenuItem value={0}>All types</MenuItem>
                        <MenuItem value={1}>
                          Prescription-only medicines
                        </MenuItem>
                        <MenuItem value={2}>Over-the-Counter Drugs</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={6}>
                    <FormControl fullWidth variant="outlined" size="small">
                      <InputLabel>"Status"</InputLabel>
                      <Select
                        label="Status"
                        value={status}
                        onChange={handleStatus}
                      >
                        <MenuItem value={0}>All statuses</MenuItem>
                        <MenuItem value={1}>Active Prescriptions</MenuItem>
                        <MenuItem value={2}>Refill Requests</MenuItem>
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
                    onClick={() => setOpenMenuPeriod(false)}
                    variant="contained"
                    size="small"
                  >
                    Filter results
                  </Button>
                </Box>
              </Box>
            </Menu>
          </>
        }
        title="Prescriptions Requests"
      />
      <Divider />
      <List disablePadding>
        <ListItem
          sx={{
            py: 3,
            pr: 0,
            display: { xs: "block", md: "flex" },
          }}
        >
          <ListItemText
            primary={
              <>
                <Text color="black">
                  <b>Diazepam</b>
                </Text>{" "}
                <span>(Valium)</span>
                <Text color="primary">
                  <Tooltip
                    arrow
                    placement="top"
                    title="Original prescription required!"
                  >
                    <LockTwoToneIcon
                      sx={{
                        ml: 0.5,
                      }}
                      fontSize="small"
                    />
                  </Tooltip>
                </Text>
              </>
            }
            primaryTypographyProps={{
              sx: {
                display: "flex",
                alignItems: "center",
              },
              variant: "body1",
              fontWeight: "bold",
              color: "textSecondary",
              gutterBottom: true,
              noWrap: true,
            }}
            secondary={
              <>
                Last Prescribed:{" "}
                <Text color="black">
                  <b>{format(subDays(new Date(), 15), "MMMM dd yyyy")}</b>
                </Text>
              </>
            }
            secondaryTypographyProps={{ variant: "body2", noWrap: true }}
          />
          <Box
            sx={{
              minWidth: 350,
              mt: { xs: 3, sm: 0 },
            }}
          >
            <Grid container spacing={0}>
              <Grid xs={6} item>
                <Box pl={3}>
                  <Tooltip
                    arrow
                    placement="top"
                    title="View active prescriptions"
                  >
                    <Link variant="h3" underline="none" gutterBottom href="#">
                      51
                    </Link>
                  </Tooltip>
                  <Typography variant="subtitle2">
                    Active Prescriptions
                  </Typography>
                </Box>
              </Grid>
              <Grid
                sx={{
                  position: "relative",
                }}
                xs={6}
                item
              >
                <Divider absolute orientation="vertical" flexItem />
                <Box pl={3}>
                  <Tooltip arrow placement="top" title={"View refill requests"}>
                    <Link variant="h3" underline="none" gutterBottom href="#">
                      9
                    </Link>
                  </Tooltip>
                  <Typography variant="subtitle2">Refill Requests</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            py: 3,
            pr: 0,
            display: { xs: "block", md: "flex" },
          }}
        >
          <ListItemText
            primary={
              <>
                <Text color="black">
                  <b>Adderall</b>
                </Text>{" "}
                <span>(Dextroamphetamine)</span>
                <Text color="primary">
                  <Tooltip
                    arrow
                    placement="top"
                    title="Original prescription required!"
                  >
                    <LockTwoToneIcon
                      sx={{
                        ml: 0.5,
                      }}
                      fontSize="small"
                    />
                  </Tooltip>
                </Text>
              </>
            }
            primaryTypographyProps={{
              sx: {
                display: "flex",
                alignItems: "center",
              },
              variant: "body1",
              fontWeight: "bold",
              color: "textSecondary",
              gutterBottom: true,
              noWrap: true,
            }}
            secondary={
              <>
                Last Prescribed:{" "}
                <Text color="black">
                  <b>{format(subDays(new Date(), 22), "MMMM dd yyyy")}</b>
                </Text>
              </>
            }
            secondaryTypographyProps={{ variant: "body2", noWrap: true }}
          />
          <Box
            sx={{
              minWidth: 350,
              mt: { xs: 3, sm: 0 },
            }}
          >
            <Grid container spacing={0}>
              <Grid xs={6} item>
                <Box pl={3}>
                  <Tooltip
                    arrow
                    placement="top"
                    title={"View active prescriptions"}
                  >
                    <Link variant="h3" underline="none" gutterBottom href="#">
                      14
                    </Link>
                  </Tooltip>
                  <Typography variant="subtitle2">
                    Active Prescriptions
                  </Typography>
                </Box>
              </Grid>
              <Grid
                sx={{
                  position: "relative",
                }}
                xs={6}
                item
              >
                <Divider absolute orientation="vertical" flexItem />
                <Box pl={3}>
                  <Tooltip arrow placement="top" title={"View refill requests"}>
                    <Link variant="h3" underline="none" gutterBottom href="#">
                      2
                    </Link>
                  </Tooltip>
                  <Typography variant="subtitle2">Refill Requests</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Divider />
        <ListItem
          sx={{
            py: 3,
            pr: 0,
            display: { xs: "block", md: "flex" },
          }}
        >
          <ListItemText
            primary={
              <>
                <Text color="black">
                  <b>Oxycontin</b>
                </Text>{" "}
                <span>(Fentanyl)</span>
              </>
            }
            primaryTypographyProps={{
              sx: {
                display: "flex",
                alignItems: "center",
              },
              variant: "body1",
              fontWeight: "bold",
              color: "textSecondary",
              gutterBottom: true,
              noWrap: true,
            }}
            secondary={
              <>
                Last Prescribed:{" "}
                <Text color="black">
                  <b>{format(subDays(new Date(), 34), "MMMM dd yyyy")}</b>
                </Text>
              </>
            }
            secondaryTypographyProps={{ variant: "body2", noWrap: true }}
          />
          <Box
            sx={{
              minWidth: 350,
              mt: { xs: 3, sm: 0 },
            }}
          >
            <Grid container spacing={0}>
              <Grid xs={6} item>
                <Box pl={3}>
                  <Tooltip
                    arrow
                    placement="top"
                    title={"View active prescriptions"}
                  >
                    <Link variant="h3" underline="none" gutterBottom href="#">
                      7
                    </Link>
                  </Tooltip>
                  <Typography variant="subtitle2">
                    Active Prescriptions
                  </Typography>
                </Box>
              </Grid>
              <Grid
                sx={{
                  position: "relative",
                }}
                xs={6}
                item
              >
                <Divider absolute orientation="vertical" flexItem />
                <Box pl={3}>
                  <Tooltip arrow placement="top" title={"View refill requests"}>
                    <Link variant="h3" underline="none" gutterBottom href="#">
                      34
                    </Link>
                  </Tooltip>
                  <Typography variant="subtitle2">Refill Requests</Typography>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </ListItem>
        <Divider />
      </List>
    </Card>
  );
}

export default PrescriptionRequests;
