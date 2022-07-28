import { useProjects } from '../hooks';

export const Projects = () => {
  const { projects } = useProjects();
  console.log(projects);

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="bg-white shadow mt-10 rounded-lg">Projects</div>
    </>
  );
};
