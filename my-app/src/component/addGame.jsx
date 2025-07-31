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


    return (
        <div className="container my-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow" style={{width:"400%"}} >
                        <div className="card-header bg-primary text-white text-center">
                            <h3>הוספת משחק חדש</h3>
                        </div>
                        <div className="card-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="gameName" className="form-label">שם המשחק</label><br></br>
                                    <input className="form-control" type="text" placeholder="הכנס שם משחק" onBlur={(e) => setobj({ ...obj, name: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="categoryCode" className="form-label">קוד קטגוריה</label><br></br>
                                    <input className="form-control" type="text" placeholder="הכנס קוד קטגוריה" onBlur={(e) => setobj({ ...obj, code_category: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="price" className="form-label">מחיר</label><br></br>
                                    <input className="form-control" type="number" placeholder="הכנס מחיר" onBlur={(e) => setobj({ ...obj, price: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="quantity" className="form-label">כמות</label><br></br>
                                    <input className="form-control" type="number" placeholder="הכנס כמות" onBlur={(e) => setobj({ ...obj, amount: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="age" className="form-label">גיל מינימלי</label><br></br>
                                    <input className="form-control" type="number" placeholder="הכנס גיל מינימלי" onBlur={(e) => setobj({ ...obj, age: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">תמונה</label><br></br>
                                    <input className="form-control" type="text" placeholder="הכנס שם תמונה" onBlur={(e) => setobj({ ...obj, img: e.target.value })} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="image" className="form-label">פרטי משחק</label><br></br>
                                    <textarea className="form-control" placeholder="הכנס פרטי משחק" onBlur={(e) => setobj({ ...obj, detailsGame: e.target.value })} />
                                </div>
                                <div className="d-grid">
                                    <button onClick={() => add()} className="btn btn-success">הוסף משחק</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}