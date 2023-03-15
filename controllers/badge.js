import { Badge } from '../models/badge.js'

function index(req, res) {
  Badge.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}


export { index }
