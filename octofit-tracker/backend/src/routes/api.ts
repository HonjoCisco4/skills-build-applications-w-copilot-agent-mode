import { Router, type Request, type Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const router = Router();

function createResourceRoute(path: string, model: typeof User) {
  router.get(path, async (_request: Request, response: Response) => {
    try {
      response.json(await model.find().lean());
    } catch (error) {
      response.status(500).json({ error: 'Unable to load resources', details: String(error) });
    }
  });

  router.post(path, async (request: Request, response: Response) => {
    try {
      const resource = await model.create(request.body);
      response.status(201).json(resource);
    } catch (error) {
      response.status(400).json({ error: 'Unable to create resource', details: String(error) });
    }
  });
}

createResourceRoute('/users', User);
createResourceRoute('/teams', Team);
createResourceRoute('/activities', Activity);
createResourceRoute('/workouts', Workout);

router.get('/leaderboard', async (_request, response) => {
  try {
    response.json(await Leaderboard.find().sort({ points: -1 }).populate('userId', 'username name').lean());
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: String(error) });
  }
});

router.post('/leaderboard', async (request, response) => {
  try {
    const entry = await Leaderboard.create(request.body);
    response.status(201).json(entry);
  } catch (error) {
    response.status(400).json({ error: 'Unable to create leaderboard entry', details: String(error) });
  }
});

export default router;