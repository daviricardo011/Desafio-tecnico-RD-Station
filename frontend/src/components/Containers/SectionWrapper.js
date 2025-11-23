export function SectionWrapper({ title, children, hasError = false }) {
  const errorStyle = hasError
    ? 'border border-red-500 px-1 py-2  rounded-md'
    : '';

  return (
    <div className={`mb-4 ${errorStyle}`}>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      {children}
    </div>
  );
}
