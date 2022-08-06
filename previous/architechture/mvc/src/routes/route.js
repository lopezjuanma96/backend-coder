import { Router } from 'express';
import { postPersonController, getPersonController } from '../controllers/personController.js'
import { postMealController, getMealController, getMealJSONController } from '../controllers/mealController.js'

const router = new Router();

//HTML on-wire
router.post('/html-onwire', postPersonController)
router.get('/html-onwire', getPersonController)

//DATA on-wire
router.post('/data-onwire', postMealController)
router.get('/data-onwire', getMealController)
router.get('/data-json', getMealJSONController)

export default router;