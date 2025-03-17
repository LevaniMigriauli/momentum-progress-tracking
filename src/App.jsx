import {BrowserRouter, Route, Routes} from "react-router-dom";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import './App.css'
import Layout from "./components/layout/Layout.jsx";
import TasksHome from "./pages/tasksHome/TasksHome.jsx";
import TaskDetails from "./pages/TaskDetails.jsx";
import CreateTask from "./pages/createTask/CreateTask.jsx";
import {AppProvider} from "./context/appContext.jsx";

const queryClient = new QueryClient();

function App() {

  return (
      <QueryClientProvider client={queryClient}>
        <AppProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout/>}>
                <Route index element={<TasksHome/>}/>
                <Route path="/task-details" element={<TaskDetails/>}/>
                <Route path="/create-task" element={<CreateTask/>}/>
              </Route>
            </Routes>
          </BrowserRouter>
        </AppProvider>
      </QueryClientProvider>
  )
}

export default App
