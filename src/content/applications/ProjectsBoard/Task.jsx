import { forwardRef, useState, useRef } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";
import {
  Avatar,
  Box,
  LinearProgress,
  Card,
  Tooltip,
  List as ListWrapper,
  ListItem,
  ListItemText,
  Menu,
  Button,
  IconButton,
  Typography,
  AvatarGroup,
  styled,
} from "@mui/material";
import { formatDistance } from "date-fns";
import { useSelector } from "src/store";
import CommentTwoToneIcon from "@mui/icons-material/CommentTwoTone";
import MoreHorizTwoToneIcon from "@mui/icons-material/MoreHorizTwoTone";
import AttachFileTwoToneIcon from "@mui/icons-material/AttachFileTwoTone";
import FormatListBulletedTwoToneIcon from "@mui/icons-material/FormatListBulletedTwoTone";
import VisibilityTwoToneIcon from "@mui/icons-material/VisibilityTwoTone";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import ArchiveTwoToneIcon from "@mui/icons-material/ArchiveTwoTone";

const taskSelector = (state, taskId) => {
  const { tasks, members } = state.projectsBoard;
  const task = tasks.byId[taskId];

  return {
    ...task,
    members: task.memberIds.map((memberId) => members.byId[memberId]),
  };
};

const LinearProgressWrapper = styled(LinearProgress)(
  ({ theme }) => `
      flex-grow: 1;
      height: 8px;
      background-color: ${theme.colors.alpha.black[10]};

      .MuiLinearProgress-barColorPrimary {
        background-color: ${theme.colors.primary.main};
        border-top-right-radius: ${theme.general.borderRadius};
        border-bottom-right-radius: ${theme.general.borderRadius};
      }
`
);

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

const Task = forwardRef(({ taskId, dragging, index, list, ...rest }, ref) => {
  const task = useSelector((state) => taskSelector(state, taskId));

  const [onMenuOpen, menuOpen] = useState(false);
  const moreRef = useRef(null);

  const openMenu = () => {
    menuOpen(true);
  };

  const closeMenu = () => {
    menuOpen(false);
  };

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
          <Typography variant="h4" gutterBottom noWrap>
            {task.name}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {task.description}
          </Typography>
          <Box py={1}>
            {task.comments > 0 && (
              <Tooltip placement="top" arrow title="Comments">
                <ButtonWrapper size="small" color="primary">
                  <CommentTwoToneIcon />
                  {task.comments}
                </ButtonWrapper>
              </Tooltip>
            )}
            {task.attachments > 0 && (
              <Tooltip placement="top" arrow title="File attachments">
                <ButtonWrapper size="small" color="primary">
                  <AttachFileTwoToneIcon />
                  {task.attachments}
                </ButtonWrapper>
              </Tooltip>
            )}
            {task.sub_items > 0 && (
              <Tooltip placement="top" arrow title="Subtasks">
                <ButtonWrapper size="small" color="primary">
                  <FormatListBulletedTwoToneIcon />
                  {task.sub_items}
                </ButtonWrapper>
              </Tooltip>
            )}
          </Box>
          <Box>
            <Typography variant="subtitle1">
              Due{" "}
              {formatDistance(task.due_date, new Date(), { addSuffix: true })}
            </Typography>
            <LinearProgressWrapper
              value={task.progress}
              color="primary"
              variant="determinate"
            />
          </Box>
          <Box
            pt={2}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box>
              {task.members.length > 0 && (
                <AvatarGroup max={4}>
                  {task.members.map((member) => (
                    <Tooltip
                      arrow
                      placement="top"
                      key={member.name}
                      title={member.name}
                    >
                      <Avatar
                        sx={{
                          width: 30,
                          height: 30,
                        }}
                        key={member.id}
                        src={member.avatar}
                      />
                    </Tooltip>
                  ))}
                </AvatarGroup>
              )}
            </Box>
            <IconButton
              color="inherit"
              size="small"
              onClick={openMenu}
              ref={moreRef}
            >
              <MoreHorizTwoToneIcon fontSize="small" />
            </IconButton>
          </Box>
        </Card>
      </Box>
      <Menu
        disableScrollLock
        keepMounted
        anchorEl={moreRef.current}
        open={onMenuOpen}
        onClose={closeMenu}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
      >
        <ListWrapper
          sx={{
            p: 1,
          }}
          component="nav"
        >
          <ListItem button>
            <VisibilityTwoToneIcon />
            <ListItemText primary="View details" />
          </ListItem>
          <ListItem button>
            <ArchiveTwoToneIcon />
            <ListItemText primary="Move to archive" />
          </ListItem>
          <ListItem button>
            <DeleteForeverTwoToneIcon />
            <ListItemText primary="Delete" />
          </ListItem>
        </ListWrapper>
      </Menu>
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