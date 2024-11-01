import { Route, Routes } from 'react-router-dom'
import './App.css'
import PostCard from './pages/postcard/PostCard'
import PostCardLayout from './layouts/PostCardLayout'
import LoginPage from './pages/login/LoginPage'
import CustomSnackbar from './components/ui/CustomSnackbar'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import Dashboard from './pages/Dashboard/Dashboard'
import CommonLayout from './layouts/CommonLayout'
import SendListRegister from './pages/SendListRegister/SendListRegister'

function App() {
  const {isOpen, message, severity } = useSelector((state: RootState) => state.common.snackbar);

  return (
    <div>
      <Routes>
        <Route path='login' element={<LoginPage />}></Route>
        <Route element={<CommonLayout />}>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='sendlist/new' element={<SendListRegister />}></Route>
        </Route>
        <Route element={<PostCardLayout />}>
          <Route path='/' element={<PostCard />}/>
        </Route>
      </Routes>
      <CustomSnackbar open={isOpen} message={message} severity={severity}/>
    </div>
  )
}

export default App
