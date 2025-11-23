export function ErrorMessage({ message }) {
  const reloadWindow = () => {
    window.location.reload();
  };

  return (
    <div className="flex flex-col justify-center items-center bg-red-50 p-10 text-red-800 shadow-md">
      <h2 className="text-3xl font-semibold mb-4 text-red-700">Erro</h2>
      <p className="mt-4 text-sm font-mono bg-red-100 p-3 rounded-lg border border-red-300">
        {message}
      </p>
      <button
        className="mt-6 bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        onClick={reloadWindow}
      >
        Tentar Novamente
      </button>
    </div>
  );
}
