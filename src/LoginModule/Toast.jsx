export default function Toast({ message, type }) {
  return (
    <div
      className={`
        fixed top-4 left-1/2 transform -translate-x-1/2 
        px-4 py-2 rounded shadow-lg text-white 
        ${type === "success" ? "bg-green-600" : "bg-red-600"}
      `}
    >
      {message}
    </div>
  );
}
