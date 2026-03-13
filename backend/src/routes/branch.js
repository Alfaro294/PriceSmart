import express from "express"
import branchesController from "../controllers/branch.js"

const router = express.Router()

router.route("/")
.get(branchesController.getBranch)
.post(branchesController.insertBranch)

router.route ("/:id")
.put (branchesController.updateBranch)
.delete (branchesController.deleteBranch)

export default router;