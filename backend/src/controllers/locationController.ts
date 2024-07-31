import { Request, Response } from 'express';
import Location from '../models/Location';

export const addLocation = async (req: Request, res: Response) => {
  const { latitude, longitude, userId } = req.body;

  try {
    const newLocation = new Location({ latitude, longitude, userId });
    await newLocation.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: (err as Error).message });
  }
};

export const getLocations = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const locations = await Location.find({ userId }).sort({ timestamp: -1 });
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: (err as Error).message });
  }
};
