import { Routes, Route } from 'react-router-dom'
import Home from './components/Home/Home'
import PageLayout from './components/PageLayout/PageLayout'
import Books from './components/Books/Books'
import User from './components/User/User'

const AppRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/" element={<PageLayout />}>
          <Route path="/books" element={<Books />} />
          <Route path="/user" element={<User />} />
        </Route>
      </Routes>
    </div>
  )
}

export default AppRoutes
