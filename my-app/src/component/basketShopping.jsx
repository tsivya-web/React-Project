import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { add_amount, dellItem, empty, less_amount } from "../redux/actions/basketAction"
import '../basket.css'

import '../input.css'
import { useNavigate } from "react-router-dom"
import { idClient } from "../axios/clientAxios"
import { add } from "../axios/shoppingAxios"
export const BasketShopping = () => {
    const navigate=useNavigate();
    debugger
// const [total, settotal] = useState({})
    let user = useSelector(x => x.dataClientReducer.currentClient)
    const basket = useSelector(x => x.dateBasketReducer.basket)
    let d = useDispatch()
    const func=()=>{
        let amount=0
        for (let index = 0; index < basket.length; index++) {
            amount=amount+basket[index].amount    
        }
        return amount
    }
    const totalPrice=()=>{
        let totalPrice=0
        for (let index = 0; index < basket.length; index++) {
            totalPrice+=basket[index].price*basket[index].amount
        }
        return totalPrice
    }
    const addOrder = async () => {
        debugger
        
        // בדיקה טובה יותר אם המשתמש מחובר
        if (!user || !user.name || user.name === "" || !user.password || user.password === "") {
            alert("אינך מחובר ואינך יכול לבצע הזמנה")
            navigate('/login')
            return
        }
        
        debugger
    
        let id = "";
        try {
            // מחכים לתוצאה של idClient
            const response = await idClient(user.name, user.password);
            id = response.data;
        } catch (e) {
            console.log(e);
            alert("שגיאה בקבלת פרטי המשתמש")
            return; // אם קרתה שגיאה, יוצאים מהפונקציה
        }
        
        const selectedDetails = Object.entries(basket).map(([key, value]) => ({
            price: value.price,
            id_game: value._id,
            amount: value.amount,
        }));
    

        const x = {
            code_client: id,
            date: new Date(),
            totalPrice: totalPrice(),
            arrShopping: selectedDetails
        };
    
        // מוסיפים את ההזמנה

        try {
            // מחכים לתוצאה של idClient
            const r = await add(x);
            const a = r.data;
            alert("ההזמנה בוצעה בהצלחה!")
        } catch (e) {
            console.log(e);
            alert("שגיאה בביצוע ההזמנה")
            return; // אם קרתה שגיאה, יוצאים מהפונקציה
        }
        
        navigate('/order')
    }
    
    return (
        <div className="shopping-cart">
            <h2>סל קניות</h2>
            {basket.map((x, i) => (
                <div key={i} className="cart-item">
                    <img src={`../images/${x.img}`} alt="Game 1" className="cart-item-image" />
                    <div className="cart-item-details">
                        <h3 className="cart-item-title">{x.name}</h3>
                        <p className="cart-item-price">מחיר: {x.price} שקל</p>
                        <div className="cart-item-quantity-wrapper">
                            <button onClick={() => d(less_amount(x._id))}>-</button>
                            <span>{x.amount}</span>
                            <button onClick={() => d(add_amount(x._id))}>+</button>
                        </div>
                        <div className="cart-item-total">מחיר סופי : {x.price * x.amount} שקל</div>
                        <button className="remove-item" onClick={() => d(dellItem(x._id))}>מחק</button>
                    </div>
                </div>
            ))}
            <div className="cart-summary">
                <h3>סיכום הזמנה</h3>
                <p>סה"כ לתשלום: {totalPrice()} שקל</p>
                <button className="checkout-button" onClick={(e) => { addOrder() }}>Proceed to Checkout</button>
            </div>
        </div>
    )
}
