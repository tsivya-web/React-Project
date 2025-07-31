import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getAllGame } from "../axios/gameAxios"
import { getAllCategory } from "../axios/categoryAxios"
import { set_listGame } from "../redux/actions/listGameAction"
import { set_listCategory } from "../redux/actions/listCategoryAction"
import { add_item } from "../redux/actions/basketAction"
import { useNavigate } from "react-router-dom"

export const Home = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const listGame = useSelector(x => x.dataGameReducer.list)
  const listCategory = useSelector(x => x.dataCategoryReducer.list)
  const [selectedCategory, setSelectedCategory] = useState("")
  const [found, setFound] = useState(false)

    useEffect(() => {
    getAllGame()
      .then((response) => {
        dispatch(set_listGame(response.data))
      })
      .catch((error) => {
        console.error("Error loading games:", error)
      })

    getAllCategory()
      .then((response) => {
        dispatch(set_listCategory(response.data))
      })
      .catch((error) => {
        console.error("Error loading categories:", error)
      })
  }, [dispatch])

  const filteredGames = selectedCategory
    ? listGame.filter(game => game.code_category === selectedCategory)
    : listGame

  const mynavigate = (path) => {
    navigate(path)
  }

  const addToBasket = (game) => {
    dispatch(add_item(game))
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-12">
          <div className="text-center mb-5">
            <h1 className="display-4 text-white mb-3">🎮 חנות המשחקים שלנו</h1>
            <p className="lead text-white-50">גלה את המשחקים הטובים ביותר במחירים הטובים ביותר</p>
          </div>

          {/* Professional Category Filter */}
          <div className="filter-section mb-5">
            <div className="filter-container">
              <div className="filter-header">
                <h3 className="filter-title">
                  <i className="fas fa-filter me-2"></i>
                  סינון משחקים
                </h3>
                <p className="filter-subtitle">בחר קטגוריה לסינון המשחקים</p>
              </div>
              
              <div className="filter-tabs">
                <div className="filter-tab-wrapper">
                  <button
                    className={`filter-tab ${!selectedCategory ? 'active' : ''}`}
                    onClick={() => setSelectedCategory("")}
                  >
                    <i className="fas fa-gamepad me-2"></i>
                    <span>כל המשחקים</span>
                    <span className="filter-count">{listGame.length}</span>
                  </button>
                  
                  {listCategory.map((category) => {
                    const categoryGames = listGame.filter(game => game.code_category === category._id)
                    return (
                      <button
                        key={category._id}
                        className={`filter-tab ${selectedCategory === category._id ? 'active' : ''}`}
                        onClick={() => setSelectedCategory(category._id)}
                      >
                        <i className="fas fa-tag me-2"></i>
                        <span>{category.name}</span>
                        <span className="filter-count">{categoryGames.length}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {selectedCategory && (
                <div className="filter-info">
                  <div className="filter-info-content">
                    <i className="fas fa-info-circle me-2"></i>
                    <span>
                      מציג {filteredGames.length} משחקים מתוך {listGame.length} משחקים זמינים
                    </span>
                    <button 
                      className="clear-filter-btn"
                      onClick={() => setSelectedCategory("")}
                    >
                      <i className="fas fa-times me-1"></i>
                      נקה סינון
                    </button>
                  </div>
                </div>
              )}
            </div>
</div>

          {/* Games Grid */}
          {filteredGames.length === 0 ? (
            <div className="text-center">
              <div className="no-games-card">
                <div className="no-games-icon">
                  <i className="fas fa-search"></i>
                </div>
                <h3>לא נמצאו משחקים</h3>
                <p>נסה לבחור קטגוריה אחרת או בדוק מאוחר יותר</p>
                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedCategory("")}
                >
                  <i className="fas fa-undo me-2"></i>
                  הצג את כל המשחקים
                </button>
              </div>
            </div>
          ) : (
            <div className="games-grid">
              <div className="row">
                {filteredGames.map((game, index) => (
                  <div key={index} className="col-lg-4 col-md-6 col-sm-12 mb-4">
                    <div className="game-card" onClick={() => mynavigate(`/detailsGame/${game._id}`)}>
                      <img 
                        src={`https://server-react-project-zobh.onrender.com/images/${game.img}`} 
                        alt={game.name}
                        className="game-image"
                      />
                      <div className="game-card-body">
                        <h5 className="game-card-title">{game.name}</h5>
                        <div className="game-card-info">
                          <span className="game-card-price">₪{game.price}</span>
                          <span className="game-card-age">גיל מינימלי: {game.age}+</span>
                        </div>
                        <div className="game-card-actions">
                          <button
                            className="btn btn-primary btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              addToBasket(game)
                            }}
                          >
                            <i className="fas fa-shopping-cart me-1"></i>
                            הוסף לסל
                          </button>
                          <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={(e) => {
                              e.stopPropagation()
                              mynavigate(`/detailsGame/${game._id}`)
                            }}
                          >
                            <i className="fas fa-eye me-1"></i>
                            פרטים נוספים
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                </div>
            )}
        </div>
      </div>
    </div>
  )
}