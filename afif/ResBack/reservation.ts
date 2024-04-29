import mongoose from "mongoose";

export interface Reservation {
    details: {
      reservedBy: mongoose.Schema.Types.ObjectId;
      reservationDateRange: {
        from: Date;
        to: Date;
      }[];
    };
  }