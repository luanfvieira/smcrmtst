import {
  Button,
  Card,
  Box,
  CardHeader,
  Typography,
  Avatar,
  Divider,
  Tooltip,
  AvatarGroup,
  ListSubheader,
  ListItem,
  Chip,
  List,
  useTheme,
  styled,
} from "@mui/material";
import Label from "src/components/Label";
import Text from "src/components/Text";
import { Link as RouterLink } from "react-router-dom";
import { useSnackbar } from "notistack";
import { format, subDays } from "date-fns";

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.5)};
    height: ${theme.spacing(1.5)};
    display: inline-block;
    margin-right: ${theme.spacing(1)};
    margin-top: -${theme.spacing(0.1)};
`
);

const BoxItemWrapper = styled(Box)(
  ({ theme }) => `
    border-radius: ${theme.general.borderRadius};
    background: ${theme.colors.alpha.black[5]};
    position: relative;
    padding: ${theme.spacing(2)};
    width: 100%;
    
    &::before {
      content: '.';
      background: ${theme.colors.error.main};
      color: ${theme.colors.error.main};
      border-radius: ${theme.general.borderRadius};
      position: absolute;
      text-align: center;
      width: 6px;
      left: 0;
      height: 100%;
      top: 0;
    }
    
    &.wrapper-info {
      &:before {
        background: ${theme.colors.info.main};
        color: ${theme.colors.info.main};
      }
    }
        
    &.wrapper-warning {
      &:before {
        background: ${theme.colors.warning.main};
        color: ${theme.colors.warning.main};
      }
    }
`
);

function Appointments() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    enqueueSnackbar("You clicked on delete!", {
      variant: "error",
    });
  };

  const handleClick = () => {
    enqueueSnackbar("You clicked on the chip!", {
      variant: "success",
    });
  };

  return (
    <Card>
      <CardHeader
        sx={{
          display: { xs: "block", sm: "flex" },
        }}
        action={
          <Box
            sx={{
              pt: { xs: 2, sm: 0 },
            }}
            display="flex"
            alignItems="center"
          >
            <AvatarGroup
              max={6}
              sx={{
                mr: 2,
              }}
            >
              <Tooltip arrow title={`View profile for Remy Sharp`}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Remy Sharp"
                  src="/static/images/avatars/1.jpg"
                />
              </Tooltip>
              <Tooltip arrow title={`View profile for Travis Howard`}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Travis Howard"
                  src="/static/images/avatars/2.jpg"
                />
              </Tooltip>
              <Tooltip arrow title={"View profile for Cindy Baker"}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Cindy Baker"
                  src="/static/images/avatars/3.jpg"
                />
              </Tooltip>
              <Tooltip arrow title={"View profile for Agnes Walker"}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Agnes Walker"
                  src="/static/images/avatars/4.jpg"
                />
              </Tooltip>
              <Tooltip arrow title={"View profile for Trevor Henderson"}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Trevor Henderson"
                  src="/static/images/avatars/5.jpg"
                />
              </Tooltip>
              <Tooltip arrow title={`View profile for Remy Sharp`}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Remy Sharp"
                  src="/static/images/avatars/1.jpg"
                />
              </Tooltip>
              <Tooltip arrow title={`View profile for Remy Sharp`}>
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                  }}
                  component={RouterLink}
                  to="#"
                  alt="Remy Sharp"
                  src="/static/images/avatars/2.jpg"
                />
              </Tooltip>
            </AvatarGroup>
            <Button size="small" variant="contained">
              View Patients
            </Button>
          </Box>
        }
        title="Appointments"
      />
      <Divider />
      <List component="div" disablePadding>
        <ListSubheader
          component="div"
          color="primary"
          sx={{
            background: `${theme.colors.alpha.white[100]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>Upcoming Appointments</Box>
          <Box>
            <Label color="warning">Today</Label>
          </Box>
        </ListSubheader>
        <Divider />
        <ListItem
          component="div"
          sx={{
            pt: 2,
            pb: 0,
          }}
        >
          <BoxItemWrapper>
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <Tooltip
                arrow
                placement="top"
                title="Appointment has been confirmed with the Patient."
              >
                <DotLegend
                  style={{ background: `${theme.colors.success.main}` }}
                />
              </Tooltip>
              <span>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Veronica Culhane
                </Typography>{" "}
                - "General Checkup"
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                pl: 2.3,
                py: 1,
              }}
            >
              10:00 AM - <b>45 mins</b>
            </Typography>
            <Box
              sx={{
                pl: 2.3,
              }}
            >
              <Chip
                variant="outlined"
                sx={{
                  mr: 0.5,
                }}
                size="small"
                label="Reports"
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
              <Chip
                variant="outlined"
                sx={{
                  mr: 0.5,
                }}
                size="small"
                label="High Risk Patient"
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </Box>
          </BoxItemWrapper>
        </ListItem>
        <ListItem
          component="div"
          sx={{
            pt: 2,
            pb: 0,
          }}
        >
          <BoxItemWrapper className="wrapper-warning">
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <Tooltip
                arrow
                placement="top"
                title="Appointment has been canceled!"
              >
                <DotLegend
                  style={{ background: `${theme.colors.error.main}` }}
                />
              </Tooltip>
              <span>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Bonnie Bryan
                </Typography>{" "}
                - "General Checkup"
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                pl: 2.3,
                py: 1,
              }}
            >
              11:30 AM - <b>90 mins</b>
            </Typography>
            <Box
              sx={{
                pl: 2.3,
              }}
            >
              <Chip
                variant="outlined"
                sx={{
                  mr: 0.5,
                }}
                size="small"
                label="Chronic Patient"
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
              <Chip
                variant="outlined"
                sx={{
                  mr: 0.5,
                }}
                size="small"
                label="Medical History"
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </Box>
          </BoxItemWrapper>
        </ListItem>
        <Divider
          sx={{
            mt: 2,
          }}
        />
        <ListSubheader
          component="div"
          color="primary"
          sx={{
            background: `${theme.colors.alpha.white[100]}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box>Past Appointments</Box>
          <Box>
            <Text color="black">
              {format(subDays(new Date(), 14), "MMMM dd yyyy")}
            </Text>
          </Box>
        </ListSubheader>
        <Divider />
        <ListItem
          component="div"
          sx={{
            py: 2,
          }}
        >
          <BoxItemWrapper className="wrapper-info">
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                alignItems: "center",
                mr: 2,
              }}
            >
              <DotLegend
                style={{ background: `${theme.colors.success.main}` }}
              />
              <span>
                <Typography
                  component="span"
                  sx={{
                    fontWeight: "bold",
                  }}
                >
                  Wesley Joyce
                </Typography>{" "}
                - Surgery
              </span>
            </Typography>
            <Typography
              variant="h6"
              sx={{
                pl: 2.3,
                py: 1,
              }}
            >
              09:30 AM - <b>60 mins</b>
            </Typography>
            <Box
              sx={{
                pl: 2.3,
              }}
            >
              <Chip
                variant="outlined"
                sx={{
                  mr: 0.5,
                }}
                size="small"
                label="Medical History"
                color="primary"
                onClick={handleClick}
                onDelete={handleDelete}
              />
            </Box>
          </BoxItemWrapper>
        </ListItem>
        <Divider />
      </List>
    </Card>
  );
}

export default Appointments;
