import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useProjects } from '../hooks';
import { ProjectForm } from '../components';

export const EditProject = () => {
  const { id } = useParams();
  const { getProject, project, deleteProject } = useProjects();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await getProject(id);
      setLoading(false);
    })();
  }, []);

  const handleClick = async () => {
    if (confirm('¿Deseas eliminar este proyecto?')) await deleteProject(id);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="font-black text-4xl">Editar Proyecto: {project.name}</h1>

        <div className="flex items-center gap-2 text-red-500 hover:text-red-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>

          <button onClick={handleClick} className="uppercase font-bold">
            Eliminar
          </button>
        </div>
      </div>

      <div className="mt-10">
        <ProjectForm />
      </div>
    </>
  );
};
