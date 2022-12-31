/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import { useDispatch } from "src/store";
import { getBoard } from "src/slices/projects_board";
import { Helmet } from "react-helmet-async";
import PageHeader from "./PageHeader";
import PageTitleWrapper from "src/components/Scrollbar/PageTitleWrapper";

import { useNotification } from "src/hooks/useNotification";
import GeneralPanel from "./GeneralPanel";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import useRefMounted from "src/hooks/useRefMounted";
import api from "src/utils/api";
import SuspenseLoader from "src/components/SuspenseLoader";

function ApplicationsProjectsBoard() {
  const [notify] = useNotification();
  const dispatch = useDispatch();
  const [month, setMonth] = useState(format(new Date(), "M", { locale: ptBR }));
  const isMountedRef = useRefMounted();
  const [getData, setGetData] = useState([]);
  const [load, setLoad] = useState(true);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  const getTasks = useCallback(async () => {
    try {
      const { data } = await api.get("/activities/tasks/quantities", {
        params: { month },
      });

      if (isMountedRef.current) {
        setGetData(data?.quantities);
      } else {
        setGetData(data?.quantities);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  }, [isMountedRef, month]);

  const getTasksTotal = useCallback(async () => {
    try {
      const { data } = await api.get("/activities/tasks", {
        params: { month },
      });

      setTasks(data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoad(false);
    }
  }, [month]);

  useEffect(() => {
    getTasks();
    getTasksTotal();
  }, [getTasks, getTasksTotal]);

  if (load) {
    return <SuspenseLoader />;
  }

  return (
    <>
      <Helmet>
        <title>Dashboard - Tarefas</title>
      </Helmet>
      <PageTitleWrapper>
        <PageHeader setMonth={setMonth} />
      </PageTitleWrapper>
      <GeneralPanel getData={getData} getTasks={tasks} />

      {/* <Footer /> */}
    </>
  );
}

export default ApplicationsProjectsBoard;
