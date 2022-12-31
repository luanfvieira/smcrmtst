// import { addDays } from "date-fns";
import _ from "lodash";
import { mock } from "src/utils/axios";

const project = {
  lists: [
    {
      id: "1",
      name: "Pendentes",
      color: "#FF1A43",
      taskIds: ["1"],
    },
    {
      id: "2",
      name: "Em andamento",
      color: "#33C2FF",
      taskIds: ["5", "6", "7"],
    },
    {
      id: "3",
      name: "Concluído",
      color: "#57CA22",
      taskIds: ["8", "9", "10"],
    },
  ],
  tasks: [
    {
      id: "1",
      description:
        "If several languages coalesce, the grammar of the resulting language",
      listId: "1",
      name: "Product design review",
    },
    {
      id: "2",
      description:
        "Is more simple and regular than that of the individual languages",
      listId: "1",
      name: "New features - React implementation",
    },
    {
      id: "3",
      description:
        "The new common language will be more simple and regular than",
      listId: "1",
      name: "Increase ROI master plan",
    },
    {
      id: "4",
      description:
        "The existing European languages, it will be as simple as Occidental",
      listId: "1",
      name: "Contact support with questions",
    },
    {
      id: "5",
      description:
        "In fact, it will be Occidental to an English person, it will seem like",
      listId: "2",
      name: "Website launch list & todos",
    },
    {
      id: "6",
      description:
        "Simplified English, as a skeptical Cambridge friend of mine told me",
      listId: "2",
      name: "Write 5 new articles",
    },
    {
      id: "7",
      description:
        "What Occidental is, the European languages are members of the same family",
      listId: "2",
      name: "Gather marketing materials",
    },
    {
      id: "8",
      description:
        "Their separate existence is a myth for science, music, sport",
      listId: "3",
      name: "Clean up maintenance branch",
    },
    {
      id: "9",
      description:
        "Everyone realizes why a new common language would be desirable",
      listId: "3",
      name: "Prepare sales forecast for Q2/2021",
    },
    {
      id: "10",
      description:
        "Uniform grammar, pronunciation and more common words more simple and regular",
      listId: "3",
      name: "Generate missing invoices",
    },
  ],
};

mock.onGet("/api/projects_board/board").reply(200, { project });

mock.onPost("/api/projects_board/list/update").reply((request) => {
  try {
    const { listId, update } = JSON.parse(request.data);
    const list = project.lists.find((_list) => _list.id === listId);

    _.assign(list, update);

    return [200, { list }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Encountered a server error" }];
  }
});

mock.onPost("/api/projects_board/tasks/update").reply((request) => {
  try {
    const { taskId, update } = JSON.parse(request.data);
    const task = project.tasks.find((_task) => _task.id === taskId);

    _.assign(task, update);

    return [200, { task }];
  } catch (err) {
    console.error(err);
    return [500, { message: "Encountered a server error" }];
  }
});

mock.onPost("/api/projects_board/tasks/move").reply((request) => {
  try {
    const { taskId, position, listId } = JSON.parse(request.data);
    const task = project.tasks.find((_task) => _task.id === taskId);

    if (!task) {
      return [400, "Card not found"];
    }

    const sourceList = project.lists.find((list) => list.id === task.listId);

    if (!sourceList) {
      return [500, "List not found"];
    }

    _.pull(sourceList.taskIds, taskId);

    if (listId) {
      const destinationList = project.lists.find(
        (list) => list.id === task.listId
      );

      if (!destinationList) {
        return [500, "List not found"];
      }

      sourceList.taskIds.splice(position, 0, task.id);
      task.listId = destinationList.id;
    } else {
      sourceList.taskIds.splice(position, 0, task.id);
    }

    return [200, true];
  } catch (err) {
    console.error(err);
    return [500, { message: "Encountered a server error" }];
  }
});
