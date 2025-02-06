import { useState } from "react"
import { addGame } from "../axios/gameAxios"
import { add_game } from "../redux/actions/listGameAction"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"


export const AddGame = () => {
    let d = useDispatch()
    let navigate = useNavigate()
    const [obj, setobj] = useState({})
    const add = () => {
        addGame(obj).then((x) =>
            d(add_game(x.data))
        ).catch((e) => console.log(e))
        navigate('/myListGame')
    }


    return <>
        <div class="container my-5">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <div class="card shadow" style={{width:"400%"}} >
                        <div class="card-header bg-primary text-white text-center">
                            <h3>טופס הוספת משחק</h3>
                        </div>
                        <div class="card-body">

                                <div>
                                    <div class="mb-3">
                                        <label for="gameName" class="form-label">שם המשחק</label><br></br>
                                        <input type="text" placeholder="Enter name game " onBlur={(e) => setobj({ ...obj, name: e.target.value })} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="categoryCode" class="form-label">קוד קטגוריה</label><br></br>
                                        <input type="text" placeholder="Enter kod Category " onBlur={(e) => setobj({ ...obj, code_category: e.target.value })} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="price" class="form-label">מחיר</label><br></br>
                                        <input type="text" placeholder="Enter price game " onBlur={(e) => setobj({ ...obj, price: e.target.value })} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="quantity" class="form-label">כמות</label><br></br>
                                        <input type="text" placeholder="Enter amount game " onBlur={(e) => setobj({ ...obj, amount: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <div class="mb-3">
                                        <label for="age" class="form-label">גיל מינימלי</label><br></br>
                                        <input type="text" placeholder="Enter age game " onBlur={(e) => setobj({ ...obj, age: e.target.value })} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="image" class="form-label">תמונה</label><br></br>
                                        <input type="text" placeholder="Enter image game " onBlur={(e) => setobj({ ...obj, img: e.target.value })} />
                                    </div>
                                    <div class="mb-3">
                                        <label for="image" class="form-label">פרטי משחק</label><br></br>
                                        <input type="text" placeholder="Enter details game " onBlur={(e) => setobj({ ...obj, detailsGame: e.target.value })} />
                                    </div>
                                    <div class="d-grid">
                                        <button  onClick={() => add()} class="btn btn-success">הוסף משחק</button>
                                    </div>
                                </div>
                 
                        </div>
                    </div>
                </div>
            </div>
        </div>

        {/* <div className="mb-3">
            <input type="text" placeholder="Enter name game " onBlur={(e) => setobj({ ...obj, name: e.target.value })} />
        </div>
        <div className="mb-3">
            <input type="text" placeholder="Enter kod Category " onBlur={(e) => setobj({ ...obj, code_category: e.target.value })} />
        </div>
        <div className="mb-3">
            <input type="text" placeholder="Enter price game " onBlur={(e) => setobj({ ...obj, price: e.target.value })} />
        </div>
        <div className="mb-3">
            <input type="text" placeholder="Enter image game " onBlur={(e) => setobj({ ...obj, img: e.target.value })} />
        </div>
        <div className="mb-3">
            <input type="text" placeholder="Enter amount game " onBlur={(e) => setobj({ ...obj, amount: e.target.value })} />
        </div>
        <div className="mb-3">
            <input type="text" placeholder="Enter age game " onBlur={(e) => setobj({ ...obj, age: e.target.value })} />
        </div>
        <div className="mb-3">
            <input type="text" placeholder="Enter details game " onBlur={(e) => setobj({ ...obj, detailsGame: e.target.value })} />
        </div>
        <button onClick={() =>add()} type="submit" className="btn btn-primary" >הוסף</button> */}
    </>
}