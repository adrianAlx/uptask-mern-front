import { Link } from 'react-router-dom';

export const NewPassword = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <div className="mt-20 mb-10 bg-white shadow rounded-lg p-10">
        {/* {msg && <Alert alerta={alerta} />} */}

        <form>
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="newPassword"
            >
              Nuevo Password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="Escribe tu Nuevo Password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name="newPassword"
              // value={newPassword}
              // onChange={handleInputChange}
            />
          </div>

          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
          />
        </form>

        <Link className="block text-center my-5 text-gray-500" to="/">
          Log In
        </Link>
      </div>
    </>
  );
};
