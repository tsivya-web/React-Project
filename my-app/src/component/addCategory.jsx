import { useState } from "react"
import { addCategory } from "../axios/categoryAxios"
import { useDispatch, useSelector } from "react-redux"
import { add_category } from "../redux/actions/listCategoryAction"
import { useNavigate } from "react-router-dom"

export const AddCategory = () => {
    let d=useDispatch()
    let isManager = useSelector(x => x.dataClientReducer.isManager)
    const [myexcep, setmyexecp] = useState({name:true})
    let navigate=useNavigate()
    const [obj, setobj] = useState({})
    const add=()=>{
      addCategory(obj).then((x)=>
               d(add_category(x))
        ).catch((e)=>console.log(e))
     navigate('/mylistCategory')
    }
    
    // בדיקה אם המשתמש הוא מנהל
    if (!isManager) {
        return (
            <div className="access-denied">
                <div className="access-denied-icon">
                    <i className="fas fa-lock"></i>
                </div>
                <h3>גישה מוגבלת</h3>
                <p>רק מנהלים יכולים לגשת לדף זה</p>
            </div>
        )
    }

    // const func = (e) => {
    //     debugger
    //     let s = e.target.value;
    //     let NValid=  !s.match("[a-z]{1*}")

    //     if(s=="")
    //         setmyexecp({...myexcep,name:"שדה חובה"})
    //     else if(NValid)
    //         setmyexecp({...myexcep,name:"חייב להכיל רק אותיות "})
    //     // else
    //     //     setmyexecp({...myexcep,name:true})

           
    // }
    return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h3>הוספת קטגוריה חדשה</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">שם קטגוריה</label>
                  <input className="form-control" type="text" placeholder="הכנס שם קטגוריה" onBlur={(e) => setobj({ ...obj, name: e.target.value })} />
                </div>
                <div className="d-grid">
                  <button onClick={() => add()} className="btn btn-success">הוסף קטגוריה</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}