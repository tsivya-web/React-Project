import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { getAllGame } from "../axios/gameAxios"
import { set_listGame } from "../redux/actions/listGameAction"
import { useNavigate } from "react-router-dom"
import { add_item } from '../redux/actions/basketAction';


export const DetailsGame = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { code } = useParams()
  const listGame = useSelector(x => x.dataGameReducer.list)
  const listCategory = useSelector(x => x.dataCategoryReducer.list)
  
  const [game, setGame] = useState(null)
  const [category, setCategory] = useState(null)

  useEffect(() => {
    // אם המשחקים לא נטענו, נטען אותם
    if (!listGame || listGame.length === 0) {
      getAllGame()
        .then((response) => {
          dispatch(set_listGame(response.data))
        })
        .catch((error) => {
          console.error("Error loading games:", error)
        })
    }
  }, [listGame, dispatch])

  useEffect(() => {
    if (listGame && listGame.length > 0) {
      const foundGame = listGame.find(g => g._id === code)
      console.log("Found game:", foundGame)
      if (foundGame) {
        setGame(foundGame)
        // מצא את הקטגוריה
        if (listCategory && listCategory.length > 0) {
          const foundCategory = listCategory.find(c => c._id === foundGame.code_category)
          setCategory(foundCategory)
        }
      }
    }
  }, [listGame, listCategory, code])

  const addToBasket = () => {
    if (game) {
        dispatch(add_item(game));
      alert("המשחק נוסף לסל בהצלחה!")
    }
  }

  const goBack = () => {
    navigate('/home')
  }

  if (!game) {
    return (
      <div className="container">
        <div className="loading">
          <div className="spinner"></div>
        </div>
      </div>
    )
  }
  
  console.log("Game details - Amount:", game.amount, "Type:", typeof game.amount, "Is > 0:", game.amount > 0)

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="card" style={{width: "100%"}}>
            <div className="card-header">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="mb-0">פרטי המשחק</h2>
                <button className="btn btn-outline-primary" onClick={goBack}>
                  ← חזור לדף הבית
                </button>
              </div>
            </div>
            <div className="card-body">
              <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                  <div className="game-image-container">
                    <img 
                      src={`https://server-react-project-zobh.onrender.com/images/${game.img}`} 
                      alt={game.name}
                      className="game-detail-image"
                    />
                  </div>
                </div>
                <div className="col-lg-8 col-md-12">
                  <div className="game-details">
                    <h1 className="game-title">{game.name}</h1>
                    <div className="game-category">
                      <span className="category-badge">
                        {category ? category.name : 'לא ידוע'}
                      </span>
                    </div>
                    <div className="game-price">
                      <span className="price-amount">₪{game.price}</span>
                    </div>
                    <div className="game-info-grid">
                      <div className="info-item">
                        <strong>גיל מינימלי:</strong>
                        <span className="age-badge">{game.age}+</span>
                      </div>
                      <div className="info-item">
                        <strong>כמות במלאי:</strong>
                        <span className="stock-badge">{parseInt(game.amount) || 0}</span>
                      </div>
                    </div>
                    <div className="game-description">
                      <h5>תיאור המשחק:</h5>
                      <p>{game.detailsGame || 'אין תיאור זמין למשחק זה.'}</p>
                    </div>
                    <div className="game-actions">
                      <button 
                        className="btn btn-primary btn-lg me-3"
                        onClick={addToBasket}
                        disabled={parseInt(game.amount) <= 0}
                      >
                        {parseInt(game.amount) > 0 ? 'הוסף לסל' : 'אזל המלאי'}
                      </button>
                      <button 
                        className="btn btn-outline-primary btn-lg"
                        onClick={() => navigate('/basket')}
                      >
                        עבור לסל
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}