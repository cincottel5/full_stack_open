import { useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import MainMenu from './components/MainMenu'
import PageBlogs from './components/PageBlogs'
import PageUsers from './components/PageUsers'
import PageUserDetail from './components/PageUserDetail'
import PageBlogDetail from './components/PageBlogDetail'

const App = () => {
  const user = useSelector(state => state.user)

  const loggedInView = () => (
    <>
      <MainMenu/>
      <div className='container pt-4'>
        <h2 className='mb-4'>Blog app</h2>
        <Notification></Notification>

        <Routes>
          <Route path="/" element={<PageBlogs/>}/>
          <Route path="/blogs" element={<PageBlogs/>}/>
          <Route path="/users/:id" element={<PageUserDetail/>}/>
          <Route path="/users" element={<PageUsers/>}/>
          <Route path="/blogs/:id" element={<PageBlogDetail/>}/> 
        </Routes>
      </div>
      
    </>
  )

  return (
    <div>
      {user === null ? <LoginForm/> : loggedInView()}
    </div>
  )
}

export default App
