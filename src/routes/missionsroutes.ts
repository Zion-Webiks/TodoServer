import express, { Request, Response } from 'express';
import Mission from '../models/missionsModel';

const router = express.Router();

// Get all missions
router.get('/:apikey', async (req: Request, res: Response) => {
  try {
    const missions = await Mission.find({apikey:req.params.apikey});
    res.json(missions);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching missions' });
  }
});

// Add a new mission
router.post('/:apikey', async (req: Request, res: Response) => {
  const { name, status, priority, description } = req.body;
  const apikey = req.params.apikey;
  try {
    const newMission = new Mission({ name, status, priority, description,apikey });
    const savedMission = await newMission.save();
    res.json(savedMission);
  } catch (error) {
    res.status(500).json({ message: 'Error adding mission', error:error });
  }
});


// Delete mission by ID
router.delete('/:apikey/:id', async (req: Request, res: Response) => {
  try {
    const deletedMission = await Mission.findOneAndDelete({_id:req.params.id, apikey: req.params.apikey});
    if(!deletedMission)
    {
      res.json({message:"Couldn't find the mission"})
      return;
    }
    res.json(deletedMission);
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mission' });
  }
});


router.post('/:apikey/progress/:id', async (req: Request, res: Response) => {
  try {
    const mission = await Mission.findOne({_id: req.params.id, apikey:req.params.apikey});
    if(!mission)
      {
        res.json({message:"Couldn't find the mission"})
        return;
      }    
    if(mission?.status == "In Progress") mission.status = "Completed";
    else if(mission?.status == "Pending") mission.status = "In Progress";
    mission?.save();
    res.json({message: "Progressed"})
  } catch (error) {
    res.status(500).json({ message: 'Error deleting mission' });
  }
});
export default router;
