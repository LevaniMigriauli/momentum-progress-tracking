import { HashRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import './App.css'
import Layout from './components/layout/Layout.jsx'
import TasksHome from './pages/tasksHome/TasksHome.jsx'
import TaskDetails from './pages/taskDetails/TaskDetails.jsx'
import CreateTask from './pages/createTask/CreateTask.jsx'
import { AppProvider } from './context/appContext.jsx'
import ErrorPage from './pages/ErrorPage.jsx'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<TasksHome />} />
              <Route path="/task-details/:id" element={<TaskDetails />} />
              <Route path="/create-task" element={<CreateTask />} />
              <Route path={'*'} element={<ErrorPage />} />
            </Route>
          </Routes>
        </HashRouter>
      </AppProvider>
    </QueryClientProvider>
  )
}

export default App
