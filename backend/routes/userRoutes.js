import express from 'express';
import { signup, login ,logoutUser} from '../controllers/userController.js';

const router = express.Router();

// Authentication routes
router.post('/signup', signup);
router.post('/login', login);
router.post("/logout",logoutUser)
export default router;