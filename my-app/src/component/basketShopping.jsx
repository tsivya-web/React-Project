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
        
        // בדיקה טובה יותר אם המשתמש מחובר
        if (!user || !user.name || user.name === "" || !user.password || user.password === "") {
            alert("אינך מחובר ואינך יכול לבצע הזמנה")
            navigate('/login')
            return
        }
        

    
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
            <div className="cart-header">
                <h2>🛒 סל קניות</h2>
                <p className="cart-subtitle">סך הכל {func()} פריטים בסל</p>
            </div>
            
            {basket.length === 0 ? (
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                    </div>
                    <h3>הסל שלך ריק</h3>
                    <p>הוסף משחקים לסל כדי להתחיל</p>
                    <button className="btn btn-primary" onClick={() => navigate('/home')}>
                        <i className="fas fa-gamepad me-2"></i>
                        עבור לחנות
                    </button>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {basket.map((x, i) => (
                            <div key={i} className="cart-item">
                                <div className="cart-item-image-container">
                                    <img 
                                        src={`https://server-react-project-zobh.onrender.com/images/${x.img}`} 
                                        alt={x.name} 
                                        className="cart-item-image" 
                                    />
                                </div>
                                <div className="cart-item-details">
                                    <h3 className="cart-item-title">{x.name}</h3>
                                    <div className="cart-item-price">₪{x.price}</div>
                                </div>
                                <div className="cart-item-quantity-section">
                                    <div className="quantity-controls">
                                        <button 
                                            className="quantity-btn quantity-btn-minus"
                                            onClick={() => d(less_amount(x._id))}
                                            disabled={x.amount <= 1}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="quantity-display">{x.amount}</span>
                                        <button 
                                            className="quantity-btn quantity-btn-plus"
                                            onClick={() => d(add_amount(x._id))}
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                    <div className="cart-item-total">₪{x.price * x.amount}</div>
                                </div>
                                <div className="cart-item-actions">
                                    <button 
                                        className="remove-item-btn" 
                                        onClick={() => d(dellItem(x._id))}
                                        title="הסר מהסל"
                                    >
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    <div className="cart-summary">
                        <div className="summary-header">
                            <h3>📋 סיכום הזמנה</h3>
                        </div>
                        <div className="summary-details">
                            <div className="summary-row">
                                <span>סך הכל פריטים:</span>
                                <span>{func()}</span>
                            </div>
                            <div className="summary-row total-row">
                                <span>סך הכל לתשלום:</span>
                                <span className="total-price">₪{totalPrice()}</span>
                            </div>
                        </div>
                        <button 
                            className="checkout-button" 
                            onClick={addOrder}
                            disabled={!user || !user.name}
                        >
                            <i className="fas fa-credit-card me-2"></i>
                            {user && user.name ? 'המשך לתשלום' : 'התחבר כדי להמשיך'}
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
