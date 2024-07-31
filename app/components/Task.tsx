export default function Task({ task }) {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h3>{task.title}</h3>
      <p>{task.description}</p>
    </div>
  );
}
