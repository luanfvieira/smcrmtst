/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

import _ from "lodash";
import api from "src/utils/api";

import axios from "src/utils/axios";
import objectArray from "src/utils/objectArray";

const initialState = {
  isLoaded: false,
  lists: {
    byId: {},
    allIds: [],
  },
  tasks: {
    byId: {},
    allIds: [],
  },
};

const slice = createSlice({
  name: "projects_board",
  initialState,
  reducers: {
    getBoard(state, action) {
      const { project } = action.payload;

      state.lists.byId = objectArray(project.lists);
      state.lists.allIds = Object.keys(state.lists.byId);
      state.tasks.byId = objectArray(project.tasks);
      state.tasks.allIds = Object.keys(state.tasks.byId);
      state.isLoaded = true;
    },
    updateList(state, action) {
      const { list } = action.payload;

      state.lists.byId[list.id] = list;
    },

    moveTask(state, action) {
      const { taskId, position, listId } = action.payload;
      const { listId: sourceListId } = state.tasks.byId[taskId];

      _.pull(state.lists.byId[sourceListId].taskIds, taskId);
      if (listId) {
        state.tasks.byId[taskId].listId = listId;
        state.lists.byId[listId].taskIds.splice(position, 0, taskId);
      } else {
        state.lists.byId[sourceListId].taskIds.splice(position, 0, taskId);
      }
    },
  },
});

export const reducer = slice.reducer;

export const getBoard = () => async (dispatch) => {
  const { data } = await api.get("/activities/tasks");

  const list = [
    {
      id: "1",
      name: "Pendentes",
      color: "#FF1A43",
      taskIds: [],
    },
    {
      id: "2",
      name: "Em andamento",
      color: "#33C2FF",
      taskIds: [],
    },
    {
      id: "3",
      name: "Concluído",
      color: "#57CA22",
      taskIds: [],
    },
  ];

  data.tasks.forEach((e) => {
    if (e.tasksTypesStatusId === "PENDENTE") {
      list[0].taskIds.push(e.id);
    }
    if (e.tasksTypesStatusId === "EM ANDAMENTO") {
      list[1].taskIds.push(e.id);
    }
    if (e.tasksTypesStatusId === "FINALIZADO") {
      list[2].taskIds.push(e.id);
    }
  });

  const tasks = data.tasks.map((item) => {
    let listId = null;
    if (item.tasksTypesStatusId === "PENDENTE") {
      listId = "1";
    }
    if (item.tasksTypesStatusId === "EM ANDAMENTO") {
      listId = "2";
    }
    if (item.tasksTypesStatusId === "FINALIZADO") {
      listId = "3";
    }

    return {
      id: item.id,
      description: item.description,
      listId,
      name: item.title,
      usersToExecute: item.usersToExecute,
      createdAt: item.createdAt,
      users: item.users,
      status: item.tasksTypesStatusId,
      startAt: item.startAt,
      endAt: item.endAt,
      appointmentInfo: item.appointmentInfo,
      belongsToMe: item.belongsToMe,
      unique: item.unique,
      comment: item.taskHistories,
      tasksCategoriesId: item.tasksCategoriesId,
      tasksPrioritiesId: item.tasksPrioritiesId,
    };
  });

  const project = { lists: list, tasks };

  dispatch(slice.actions.getBoard({ project }));
};

export const updateList = (listId, update) => async (dispatch) => {
  const response = await axios.post("/api/projects_board/list/update", {
    listId,
    update,
  });

  dispatch(slice.actions.updateList(response.data));
};

export const moveTask = (taskId, position, listId) => async (dispatch) => {
  let status = "";

  if (listId === "1") {
    status = "PENDENTE";
  }

  if (listId === "2") {
    status = "EM ANDAMENTO";
  }

  if (listId === "3") {
    status = "FINALIZADO";
  }

  api.patch(`/activities/tasks/${taskId}`, {
    status,
  });

  dispatch(
    slice.actions.moveTask({
      taskId,
      position,
      listId,
    })
  );
};

export default slice;
