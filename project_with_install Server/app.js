import express from 'express'
import mongoose from 'mongoose' 
import ca from './route/categoryRouter.js'
import ga from './route/gameRouter.js'
import cl from './route/clientRouter.js'
import sh from './route/shoppingRouter.js'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT || 8080

app.use(cors())
app.use(express.json())  // חשוב אם את מקבלת נתונים ב־body בפוסטים

app.use('/category', ca)
app.use('/game', ga)
app.use('/client', cl)
app.use('/shopping', sh)

app.use('/images', express.static('images'))  // עדיף כך להגיד להגיש תיקיית סטטיק

app.get('/', (req, res) => {
  res.send('השרת רץ! ברוך השם 🙌')
})

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ מחובר ל־MongoDB Atlas')
    app.listen(port, () => {
      console.log(`run barouch hashem on port ${port}`)
    })
  })
  .catch((err) => {
    console.error('❌ שגיאת חיבור:', err)
  })
