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

export { 
  createSkill
}