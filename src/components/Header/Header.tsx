import User from '../../assets/user.svg'
import Logout from '../../assets/logout.svg'
import { Link } from 'react-router-dom'
import './Header.scss'

export default function Header() {
  return (
    <div className="header-section">
      <Link to="/user">
        <img src={User} alt="user account" height={35} />
      </Link>
      <Link to="/">
        <img src={Logout} alt="user account" height={32} />
      </Link>
    </div>
  )
}
