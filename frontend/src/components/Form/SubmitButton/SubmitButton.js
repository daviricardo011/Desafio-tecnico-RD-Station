import { Loader } from '../../shared/Loader';

export function SubmitButton({ text, disabled = false, isLoading = false }) {
  const isDisabled = disabled || isLoading;

  const baseClasses =
    'text-white font-bold py-2 px-4 rounded transition duration-150 ease-in-out flex items-center justify-center gap-2';

  const stateClasses = isDisabled
    ? 'bg-blue-400 cursor-not-allowed opacity-70 hover:bg-blue-400'
    : 'bg-blue-500 hover:bg-blue-700';

  return (
    <button
      type="submit"
      className={`${baseClasses} ${stateClasses}`}
      disabled={isDisabled}
    >
      {isLoading && <Loader />}
      {text}
    </button>
  );
}
