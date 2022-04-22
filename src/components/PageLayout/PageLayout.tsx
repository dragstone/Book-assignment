import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import './PageLayout.scss'

export default function PageLayout() {
  return (
    <div>
      <Header />

      <Outlet />
    </div>
  )
}
