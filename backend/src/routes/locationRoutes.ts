import { Router } from 'express';
import { addLocation, getLocations } from '../controllers/locationController';

const router = Router();

router.post('/', addLocation);
router.get('/:userId', getLocations);

export default router;
