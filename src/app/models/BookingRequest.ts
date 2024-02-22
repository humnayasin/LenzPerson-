export class BookingRequest {
    photographerID: number;
    customerID: number;
    startTime: Date;
    endTime: Date;
    eventDetails: string;
  
    constructor(
      photographerID: number,
      customerID: number,
      startTime: Date,
      endTime: Date,
      eventDetails: string
    ) {
      this.photographerID = photographerID;
      this.customerID = customerID;
      this.startTime = startTime;
      this.endTime = endTime;
      this.eventDetails = eventDetails;
    }
  }
    