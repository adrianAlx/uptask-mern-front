import { createContext, useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getJwtFromLS } from '../helpers/checkJWTInLS';
import { fetchWithToken } from '../helpers/fetch';

export const ProjectContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alerta, setAlerta] = useState({});
  const [formAlerta, setFormAlerta] = useState({});
  const [modalTaskForm, setModalTaskForm] = useState(false);
  const [task, setTask] = useState({});
  const [modalDeleteTask, setModalDeleteTask] = useState(false);

  useEffect(() => {
    (async () => {
      const tokenJWT = getJwtFromLS();
      if (!tokenJWT) return;

      const { data } = await fetchWithToken('/projects', 'GET', tokenJWT);
      setProjects(data.projects);
    })();
  }, []);

  const setAlert = useCallback(
    alert => {
      setAlerta(alert);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    },
    [setAlerta]
  );

  const setFormAlert = useCallback(
    alert => {
      setFormAlerta(alert);

      setTimeout(() => {
        setFormAlerta({});
      }, 2400);
    },
    [setFormAlerta]
  );

  const submitProject = async project => {
    project.id ? await updateProject(project) : await newProject(project);
  };

  const newProject = async project => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    try {
      const { data } = await fetchWithToken(
        '/projects',
        'POST',
        tokenJWT,
        project
      );
      setProjects([...projects, data.project]);

      setFormAlert({ msg: data.msg, error: false });

      setTimeout(() => {
        navigate('/projects', { replace: true });
      }, 2100);
    } catch (error) {
      console.log(error);
    }
  };

  const getProject = async id => {
    try {
      const tokenJWT = getJwtFromLS();
      if (!tokenJWT) return;

      const { data } = await fetchWithToken(`/projects/${id}`, 'GET', tokenJWT);
      setProject(data.project);
    } catch (error) {
      console.log(error.response.data.errors[0]);
      setAlert({
        msg: JSON.stringify(error.response.data.errors[0]),
        error: true,
      });

      setTimeout(() => {
        navigate('/projects', { replace: true });
      }, 2000);
    }
  };

  const updateProject = async project => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    try {
      const { data } = await fetchWithToken(
        `/projects/${project.id}`,
        'PUT',
        tokenJWT,
        project
      );
      const updatedProjects = projects.map(projectState =>
        projectState._id === data.project._id ? data.project : projectState
      );
      setProjects(updatedProjects);

      setFormAlert({ msg: data.msg, error: false });

      setTimeout(() => {
        navigate('/projects', { replace: true });
      }, 2100);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteProject = async id => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    try {
      const { data } = await fetchWithToken(
        `/projects/${id}`,
        'DELETE',
        tokenJWT
      );
      setAlert({ msg: data.msg, error: false });

      navigate('/projects', { replace: true });

      const updatedProjects = projects.filter(
        projectState => projectState._id !== id
      );
      setProjects(updatedProjects);
    } catch (error) {
      console.log(error);
    }
  };

  // Tasks
  const toggleTaskModal = () => {
    setModalTaskForm(!modalTaskForm);
    setTask({});
  };

  const submitTask = async task => {
    task.taskId ? await editTask(task) : await createTask(task);
  };

  const createTask = async task => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    try {
      const { data } = await fetchWithToken('/tasks', 'POST', tokenJWT, task);
      setFormAlert({ msg: data.msg, error: false });

      // Add added task to state
      const updatedProject = { ...project };
      updatedProject.tasks = [...updatedProject.tasks, data.task];
      setProject(updatedProject);
    } catch (error) {
      console.log(error);
      setFormAlert({
        msg: JSON.stringify(error.response.data, null, 3),
        error: true,
      });
    }

    setTimeout(() => {
      setModalTaskForm(false);
    }, 2400);
  };

  const editTask = async task => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    try {
      const { data } = await fetchWithToken(
        `/tasks/${task.taskId}`,
        'PUT',
        tokenJWT,
        task
      );
      setFormAlert({ msg: data.msg, error: false });

      // Update state
      const updatedProject = { ...project };
      updatedProject.tasks = project.tasks.map(taskState =>
        taskState._id === data.task._id ? data.task : taskState
      );
      setProject(updatedProject);
    } catch (error) {
      console.log(error);
      setFormAlert({
        msg: JSON.stringify(error.response.data, null, 3),
        error: true,
      });
    }

    setTimeout(() => {
      setModalTaskForm(false);
    }, 2400);
  };

  const handleEditTask = task => {
    setTask(task);
    setModalTaskForm(true);
  };

  const handleModalDeleteTask = task => {
    setTask(task);
    setModalDeleteTask(!modalDeleteTask);
  };

  const deleteTask = async () => {
    const tokenJWT = getJwtFromLS();
    if (!tokenJWT) return;

    try {
      const { data } = await fetchWithToken(
        `/tasks/${task._id}`,
        'DELETE',
        tokenJWT,
        task
      );
      setAlert({ msg: data.msg, error: false });

      // Update state
      const updatedProject = { ...project };
      updatedProject.tasks = project.tasks.filter(
        taskState => taskState._id !== task._id
      );
      setProject(updatedProject);
    } catch (error) {
      console.log(error);
      setAlert({
        msg: JSON.stringify(error.response.data, null, 3),
        error: true,
      });
    }

    setModalDeleteTask(false);
    setTask({});
  };

  return (
    <ProjectContext.Provider
      value={{
        projects,
        alerta,
        project,
        modalTaskForm,
        task,
        formAlerta,
        modalDeleteTask,
        setAlert,
        setFormAlert,
        submitProject,
        getProject,
        deleteProject,
        toggleTaskModal,
        submitTask,
        handleEditTask,
        handleModalDeleteTask,
        deleteTask,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
