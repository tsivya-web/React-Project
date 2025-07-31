import { useDispatch, useSelector } from "react-redux"
import { getAllOrder } from "../axios/shoppingAxios"
import { idClient } from "../axios/clientAxios"
import { getAllGame } from "../axios/gameAxios"
import { useEffect } from "react"
import { order } from "../redux/actions/shoppingAction.jsx"
import { set_listGame } from "../redux/actions/listGameAction.jsx"
import { useNavigate } from "react-router-dom"

export const AreaPersonal = () => {

    let d = useDispatch()

    let list = useSelector(x => x.dataShoppingReducer.order)
    let games = useSelector(x => x.dataGameReducer.list)
    let user = useSelector(x => x.dataClientReducer.currentClient)
    
    useEffect(() => {
        // טעינת המשחקים
        getAllGame()
            .then((response) => {
                d(set_listGame(response.data))
            })
            .catch((error) => {
                console.error("Error loading games:", error)
            })

        // טעינת ההזמנות
        if (user && user.name && user.password) {
            idClient(user.name, user.password)
                .then((x) => getAllOrder(x.data))
                .then((y) => {
                    console.log('Orders:', y.data)
                    d(order(y.data))
                })
                .catch((e) => console.log(e))
        }
    }, [user, d])

    const navigate = useNavigate()

    return (
        <div className="container mt-5">
            <div className="row">
                <h3 className="text-center text-primary mb-4">היסטוריית הזמנות</h3>
                <div className="col-12">
                    <div className="card shadow" style={{ width: "100%" }}>
                        <div className="card-body">
                            <table className="table table-striped text-center align-middle">
                                <thead className="table-primary">
                                    <tr>
                                        <th>מספר הזמנה</th>
                                        <th>תאריך הזמנה</th>
                                        <th>סכום כולל</th>
                                        <th>פעולות</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list && list.map((x, i) => (
                                        <tr key={i}>
                                            <td>{x._id}</td>
                                            <td>{new Date(x.date).toLocaleDateString('he-IL')}</td>
                                            <td>{x.totalPrice} שקל</td>
                                            <td>
                                                <button onClick={() => navigate(`/detailsOrder/${x._id}`)} className="btn btn-info text-white btn-sm">
                                                    צפה בפרטים
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}