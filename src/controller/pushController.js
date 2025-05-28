import webpush from "web-push";

const subscriptions = [];

class PushController {
  static saveSubscription(req, res) {
    const subscription = req.body;
    // Cek duplikat
    if (!subscriptions.find((s) => s.endpoint === subscription.endpoint)) {
      subscriptions.push(subscription);
      // console.log("Subscription saved:", subscription.endpoint);
    } else {
      // console.log("Subscription already exists:", subscription.endpoint);
    }
    res.status(201).json({ message: "Subscription saved." });
  }

  static async sendPushToAll(req, res) {
    if (subscriptions.length === 0) {
      console.log("No subscriptions to send push notification.");
    }
    const { title, body } = req.body;
    const payload = JSON.stringify({ title, body });
    let success = 0;
    let fail = 0;
    await Promise.all(
      subscriptions.map(async (sub, idx) => {
        try {
          await webpush.sendNotification(sub, payload);
          success++;
        } catch (err) {
          fail++;
          // Log error detail
          console.error("Push error:", err.statusCode, err.body);
          // Hapus subscription jika error 410/404
          if (err.statusCode === 410 || err.statusCode === 404) {
            subscriptions.splice(idx, 1);
            console.log("Removed invalid subscription:", sub.endpoint);
          }
        }
      })
    );
    res.json({ success, fail, total: subscriptions.length });
  }

  static getVapidPublicKey(req, res) {
    res.json({ publicKey: process.env.VAPID_PUBLIC_KEY });
  }

  // Endpoint debug: lihat semua subscription
  static getAllSubscriptions(req, res) {
    res.json({ subscriptions });
  }
}

webpush.setVapidDetails(
  "mailto:wiz.fie@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

export default PushController;
