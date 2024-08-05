import TaskBoard from "../../components/TaskBoard";

const DashboardPage = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <TaskBoard />
    </div>
  );
};

export default DashboardPage;
