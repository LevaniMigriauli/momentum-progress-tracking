import './App.css'
import {Route, Routes} from "react-router-dom";
import TasksHome from "./pages/TasksHome.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import CreateTask from "./pages/CreateTask.jsx";

function App() {

  return (
      <Routes>
        <Route path="/" element={<TasksHome/>}/>
        <Route path="/task-details" element={<TaskDetails/>}/>
        <Route path="/create-task" element={<CreateTask/>}/>
      </Routes>
  )
}

export default App
