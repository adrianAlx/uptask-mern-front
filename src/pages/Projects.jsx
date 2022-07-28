import { useProjects } from '../hooks';
import { ProjectPreview } from '../components';

export const Projects = () => {
  const { projects } = useProjects();
  console.log(projects);

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">
        {projects.length ? (
          projects.map(project => (
            <ProjectPreview key={project._id} project={project} />
          ))
        ) : (
          <p className="text-center text-gray-600 uppercase p-5">
            Aún no tienes proyectos
          </p>
        )}
      </div>
    </>
  );
};
