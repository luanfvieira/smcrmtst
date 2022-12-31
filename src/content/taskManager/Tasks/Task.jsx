/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
import { forwardRef, useState } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Box,
  Card,
  Typography,
  CardContent,
  Avatar,
  useTheme,
  AvatarGroup,
  Tooltip,
  Button,
  styled,
  Badge,
} from "@mui/material";
import { useSelector } from "src/store";
import TaskDetails from "./TaskDetails";
import { getBoard } from "src/slices/projects_board";
import { useDispatch } from "react-redux";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";

const ButtonWrapper = styled(Button)(
  ({ theme }) => `
      padding: ${theme.spacing(0.5)} ${theme.spacing(1)};
      min-width: 32px;

      .MuiSvgIcon-root {
        color: ${theme.colors.alpha.black[30]};
        margin-right: ${theme.spacing(1)};
      }

      &:hover {
        .MuiSvgIcon-root {
          color: ${theme.colors.primary.main};
        }
      }
`
);

const DotLegend = styled("span")(
  ({ theme }) => `
    border-radius: 22px;
    width: ${theme.spacing(1.8)};
    height: ${theme.spacing(1.8)};
    display: inline-block;
    margin-right: ${theme.spacing(0.8)};
    border: ${theme.colors.alpha.white[100]} solid 2px;
`
);

const taskSelector = (state, taskId) => {
  const { tasks } = state.projectsBoard;
  const task = tasks.byId[taskId];

  return {
    ...task,
  };
};

const Task = forwardRef(({ taskId, dragging, index, list, ...rest }, ref) => {
  const task = useSelector((state) => taskSelector(state, taskId));

  const [onMenuOpen, menuOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();

  function handlerOpenModal() {
    setOpenModal(true);
    menuOpen(false);
    dispatch(getBoard());
  }

  // console.log(Array(task.tasksPrioritiesId).sort());
  // console.log(Object.keys(task.tasksPrioritiesId).sort());

  console.log(
    Object.entries(task)
      .map((a) => {
        return {
          label: a[0],
          value: a[1],
        };
      })
      .sort((a) => a.value)
  );

  return (
    <>
      <Box key={taskId} ref={ref} {...rest}>
        <Card
          sx={{
            m: 2,
            p: 2,
          }}
          className={clsx({ dragging })}
          raised={dragging}
          variant={dragging ? "elevation" : "outlined"}
        >
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Tooltip title={task.tasksPrioritiesId} arrow placement="top">
              <DotLegend
                onClick={() => console.log(task.tasksPrioritiesId)}
                sx={{
                  background:
                    (task.tasksPrioritiesId === "BAIXA" && "#0CFA00") ||
                    (task.tasksPrioritiesId === "MEDIA" && "#FFCC00") ||
                    (task.tasksPrioritiesId === "ALTA" && "#FF0000"),
                }}
              />
            </Tooltip>
          </Box>
          <CardContent onClick={handlerOpenModal}>
            <Box>
              <Typography variant="h4" gutterBottom noWrap>
                {task.name}
              </Typography>
              <Typography variant="subtitle1" noWrap>
                {task.description}
              </Typography>
            </Box>
          </CardContent>
          <Box
            pt={1}
            display="flex"
            alignItems="baseline"
            justifyContent="space-between"
          >
            <Box py={1}>
              {task.comment.length > 0 && (
                <Tooltip placement="top" arrow title="Comentários">
                  <ButtonWrapper size="small" color="primary">
                    <CommentTwoToneIcon />
                    {task.comment.length}
                  </ButtonWrapper>
                </Tooltip>
              )}
              {/* --Anexos */}
              {/* {task.comment.length > 0 && (
                <Tooltip placement="top" arrow title="Anexos">
                <ButtonWrapper size="small" color="primary">
                <AttachFileTwoToneIcon />
                {task.attachments}
                </ButtonWrapper>
                </Tooltip>
              )} */}
            </Box>

            <Box>
              {task.usersToExecute.length > 0 && (
                <AvatarGroup max={3} total={task.usersToExecute.length}>
                  {task.usersToExecute.map((member) => (
                    <Tooltip
                      arrow
                      placement="top"
                      key={member.id}
                      title={member.user}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                          fontWeight: "bold",
                        }}
                        key={member.id}
                      >
                        {`${member.user
                          .charAt(0)
                          .toUpperCase()}${member.user.charAt(1)}`}
                      </Avatar>
                    </Tooltip>
                  ))}
                </AvatarGroup>
              )}
            </Box>
          </Box>
        </Card>
      </Box>

      <TaskDetails getOpen={{ openModal, setOpenModal }} getTask={{ task }} />
    </>
  );
});

Task.propTypes = {
  taskId: PropTypes.string.isRequired,
  dragging: PropTypes.bool.isRequired,
  index: PropTypes.number,

  list: PropTypes.object.isRequired,
};

Task.defaultProps = {
  dragging: false,
};

export default Task;
