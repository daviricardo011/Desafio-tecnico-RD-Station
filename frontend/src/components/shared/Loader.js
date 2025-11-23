import { ReactComponent as Spinner } from '../../assets/svg/spinner.svg';

export const Loader = ({ text, className }) => (
  <div className={`flex justify-center items-center ${className}`}>
    <Spinner className="h-4 w-4 text-blue-500" />

    {text && <p className="ml-2 text-gray-600">{text}</p>}
  </div>
);
