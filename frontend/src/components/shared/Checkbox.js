export function Checkbox({ children, type = 'checkbox', ...props }) {
  return (
    <label
      className="flex items-center group cursor-pointer select-none
                 text-gray-700 hover:text-blue-600
                 transition duration-150 ease-in-out"
    >
      <input type={type} {...props} />

      <span className="ml-2 text-base font-medium">{children}</span>
    </label>
  );
}
