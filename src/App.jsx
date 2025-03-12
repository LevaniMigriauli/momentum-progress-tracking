import {Route, Routes} from "react-router-dom";
import './App.css'
import Layout from "./components/layout/Layout.jsx";
import TasksHome from "./pages/TasksHome.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import CreateTask from "./pages/CreateTask.jsx";

function App() {

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<TasksHome/>}/>
          <Route path="/task-details" element={<TaskDetails/>}/>
          <Route path="/create-task" element={<CreateTask/>}/>
        </Route>
      </Routes>
  )
}

export default App
