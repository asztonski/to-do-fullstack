import Page from "./components/Page";
import TodoList from "./components/TodoList";

const Dashboard: React.FC = () => (
  <Page title="Dashboard">
    <h1 className="mb-8 font-synth text-3xl text-yellow drop-shadow-lg">
      Today’s Tasks
    </h1>
    <TodoList />
  </Page>
);

export default Dashboard;
