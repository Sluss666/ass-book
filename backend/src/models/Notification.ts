import { Schema, model, Document, Types } from "mongoose";

export interface INotification extends Document {
  user: Types.ObjectId;        // Usuario que recibe la notificación
  sender?: Types.ObjectId;     // Usuario que la generó (opcional)
  type: "friend_request" | "message" | "like" | "comment" | "system";
  content: string;             // Texto o resumen
  read: boolean;               // Si ya fue vista
  createdAt: Date;
}

const notificationSchema = new Schema<INotification>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  type: { 
    type: String, 
    enum: ["friend_request", "message", "like", "comment", "system"], 
    required: true 
  },
  content: { type: String, required: true },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

const Notification = model<INotification>("Notification", notificationSchema);

export default Notification;
