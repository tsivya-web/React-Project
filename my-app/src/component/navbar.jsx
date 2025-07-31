import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logout } from "../redux/actions/clientAction"

export const Navbar = () => {
  let isManager = useSelector(x => x.dataClientReducer.isManager)
  let currentClient = useSelector(x => x.dataClientReducer.currentClient)
  let d = useDispatch()
  
  const handleLogout = () => {
    d(logout())
  }
  
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <Link className="nav-link" to={'home'}>  דף הבית    </Link>
      </li>
      {!isManager && <li className="nav-item">
        <Link className="nav-link" to={'register'}> הירשם </Link>
      </li>}
      {(!currentClient || !currentClient.name) ? (
        <li className="nav-item">
          <Link className="nav-link" to={'login'}>  התחברות    </Link>
        </li>
      ) : (
        <li className="nav-item">
          <button className="nav-link btn btn-link" onClick={handleLogout}>  התנתקות    </button>
        </li>
      )}
      <li className="nav-item">
        <Link className="nav-link" to={'mylistCategory'}>רשימת קטגוריות  </Link>
      </li>
      {isManager && <li className="nav-item">
        <Link className="nav-link" to={'myaddCategory'}>הוספת קטגוריה </Link>
      </li>}
      <li className="nav-item">
        <Link className="nav-link" to={'myListGame'}> רשימת משחקים    </Link>
      </li>
      {isManager && <li className="nav-item">
        <Link className="nav-link" to={'addGame'}>   הוספת משחק    </Link>
      </li>}
      <li className="nav-item">
        <Link className="nav-link" to={'basket'}> סל קניות  </Link>
      </li>
      <li className="nav-item">
        <Link className="nav-link" to={'areaPersonal'}>  איזור אישי    </Link>
      </li>
    </ul>
  )
}