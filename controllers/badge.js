import { Badge } from '../models/badge.js'

function index(req, res) {
  Badge.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

// function addBadge(req, res) {
//   const imageFile = req.files.photo.path
//   Badge.findById(req.params.id)
//   .then(badge => {
//     cloudinary.uploader.upload(imageFile, {tags: `admin`})
//     .then(image => {
//       badge.photo = image.url
//       badge.save()
//       .then(badge => {
//         res.status(201).json(badge.photo)
//       })
//     })
//     .catch(err => {
//       console.log(err)
//       res.status(500).json(err)
//     })
//   })
// }

export const addBadge = async (req, res) => {
  try {
    const badge = new Badge(req.body);
    await badge.save();
    res.status(201).json(badge);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};


export { index }
