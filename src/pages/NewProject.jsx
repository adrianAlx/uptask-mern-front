import { ProjectForm } from '../components';

export const NewProject = () => {
  return (
    <>
      <h1 className="text-4xl font-black">Crear Proyecto</h1>

      <div className="mt-10">
        <ProjectForm />
      </div>
    </>
  );
};
