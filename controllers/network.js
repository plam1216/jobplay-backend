import { Profile } from "../models/profile.js";
import { Network } from "../models/network.js";

const create = async (req, res) => {
  try {
    req.body.networker = req.user.profile
    const network = await Network.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: {networksAchieved: network}},
      { new: true }
    )
    network.networker = profile
    res.status(201).json(network)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const network = await Network.find({})
    .populate('networker')
    .sort({ createdAt: 'desc'})
    res.status(200).json(network)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const update = async (req, res) => {
  try {
    const network = await Network.findByIdAndUpdate(
      req.params.id,
      req.body,
        {new : true}
    )
    .populate('networker')
    res.status(200).json(network)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

const show = async (req, res) => {
  try {
    const network = await Network.findById(req.params.id)
    .populate('networker')
    res.status(200).json(network)
  } catch (error) {
    res.status(500).json(error)
  }
}

export {
  create,
  index,
  update,
  show
}