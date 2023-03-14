import { Profile } from "../models/profile.js";
import { Skill } from "../models/skill.js";

const createSkill = async (req, res) => {
  try {
    req.body.skillOwner = req.user.profile
    const skill = await Skill.create(req.body)
    const profile = await Profile.findByIdAndUpdate(
      req.user.profile,
      { $push: { skills: skill } },
      { new: true }
    )
    skill.skillOwner = profile
    res.status(201).json(skill)
  } catch (error) {
      console.log(error)
      res.status(500).json(error)
  }
}

const index = async (req, res) => {
  try {
    const skills = await Skill.find({})
    .populate('skillOwner')
    .sort({ createdAt: 'desc' })
    res.status(200).json(skills)
  } catch (error) {
    console.log("This is the problem", error);
    res.status(500).json(error)
  }
}

const update  = async (req, res) => {
  try {
    const skill = await Skill.findByIdAndUpdate(
      req.params.id, 
      req.body,
      { new: true }
    )
    .populate('skillOwner')
    res.status(200).json(skill)
  } catch (error) {
    console.log("ERROR", error)
    res.status(500).json(error)
  }
}

export { 
  createSkill,
  index,
  update
}