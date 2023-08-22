import express from 'express';
const router = express.Router();

import { signUp,signIn } from '../controllers/auth.js';
import { getOrderDetails,recordOrder ,getSpecificOrder} from '../controllers/order.js';

import auth from '../middleware/auth.js';

//Handle authentcaion
router.post("/add-user",signUp);
router.post("/login-user",signIn);

//Handle User related Stuff

//orders
router.get('/get-orders',auth,getOrderDetails);
router.get('/get-order/:id',auth,getSpecificOrder);
router.post('/add-order',auth,recordOrder);


export default router;