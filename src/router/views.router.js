import { Router } from "express";

const viewsRouter = Router();

viewsRouter.get('/', async (req, res) => {
    res.render('home', {})
})

export default viewsRouter