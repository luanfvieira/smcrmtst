/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { Box, Card, Typography, styled, Grid } from "@mui/material";
import { useSelector } from "src/store";
import Task from "./Task";
import Label from "src/components/Label";
import DrawerHead from "./CreateTask";

const ListColumnWrapper = styled(Card)(
  ({ theme }) => `
      width: 320px;
      min-width: 320px;
      border-top-width: 10px;
      border-top-style: solid;
  `
);

const listSelector = (state, listId) => {
  const { lists } = state.projectsBoard;
  return lists.byId[listId];
};

const Results = ({ listId }) => {
  const list = useSelector((state) => listSelector(state, listId));

  useEffect(() => {
    async function handlerListStatus() {
      try {
      } catch (error) {
        console.log(error);
      }
    }
    handlerListStatus();
  }, []);

  const [open, setOpen] = useState(false);

  return (
    <Grid container>
      <Grid>
        <ListColumnWrapper
          sx={{
            borderColor: list.color,
            margin: "25px",
          }}
        >
          <Box
            px={2}
            pt={2}
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography color="inherit" variant="h3">
              {list.name}
            </Typography>

            <Box display="flex" alignItems="center">
              <Label color="primary">
                <b>{list.taskIds.length}</b>
              </Label>
            </Box>
          </Box>
          {list.taskIds.length === 0 && (
            <Box p={4} textAlign="center">
              <Typography variant="subtitle2">
                Arraste as tarefas aqui para atribuí-las a este quadro
              </Typography>
            </Box>
          )}
          <Droppable droppableId={list.id}>
            {(provided) => (
              <Box
                sx={{
                  minHeight: 260,
                }}
                ref={provided.innerRef}
              >
                {list.taskIds.map((taskId, index) => (
                  <Draggable draggableId={taskId} index={index} key={taskId}>
                    {(provided, snapshot) => (
                      <Task
                        taskId={taskId}
                        dragging={snapshot.isDragging}
                        index={index}
                        key={taskId}
                        list={list}
                        ref={provided.innerRef}
                        style={{ ...provided.draggableProps.style }}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                      />
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>

          <DrawerHead getOpen={{ open, setOpen }} />
        </ListColumnWrapper>
      </Grid>
    </Grid>
  );
};

Results.propTypes = {
  listId: PropTypes.string.isRequired,
};

export default Results;
