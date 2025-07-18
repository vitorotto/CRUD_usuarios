import { Request, Response } from "express";
import { json, Router } from "express";

const router = Router();
router.use(json());

router.get('/', (req: Request, res: Response) => {
    res.status(200).json({ message: "Index do sistema" });
})

export default router;