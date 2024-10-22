import { Router } from 'express';
import {
  searchTracks,
  searchTrackById,
  favoritos,
} from '../src/controllers/controller.js';

const router = Router();

router.get('/search_tracks', searchTracks)

router.get('/search_track/:id', searchTrackById)

router.post('/favoritos', favoritos)

export default router;
