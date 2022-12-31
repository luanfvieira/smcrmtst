import { format } from "date-fns";
import PropTypes from "prop-types";
import { Grid, IconButton, Tooltip, Typography } from "@mui/material";

import ViewAgendaTwoToneIcon from "@mui/icons-material/ViewAgendaTwoTone";

import ViewDayTwoToneIcon from "@mui/icons-material/ViewDayTwoTone";
import CalendarViewMonthTwoToneIcon from "@mui/icons-material/CalendarViewMonthTwoTone";
import ViewWeekTwoToneIcon from "@mui/icons-material/ViewWeekTwoTone";
import TodayTwoToneIcon from "@mui/icons-material/TodayTwoTone";
import ArrowForwardTwoToneIcon from "@mui/icons-material/ArrowForwardTwoTone";
import ArrowBackTwoToneIcon from "@mui/icons-material/ArrowBackTwoTone";

const viewOptions = [
  {
    label: "Month",
    value: "dayGridMonth",
    icon: CalendarViewMonthTwoToneIcon,
  },
  {
    label: "Week",
    value: "timeGridWeek",
    icon: ViewWeekTwoToneIcon,
  },
  {
    label: "Day",
    value: "timeGridDay",
    icon: ViewDayTwoToneIcon,
  },
  {
    label: "Agenda",
    value: "listWeek",
    icon: ViewAgendaTwoToneIcon,
  },
];

const Actions = ({ date, onNext, onPrevious, onToday, changeView, view }) => {
  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justifyContent="space-between"
    >
      <Grid item>
        <Tooltip arrow placement="top" title="Previous Day">
          <IconButton color="primary" onClick={onPrevious}>
            <ArrowBackTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Today">
          <IconButton
            color="primary"
            sx={{
              mx: 1,
            }}
            onClick={onToday}
          >
            <TodayTwoToneIcon />
          </IconButton>
        </Tooltip>
        <Tooltip arrow placement="top" title="Next Day">
          <IconButton color="primary" onClick={onNext}>
            <ArrowForwardTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Grid>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        <Typography variant="h3" color="text.primary">
          {format(date, "MMMM yyyy")}
        </Typography>
      </Grid>
      <Grid
        item
        sx={{
          display: { xs: "none", sm: "inline-block" },
        }}
      >
        {viewOptions.map((viewOption) => {
          const Icon = viewOption.icon;

          return (
            <Tooltip
              key={viewOption.value}
              arrow
              placement="top"
              title={viewOption.label}
            >
              <IconButton
                color={viewOption.value === view ? "primary" : "secondary"}
                onClick={() => changeView(viewOption.value)}
              >
                <Icon />
              </IconButton>
            </Tooltip>
          );
        })}
      </Grid>
    </Grid>
  );
};

Actions.propTypes = {
  date: PropTypes.instanceOf(Date).isRequired,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  onToday: PropTypes.func,
  changeView: PropTypes.func,
  view: PropTypes.oneOf([
    "dayGridMonth",
    "timeGridWeek",
    "timeGridDay",
    "listWeek",
  ]),
};

Actions.defaultProps = {
  onNext: () => {},
  onPrevious: () => {},
  onToday: () => {},
  handleCreateEvent: () => {},
  changeView: () => {},
};

export default Actions;
