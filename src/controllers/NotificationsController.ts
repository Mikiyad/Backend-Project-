import { Request, Response } from "express";
import { Notification } from "../entity/NotificationEntity";

async function addNotification(req: Request, res: Response) {
  try {
    const notification = new Notification();
    notification.title = req.body.title;
    notification.message = req.body.message;
    notification.read = req.body.read;
    notification.userId = req.body.userId;
    notification.onClick = req.body.onClick;
    await Notification.save(notification);
    res.send({
      success: true,
      message: "Notifications Added successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

async function getAllNotifications(req: Request, res: Response) {
  try {
    const notifications = await Notification.createQueryBuilder("notification")
      .where("userId = :userId", { userId: req.body.id })
      .orderBy("createdAt", "DESC") 
      .getMany();
    if (!notifications) {
      throw new Error("No notifications found");
    }
    res.send({
      success: true,
      data: notifications,
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

async function deleteNotification(req: Request, res: Response) {
  try {
    const notification = await Notification.findOne({
      where: { id: parseInt(req.params.id) },
    });
    if (!notification) {
      throw new Error("Notification not found");
    }
    await notification.remove();
    res.send({
      success: true,
      message: "Notifications deleted successfully",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}

async function readAllNotifications(req: Request, res: Response) {
  try {
    await Notification.createQueryBuilder()
      .update(Notification)
      .set({ read: true })
      .where("userId = :userId AND read = false", { userId: req.body.userId })
      .execute();
    res.send({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error: any) {
    res.status(500).send({
      success: false,
      message: error.message,
    });
  }
}
export {
  addNotification,
  getAllNotifications,
  deleteNotification,
  readAllNotifications,
};
