import express from'express';
import {isAdmin, requireSignIn} from '../middleware/authMiddleware.js'
import { createCategory, deleteCategory, getCategory, singleCategory, updateCategory } from '../controller/categoryController.js';
const router = express.Router();

router.post('/create-category',requireSignIn,isAdmin,createCategory)
router.put("/update-category/:id",requireSignIn,isAdmin,updateCategory)
router.get('/get-category',getCategory)
router.get('/single-category/:slug',singleCategory)
router.delete('/delete-category/:id',requireSignIn,isAdmin,deleteCategory)
export default router;