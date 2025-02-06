import { useState } from "react"
import { addCategory } from "../axios/categoryAxios"
import { useDispatch } from "react-redux"
import { add_category } from "../redux/actions/listCategoryAction"
import { useNavigate } from "react-router-dom"

export const AddCategory = () => {
    let d=useDispatch()
    const [myexcep, setmyexecp] = useState({name:true})
let navigate=useNavigate()
    const [obj, setobj] = useState({})
    const add=()=>{
      addCategory(obj).then((x)=>
               d(add_category(x))
        ).catch((e)=>console.log(e))
     navigate('/mylistCategory')
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
    return <>

<div class="container my-5">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div class="card shadow">
                    <div class="card-header bg-primary text-white text-center">
                        <h3>טופס הוספת משחק</h3>
                    </div>
                    <div class="card-body">

                        
                            <div class="mb-3">
                                <label class="form-label">שם קטגוריה</label>
                                <input type="text" placeholder="Enter name category " onBlur={(e) => setobj({ ...obj, name: e.target.value })} />
                            </div>
                          
                            <div class="d-grid">
                                <button onClick={() =>add()}  class="btn btn-success">הוסף משחק</button>
                            </div>

                    </div>
                </div>
            </div>
        </div>
    </div>
        {/* <div className="mb-3">
            <input type="text" placeholder="Enter name category " onBlur={(e) => setobj({ ...obj, name: e.target.value })} />
        </div>

        <button onClick={() =>add()} type="submit" className="btn btn-primary" >הוסף</button> */}
    </>
}