import express from "express";
const router = express.Router();
import PushController from "../controller/pushController.js";
class pushRoutes {
  static setupRoutes() {
    const router = express.Router();

    router.post("/save-subscription", PushController.saveSubscription);
    router.post("/send-push", PushController.sendPushToAll);
    router.get("/vapid-public-key", PushController.getVapidPublicKey);

    return router;
  }
}

export default pushRoutes.setupRoutes();
