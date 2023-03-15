// import npm packages
import 'dotenv/config.js'
import express from 'express'
import logger from 'morgan'
import cors from 'cors'
import formData from 'express-form-data'

// connect to MongoDB with mongoose
import db from './config/database.js'

// import routes
import { router as profilesRouter } from './routes/profiles.js'
import { router as authRouter } from './routes/auth.js'
import { router as networkRouter } from './routes/network.js'
import { router as skillsRouter } from './routes/skills.js'
import { router as jobsRouter } from './routes/jobs.js'
import { router as badgeRouter } from './routes/badge.js'

// create the express app
const app = express()

// basic middleware
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(formData.parse())

// mount imported routes
app.use('/api/profiles', profilesRouter)
app.use('/api/auth', authRouter)
app.use('/api/network', networkRouter)
app.use('/api/skills', skillsRouter)
app.use('/api/jobs', jobsRouter)
app.use('/api/badge', badgeRouter)

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`app listening on port ${port}`))

// handle 404 errors
app.use(function (req, res, next) {
  res.status(404).json({ err: 'Not found' })
})

// handle all other errors
app.use(function (err, req, res, next) {
  res.status(err.status || 500).json({ err: err.message })
})

db.on("connected", () => {
  console.clear();
  console.log(chalk.blue("Connected to MongoDB!"));
  app.listen(port, () => {
    console.log(
      `Express server running in development on port: ${port}`
    );
  });
});

export { app }
