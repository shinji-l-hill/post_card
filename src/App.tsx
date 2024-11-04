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
import CustomCoverLoading from './components/ui/CustomCoverLoading'
import SendListEdit from './pages/SendListEdit/SendListEdit'

function App() {
  const {isOpen, message, severity } = useSelector((state: RootState) => state.common.snackbar);
  const { isCoverLoading } = useSelector((state: RootState) => state.common);

  return (
    <div>
      <Routes>
        <Route path='login' element={<LoginPage />}></Route>
        <Route element={<CommonLayout />}>
          <Route path='dashboard' element={<Dashboard />}></Route>
          <Route path='sendlist/new' element={<SendListRegister />}></Route>
          <Route path='sendlist/:id/edit' element={<SendListEdit />}></Route>
        </Route>
        <Route element={<PostCardLayout />}>
          <Route path='/' element={<PostCard />}/>
        </Route>
      </Routes>
      <CustomSnackbar open={isOpen} message={message} severity={severity}/>
      {isCoverLoading && <CustomCoverLoading />}
    </div>
  )
}

export default App
