
import express from 'express';
import politicaController from '../controllers/politicaController.js'; 

const router = express.Router();

router.post('/', politicaController.createPolitica);
router.get('/', politicaController.getAllPolitica);
router.get('/:id', politicaController.getPoliticaById);
router.post('/:id/analisa', politicaController.analisaPolitica);

export default router;