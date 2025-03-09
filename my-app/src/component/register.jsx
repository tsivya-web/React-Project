import { useState } from "react"
import { addClient } from "../axios/clientAxios"
import { useNavigate } from "react-router-dom"

export const Register = () => {
  const [inputValue, setInputValue] = useState()
  const [user, setuser] = useState({
    name: "", password: ""

  })
  const [errornameuser, seterrornameuser] = useState("")
  const [errorpass, seterrorpass] = useState("")
  const [errorname, seterrorname] = useState("")
  const [erNumCard, seterNumCard] = useState("")
  const [erTokefCard, seterTokefCard] = useState("")
  const [erCvvCard, seterCvvCard] = useState("")
  let n = useNavigate()
  const [detailscard, setdetails] = useState({
    nameCard: "", num: "", tokef: "", cvv: 0

  })
  const validatename = (value) => {
    const regex = /^[a-zA-Z\u0590-\u05FF\s]+$/
    if (!regex.test(value)) {
      seterrorname("שם בעל כרטיס אשראי חייב להכיל מספרים ורווחים בלבד")
      setdetails({ ...detailscard, nameCard: "" })
    }
    else {
      seterrorname("")
    }

  }
  const validatenum = (value) => {
    const regex = /^\d{13,19}$/
    if (!regex.test(value)) {
      seterNumCard("מספר כרטיס אשראי חייב להכיל 13 עד 19 ספרות ")
      setdetails({ ...detailscard, num: "" })
    }
    else {
      seterNumCard("")
    }
  }
  const validatetokef = (value) => {
    const regex = /^(0[1-9]|1[0-2])\/\d{2}$/
    if (!regex.test(value)) {
      seterTokefCard(" תוקף הכרטיס אינו תקין. אנא בדוק שוב")
      setdetails({ ...detailscard, tokef: "" })
    }
    else {
      seterTokefCard("")
    }
  }
  const validatecvv = (value) => {
    const regex = /^\d{3}$/
    if (!regex.test(value)) {
      seterCvvCard(" CVV צריך להכיל 3 ספרות בלבד")
      setdetails({ ...detailscard, cvv: 0 })
    }
    else {
      seterCvvCard("")
    }
  }
  const validatenameuser = (value) => {
    const regex = /^.+$/
    if (!regex.test(value)) {
      seterrornameuser("שם משתמש צריך להיות מלא")
      setuser({ ...user, name: "" })
    }
    else {
      seterrornameuser("")
    }
  }
  const validatepass = (value) => {
    const regex = /^.{8,}$/
    if (!regex.test(value)) {
      seterrorpass("הסיסמא צריכה להכיל 8 תוים")
      setuser({ ...user, password: "" })
    }
    else {
      seterrorpass("")
    }
  }
  const func = (e) => {
    if (user.name == "" || user.password == "" || detailscard.nameCard == "" || detailscard.num == "" || detailscard.tokef == "" || detailscard.cvv == 0)
      alert("אחד הפרטים שגויים")
    else {
      addClient({ ...user, detailsCard: { ...detailscard } })
      alert("נרשמת בהצלחה")
      n('/home')
      e.preventDefault()
    }

  }

  {/* <input className="form-control" type="text" placeholder="name"  onBlur={(e) => setuser({ ...user, name: e.target.value })} ></input><br></br>
    <input className="form-control" type="text" placeholder="password"  onBlur={(e) => setuser({ ...user, password: e.target.value })}></input>
    <input className="form-control" type="text" placeholder="name of card"  onBlur={(e) => setdetails({ ...detailscard, nameCard: e.target.value })}></input>
    <input className="form-control" type="text" placeholder="number of card"  onBlur={(e) => setdetails({ ...detailscard, num: e.target.value })}></input>
    <input className="form-control" type="text" placeholder="tokef card"  onBlur={(e) => setdetails({ ...detailscard, tokef: e.target.value })}></input>
    <input className="form-control" type="text" placeholder="cvv card" onBlur={(e) => setdetails({ ...detailscard, cvv: e.target.value })}></input>
    <button style={{ margin: "0.5rem" }} className="btn btn-primary" onClick={(e) =>{addClient({...user,detailsCard:{...detailscard}});e.preventDefault(); alert("נרשמת בהצלחה");n('/home')}}>הירשם</button>\ */}

  return <> <h2>register page</h2>
    <div class="container my-5">
      <div class="justify-content-center">
        <div class="col-md-6">
          <div class="card shadow" style={{ width: "200%" }} id="important-style" >
            <div class="card-header bg-primary text-white text-center">
              <h3> טופס הרשמה</h3>
            </div>

            <div class="card-body">
              <div class="mb-3">
                <label for="name" class="form-label"> שם מלא</label>
                <input className="form-control" type="text" placeholder="name" onBlur={(e) => { setuser({ ...user, name: e.target.value }); validatenameuser(e.target.value) }} ></input>
                {errornameuser && <p className="alert alert-danger">{errornameuser}</p>}
              </div>
              <div class="mb-3 position-relative">
                <label for="password"  class="form-label">סיסמא</label>
                <input className="form-control pe-5" type="password" placeholder="password" onBlur={(e) => { setuser({ ...user, password: e.target.value }); validatepass(e.target.value) }} />
                {errorpass && <p className="alert alert-danger">{errorpass}</p>}
            
               
              </div>

              <h5 class="mt-4">פרטי תשלום</h5>
              <div class="mb-3">
                <label for="card-name" class="form-label"> שם בעל כרטיס אשראי</label>
                <input className="form-control" type="text" placeholder="name of card" onBlur={(e) => { setdetails({ ...detailscard, nameCard: e.target.value }); validatename(e.target.value) }}></input>
                {errorname && <p className="alert alert-danger">{errorname}</p>}
              </div>
              <div class="mb-3">
                <label for="card-number" class="form-label">  מספר כרטיס אשראי</label>
                <input className="form-control" type="text" placeholder="number of card" onBlur={(e) => { setdetails({ ...detailscard, num: e.target.value }); validatenum(e.target.value) }}></input>
                {erNumCard && <p className="alert alert-danger">{erNumCard}</p>}
              </div>
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="expiry-date" class="form-label">תוקף</label>
                  <input className="form-control" type="text" placeholder="tokef card" onBlur={(e) => { setdetails({ ...detailscard, tokef: e.target.value }); validatetokef(e.target.value) }}></input>
                  {erTokefCard && <p className="alert alert-danger">{erTokefCard}</p>}
                </div>
                <div class="col-md-6 mb-3">
                  <label for="cvv" class="form-label">CVV (3 digits)</label>
                  <input className="form-control" type="text" placeholder="cvv card" onBlur={(e) => { setdetails({ ...detailscard, cvv: e.target.value }); validatecvv(e.target.value) }}></input>
                  {erCvvCard && <p className="alert alert-danger">{erCvvCard}</p>}
                </div>
              </div>
              <button style={{ margin: "0.5rem" }} class="btn btn-primary w-100" onClick={(e) => { func(e) }} >להרשמה</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>

}




