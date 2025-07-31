import { useState } from "react"
import { addClient } from "../axios/clientAxios"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const [user, setUser] = useState({
    name: "", 
    password: ""
  })
  const [errornameuser, seterrornameuser] = useState("")
  const [errorpass, seterrorpass] = useState("")
  const [errorname, seterrorname] = useState("")
  const [erNumCard, seterNumCard] = useState("")
  const [erTokefCard, seterTokefCard] = useState("")
  const [erCvvCard, seterCvvCard] = useState("")
  let n = useNavigate()
  const [detailscard, setdetails] = useState({
    nameCard: "", 
    num: "", 
    tokef: "", 
    cvv: 0
  })

  const validatename = (value) => {
    const regex = /^[a-zA-Z\u0590-\u05FF\s]+$/
    if (!regex.test(value)) {
      seterrorname("שם בעל כרטיס אשראי חייב להכיל אותיות ורווחים בלבד")
      setdetails({ ...detailscard, nameCard: "" })
    } else {
      seterrorname("")
    }
  }

  const validatenum = (value) => {
    const regex = /^\d{13,19}$/
    if (!regex.test(value)) {
      seterNumCard("מספר כרטיס אשראי חייב להכיל 13 עד 19 ספרות ")
      setdetails({ ...detailscard, num: "" })
    } else {
      seterNumCard("")
    }
  }

  const validatetokef = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(value)) {
      seterTokefCard(" תוקף הכרטיס אינו תקין. אנא בדוק שוב")
      setdetails({ ...detailscard, tokef: "" })
    } else {
      seterTokefCard("")
    }
  }

  const validatecvv = (value) => {
    const regex = /^\d{3}$/
    if (!regex.test(value)) {
      seterCvvCard(" CVV צריך להכיל 3 ספרות בלבד")
      setdetails({ ...detailscard, cvv: 0 })
    } else {
      seterCvvCard("")
    }
  }

  const validatenameuser = (value) => {
    const regex = /^.+$/
    if (!regex.test(value)) {
      seterrornameuser("שם משתמש צריך להיות מלא")
      setUser({ ...user, name: "" })
    } else {
      seterrornameuser("")
    }
  }

  const validatepass = (value) => {
    const regex = /^.{8,}$/
    if (!regex.test(value)) {
      seterrorpass("הסיסמא צריכה להכיל 8 תוים")
      setUser({ ...user, password: "" })
    } else {
      seterrorpass("")
    }
  }

  const func = async (e) => {
    e.preventDefault()
    
    if (user.name == "" || user.password == "" || detailscard.nameCard == "" || detailscard.num == "" || detailscard.tokef == "" || detailscard.cvv == 0) {
      alert("אחד הפרטים שגויים")
      return
    }
    
    try {
      await addClient({ ...user, detailsCard: { ...detailscard } })
      alert("נרשמת בהצלחה")
      n('/home')
    } catch (error) {
      console.error("Error registering:", error)
      alert("שגיאה בהרשמה")
    }
  }

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow" style={{ width: "200%" }} id="important-style" >
            <div className="card-header bg-primary text-white text-center">
              <h3> טופס הרשמה</h3>
            </div>

            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="name" className="form-label"> שם מלא</label>
                <input 
                  className="form-control" 
                  type="text" 
                  placeholder="name" 
                  onBlur={(e) => { 
                    setUser({ ...user, name: e.target.value }); 
                    validatenameuser(e.target.value) 
                  }} 
                />
                {errornameuser && <p className="alert alert-danger">{errornameuser}</p>}
              </div>
              <div className="mb-3 position-relative">
                <label htmlFor="password" className="form-label">סיסמא</label>
                <input 
                  className="form-control pe-5" 
                  type="password" 
                  placeholder="password" 
                  onBlur={(e) => { 
                    setUser({ ...user, password: e.target.value }); 
                    validatepass(e.target.value) 
                  }} 
                />
                {errorpass && <p className="alert alert-danger">{errorpass}</p>}
              </div>

              <h5 className="mt-4">פרטי תשלום</h5>
              <div className="mb-3">
                <label htmlFor="card-name" className="form-label"> שם בעל כרטיס אשראי</label>
                <input 
                  className="form-control" 
                  type="text" 
                  placeholder="name of card" 
                  onBlur={(e) => { 
                    setdetails({ ...detailscard, nameCard: e.target.value }); 
                    validatename(e.target.value) 
                  }}
                />
                {errorname && <p className="alert alert-danger">{errorname}</p>}
              </div>
              <div className="mb-3">
                <label htmlFor="card-number" className="form-label">  מספר כרטיס אשראי</label>
                <input 
                  className="form-control" 
                  type="text" 
                  placeholder="number of card" 
                  onBlur={(e) => { 
                    setdetails({ ...detailscard, num: e.target.value }); 
                    validatenum(e.target.value) 
                  }}
                />
                {erNumCard && <p className="alert alert-danger">{erNumCard}</p>}
              </div>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <label htmlFor="expiry-date" className="form-label">תוקף</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    placeholder="tokef card" 
                    onBlur={(e) => { 
                      setdetails({ ...detailscard, tokef: e.target.value }); 
                      validatetokef(e.target.value) 
                    }}
                  />
                  {erTokefCard && <p className="alert alert-danger">{erTokefCard}</p>}
                </div>
                <div className="col-md-6 mb-3">
                  <label htmlFor="cvv" className="form-label">CVV (3 digits)</label>
                  <input 
                    className="form-control" 
                    type="text" 
                    placeholder="cvv card" 
                    onBlur={(e) => { 
                      setdetails({ ...detailscard, cvv: e.target.value }); 
                      validatecvv(e.target.value) 
                    }}
                  />
                  {erCvvCard && <p className="alert alert-danger">{erCvvCard}</p>}
                </div>
              </div>
              <button 
                style={{ margin: "0.5rem" }} 
                className="btn btn-primary w-100" 
                onClick={(e) => { func(e) }}
              >
                להרשמה
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}




