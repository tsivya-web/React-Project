import express from 'express'
import mongoose from 'mongoose' 
import ca from './route/categoryRouter.js'
import ga from './route/gameRouter.js'
import cl from './route/clientRouter.js'
import sh from './route/shoppingRouter.js'
 import cors from 'cors'
 import dotenv from 'dotenv'
const app=express()
app.use(cors())
app.use('/images',ca)
app.use('/category',ca)
app.use('/game',ga)
app.use('/client',cl)
app.use('/shopping',sh)


dotenv.config();
app.use(express.static('images'))
//ייבוא כתובת לפרויקט
app.listen("8080",()=>{console.log("run barouch hashem")})

app.get('/', (req, res) => {
  res.send('השרת רץ! ברוך השם 🙌');
});
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ מחובר ל־MongoDB Atlas'))
  .catch((err) => console.error('❌ שגיאת חיבור:', err));