import { Profile } from '../models/profile.js'
import { v2 as cloudinary } from 'cloudinary'

function index(req, res) {
  Profile.find({})
  .then(profiles => res.json(profiles))
  .catch(err => {
    console.log(err)
    res.status(500).json(err)
  })
}

export const getProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const profile = await Image.findById(id)
      .populate("badge")
      .populate("skillsUnlocked")
      .populate("networksAchieved")
      .populate("jobApplied")

    if (profile) {
      return res.json(profile);
    }

    res.status(404).json({ message: "Profile not found!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const {id} = req.params;
    const profile = await UserData.findByIdAndUpdate(id, req.body, { new: true });
    res.status(201).json(profile);
  } catch (error) {
    console.error(error);
    res.status(500).json({error: error.message});
  }
};

function addPhoto(req, res) {
  const imageFile = req.files.photo.path
  Profile.findById(req.params.id)
  .then(profile => {
    cloudinary.uploader.upload(imageFile, {tags: `${req.user.email}`})
    .then(image => {
      profile.photo = image.url
      profile.save()
      .then(profile => {
        res.status(201).json(profile.photo)
      })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
  })
}

export { index, addPhoto }
