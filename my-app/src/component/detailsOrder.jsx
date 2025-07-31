import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllGame } from "../axios/gameAxios";
import { set_listGame } from "../redux/actions/listGameAction.jsx";

export const DetailsOrder = () => {
  let list = useSelector(x => x.dataShoppingReducer.order)
  let game = useSelector(x => x.dataGameReducer.list)
  const dispatch = useDispatch();
  const a = useParams();

  const index = list.findIndex((u) => u._id == a.id);
  const selectedOrder = list[index];
  
  useEffect(() => {
    // אם המשחקים לא נטענו, נטען אותם
    if (!game || game.length === 0) {
      getAllGame()
        .then((response) => {
          dispatch(set_listGame(response.data))
        })
        .catch((error) => {
          console.error("Error loading games:", error)
        })
    }
  }, [game, dispatch])
  
  if (!selectedOrder) {
    return <div>הזמנה לא נמצאה</div>
  }

  const getItemDetails = (id) => {
    return game.find((u) => u._id == id);
  };

  return (
    <div className="order-details">
      <div className="card shadow" style={{width:"100%"}}>
        <div className="card-header text-center">
          <h3>פרטי הזמנה</h3>
        </div>
        <div className="card-body">
          <div className="mb-3">
            <strong>מספר הזמנה:</strong> {selectedOrder._id}
          </div>
          <div className="table-responsive">
            <table className="table table-bordered table-striped">
              <thead className="table-primary">
                <tr>
                  <th>שם המשחק</th>
                  <th>מחיר</th>
                  <th>כמות</th>
                  <th>תמונה</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder.arrShopping && selectedOrder.arrShopping.map((item, index) => {
                  const gameDetails = getItemDetails(item.id_game);
                  return (
                    <tr key={index}>
                      <td>{gameDetails ? gameDetails.name : 'לא נמצא'}</td>
                      <td>{item.price} שקל</td>
                      <td>{item.amount}</td>
                      <td>
                        {gameDetails && gameDetails.img && (
                          <img 
                            src={`https://server-react-project-zobh.onrender.com/images/${gameDetails.img}`} 
                            alt={gameDetails.name} 
                            className="product-img" 
                            style={{width: '50px', height: '50px', objectFit: 'cover'}}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <div className="text-end mt-4">
            <h4>סה"כ לתשלום: {selectedOrder.totalPrice} שקל</h4>
          </div>
        </div>
        <div className="card-footer text-center bg-light">
          <p>תאריך הזמנה: {new Date(selectedOrder.date).toLocaleDateString('he-IL')}</p>
        </div>
      </div>
    </div>
  )
}
  