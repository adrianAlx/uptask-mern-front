import { Link } from 'react-router-dom';

export const Register = () => {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Crea tu Cuenta y Administra tus {''}
        <span className="text-slate-700">proyectos</span>
      </h1>

      <form
        // onSubmit={handleSubmit}
        className="my-10 bg-white shadow rounded-lg p-10" /* autoComplete="off" */
      >
        {/* {msg && <Alert alerta={alerta} />} */}

        <div className="my-5">
          <label
            htmlFor="name"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Nombre
          </label>
          <input
            id="name"
            type="text"
            placeholder="Tu Nombre"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="name"
            // value={name}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="email"
            // value={email}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            id="password"
            type="password"
            placeholder="Password de Registro"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name="password"
            // value={password}
            // onChange={handleInputChange}
          />
        </div>
        <div className="my-5">
          <label
            htmlFor="repeatPassword"
            className="uppercase text-gray-600 block text-xl font-bold"
          >
            Repetir Password
          </label>
          <input
            id="repeatPassword"
            type="password"
            placeholder="Repite tu Password"
            className="border w-full p-3 mt-3 bg-gray-50 rounded-xl"
            name="repeatPassword"
            // value={repeatPassword}
            // onChange={handleInputChange}
          />
        </div>

        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-sky-700 mb-5 w-full py-3 text-white uppercase font-bold rounded hover:cursor-pointer hover:bg-sky-800 transition-colors"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/"
        >
          ¿Ya tienes una cuenta? Inicia Sesión
        </Link>

        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/forgot-password"
        >
          Olvide Mi Password
        </Link>
      </nav>
    </>
  );
};
