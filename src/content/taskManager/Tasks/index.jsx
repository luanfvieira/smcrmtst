/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import { useDispatch, useSelector } from "src/store";
import { getBoard, moveTask } from "src/slices/projects_board";
import { Helmet } from "react-helmet-async";
import Footer from "src/components/Footer";
import PageHeader from "./PageHeader";
import { useSnackbar } from "notistack";
import Results from "./Results";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import {
  styled,
  Grid,
  Box,
  Card,
  Zoom,
  Typography,
  Divider,
  Stack,
} from "@mui/material";
import { useNotification } from "src/hooks/useNotification";
import api from "src/utils/api";

const TasksWrapper = styled(Box)(
  ({ theme }) => `
    display: flex;
    overflow: auto;
`
);

const TasksWrapperContent = styled(Box)(
  ({ theme }) => `
      margin: ${theme.spacing(1)};
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

const taskSelector = (state, listId) => {
  const { tasks } = state.projectsBoard;
  const task = tasks.byId[listId];
  return {
    ...task,
  };
};

function ApplicationsProjectsBoard() {
  const [notify] = useNotification();
  const dispatch = useDispatch();
  const { lists } = useSelector((state) => state.projectsBoard);
  const { enqueueSnackbar } = useSnackbar();
  const [listTasks, setListTasks] = useState([]);

  const handleDragEnd = async ({ source, destination, draggableId }) => {
    try {
      if (!destination) {
        return;
      }

      if (
        source.droppableId === destination.droppableId &&
        source.index === destination.index
      ) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        return;
      } else {
        dispatch(
          moveTask(draggableId, destination.index, destination.droppableId)
        );
      }

      notify(`A tarefa foi movida com sucesso`, "success");
    } catch (err) {
      console.error(err);
      enqueueSnackbar("Ocorreu um erro, tente novamente mais tarde", {
        variant: "error",
        anchorOrigin: {
          vertical: "top",
          horizontal: "right",
        },
        TransitionComponent: Zoom,
        autoHideDuration: 2000,
      });
    }
  };

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  useEffect(() => {
    async function getTask() {
      const { data } = await api.get("/activities/tasks");
      setListTasks(data.tasks);
    }
    getTask();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tarefas - SmartPosto</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>

      <Grid container spacing={1}>
        <Grid item xs={12} sx={{ justifyContent: "center", display: "flex" }}>
          <Card
            variant="elevation"
            sx={{
              mt: { xs: 3, lg: 0 },
            }}
          >
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              justifyContent="space-around"
              alignItems="center"
              spacing={0}
            >
              <Box px={3} py={2} textAlign="center">
                <Typography variant="h4">Prioridade</Typography>
              </Box>
              <Box px={3} py={2} textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                  gutterBottom
                >
                  Baixa
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <DotLegend
                    style={{
                      // animation: `pulse 1s infinite`,
                      background: `#0CFA00`,
                    }}
                  />
                  <Typography sx={{ fontWeight: "bold" }}>
                    Total:{" "}
                    {
                      listTasks.filter((e) => e.tasksPrioritiesId === "BAIXA")
                        .length
                    }
                  </Typography>
                </Box>
              </Box>
              <Box px={3} py={2} textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                  gutterBottom
                >
                  Media
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <DotLegend
                    style={{
                      background: `#FFCC00`,
                    }}
                  />
                  <Typography sx={{ fontWeight: "bold" }}>
                    Total:{" "}
                    {
                      listTasks.filter((e) => e.tasksPrioritiesId === "MEDIA")
                        .length
                    }
                  </Typography>
                </Box>
              </Box>
              <Box px={3} py={2} textAlign="center">
                <Typography
                  variant="h4"
                  fontWeight="normal"
                  color="text.secondary"
                  gutterBottom
                >
                  Alta
                </Typography>
                <Box display="flex" alignItems="center" justifyContent="center">
                  <DotLegend
                    style={{
                      background: `#FF0000`,
                    }}
                  />
                  <Typography sx={{ fontWeight: "bold" }}>
                    Total:{" "}
                    {
                      listTasks.filter((e) => e.tasksPrioritiesId === "ALTA")
                        .length
                    }
                  </Typography>
                </Box>
              </Box>
            </Stack>
          </Card>
        </Grid>

        <Grid
          alignItems="stretch"
          item
          xs={12}
          sx={{
            px: 1,
            justifyContent: "center",
            display: "flex",
          }}
        >
          <TasksWrapperContent>
            <DragDropContext onDragEnd={handleDragEnd}>
              <TasksWrapper
                // alignItems={{ xs: "center", md: "center" }}
                flexDirection={{ xs: "column", md: "row" }}
              >
                {lists.allIds.map((listId) => (
                  <Results key={listId} listId={listId} />
                ))}
              </TasksWrapper>
            </DragDropContext>
          </TasksWrapperContent>
        </Grid>
      </Grid>
      <Footer />
    </>
  );
}

export default ApplicationsProjectsBoard;
