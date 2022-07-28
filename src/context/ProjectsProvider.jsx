import { createContext, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getJwtFromLS } from '../helpers/checkJWTInLS';
import { fetchWithToken } from '../helpers/fetch';

export const ProjectContext = createContext();

export const ProjectsProvider = ({ children }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [project, setProject] = useState({});
  const [alerta, setAlerta] = useState({});

  const setAlert = useCallback(
    alert => {
      setAlerta(alert);

      setTimeout(() => {
        setAlerta({});
      }, 3000);
    },
    [setAlerta]
  );

  const submitProject = async project => {
    console.log(project);
    project.id ? 'await updateProject(project)' : await newProject(project);
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

      setAlerta({ msg: data.msg, error: false });

      setTimeout(() => {
        setAlert({});
        navigate('/projects', { replace: true });
      }, 2100);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ProjectContext.Provider
      value={{ projects, alerta, project, setAlert, submitProject }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
