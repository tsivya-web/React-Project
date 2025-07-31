import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { set_is_manager } from "../redux/actions/clientAction"
import { set_current_client } from "../redux/actions/clientAction"
import { isExist } from "../axios/clientAxios"
import { useNavigate } from "react-router-dom"
import { getAllCategory } from "../axios/categoryAxios"
import { set_listCategory } from "../redux/actions/listCategoryAction"
import { empty } from "../redux/actions/basketAction"

export const Login = () => {
  const d = useDispatch()
  const [user, setUser] = useState({
    name: "",
    password: ""
  })
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const func = async () => {
    if (!user.name || !user.password) {
      alert("אנא מלא את כל השדות")
      return
    }

    setIsLoading(true)
    d(empty())
    
    if (user.name === "m" && user.password === "0000") {
      d(set_is_manager())
      alert("הינך מחובר כמנהל")
      navigate('/home')
      setIsLoading(false)
      return
    }

    try {
      const res = await isExist(user.name, user.password)
      if (res.data) {
        d(set_current_client(user.name, user.password))
        alert("הינך מחובר לחשבונך")
        navigate('/home')
      } else {
        alert("עליך להירשם")
        navigate('/register')
      }
    } catch (err) {
      console.log(err)
      alert("שגיאה בחיבור")
    }

    setUser({ name: "", password: "" })
    setIsLoading(false)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      func()
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-lg-6 col-md-8 col-sm-12">
          <div className="card login-card">
            <div className="card-header">
              <div className="text-center">
                <h2 className="mb-0">🎮 התחברות</h2>
                <p className="text-white-50 mb-0">ברוך הבא לחנות המשחקים שלנו</p>
              </div>
            </div>
            <div className="card-body">
              <div className="login-form">
                <div className="form-group mb-4">
                  <label htmlFor="name" className="form-label">
                    <i className="fas fa-user me-2"></i>
                    שם משתמש
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    type="text" 
                    name="name"
                    id="name"
                    placeholder="הכנס שם משתמש" 
                    value={user.name}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>
                
                <div className="form-group mb-4">
                  <label htmlFor="password" className="form-label">
                    <i className="fas fa-lock me-2"></i>
                    סיסמה
                  </label>
                  <input 
                    className="form-control form-control-lg" 
                    type="password" 
                    name="password"
                    id="password"
                    placeholder="הכנס סיסמה" 
                    value={user.password}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                </div>

                <div className="d-grid gap-3">
                  <button 
                    className={`btn btn-primary btn-lg ${isLoading ? 'disabled' : ''}`}
                    onClick={func}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        מתחבר...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-sign-in-alt me-2"></i>
                        התחבר
                      </>
                    )}
                  </button>
                  
                  <div className="text-center">
                    <p className="mb-2">אין לך חשבון?</p>
                    <button 
                      className="btn btn-outline-primary"
                      onClick={() => navigate('/register')}
                    >
                      <i className="fas fa-user-plus me-2"></i>
                      הירשם עכשיו
                    </button>
                  </div>
                </div>

                <div className="login-features mt-4">
                  <div className="row text-center">
                    <div className="col-4">
                      <div className="feature-item">
                        <i className="fas fa-gamepad text-primary"></i>
                        <small>משחקים איכותיים</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="feature-item">
                        <i className="fas fa-shipping-fast text-success"></i>
                        <small>משלוח מהיר</small>
                      </div>
                    </div>
                    <div className="col-4">
                      <div className="feature-item">
                        <i className="fas fa-shield-alt text-info"></i>
                        <small>אבטחה מלאה</small>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}



