import express from "express"

// Router ayuda a colocar los métodos que tendrá un endpoint
const router = express.Router()

router.route("/")
.get()
.post()

router.route("/:id")
.put()
.delete()

export default router;
