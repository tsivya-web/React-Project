import { useDispatch, useSelector } from "react-redux"
import { empty } from "../redux/actions/basketAction"

export const Order = () => {
    const a=useDispatch()
    const basket = useSelector(x => x.dateBasketReducer.basket)
    const current = useSelector(x => x.dataClientReducer.currentClient)
    const d=new Date()
    
    const func = () => {
        let price = 0
        for (let index = 0; index < basket.length; index++) {
            price += basket[index].amount*basket[index].price
        } 
        return price
    }
    
    return (
        <div className="order-container">
            <div className="order-card">
                <div className="order-header">
                    <div className="order-header-icon">
                        <i className="fas fa-check-circle"></i>
                    </div>
                    <h2>✅ הזמנה הושלמה בהצלחה!</h2>
                    <p>תודה על הרכישה שלך</p>
                </div>
                
                <div className="order-content">
                    <div className="order-info-section">
                        <div className="order-info-item">
                            <div className="info-icon">
                                <i className="fas fa-user"></i>
                            </div>
                            <div className="info-content">
                                <label>שם לקוח</label>
                                <span>{current.name}</span>
                            </div>
                        </div>
                        
                        <div className="order-info-item">
                            <div className="info-icon">
                                <i className="fas fa-calendar-alt"></i>
                            </div>
                            <div className="info-content">
                                <label>תאריך הזמנה</label>
                                <span>{d.getDate()}/{d.getMonth()+1}/{d.getFullYear()}</span>
                            </div>
                        </div>
                        
                        <div className="order-info-item">
                            <div className="info-icon">
                                <i className="fas fa-shopping-bag"></i>
                            </div>
                            <div className="info-content">
                                <label>מספר פריטים</label>
                                <span>{basket.length}</span>
                            </div>
                        </div>
                    </div>

                    <div className="order-items-section">
                        <h3>📋 פרטי ההזמנה</h3>
                        <div className="order-items">
                            {basket.map((x, i) => (
                                <div key={i} className="order-item">
                                    <div className="item-image">
                                        <img 
                                            src={`https://server-react-project-zobh.onrender.com/images/${x.img}`} 
                                            alt={x.name}
                                        />
                                    </div>
                                    <div className="item-details">
                                        <h4>{x.name}</h4>
                                        <div className="item-info">
                                            <span className="item-price">₪{x.price}</span>
                                            <span className="item-quantity">x{x.amount}</span>
                                        </div>
                                    </div>
                                    <div className="item-total">
                                        ₪{x.amount * x.price}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="order-summary">
                        <div className="summary-row">
                            <span>סך הכל פריטים:</span>
                            <span>{basket.length}</span>
                        </div>
                        <div className="summary-row total-row">
                            <span>סך הכל לתשלום:</span>
                            <span className="total-price">₪{func()}</span>
                        </div>
                    </div>
                </div>
                
                <div className="order-footer">
                    <div className="success-message">
                        <i className="fas fa-heart"></i>
                        <p>תודה רבה על הרכישה! המשחקים שלך בדרך אליך</p>
                    </div>
                    <button 
                        className="btn btn-primary"
                        onClick={() => {
                            a(empty())
                            window.location.href = '/home'
                        }}
                    >
                        <i className="fas fa-home me-2"></i>
                        חזור לדף הבית
                    </button>
                </div>
            </div>
        </div>
    )
}