export class BookingDetails{
    photographerID: number;
    customerID: number;
    startTime: Date;
    endTime: Date;
    eventDetails: string;
    charges:number;
  
    constructor(
      photographerID: number,
      customerID: number,
      startTime: Date,
      endTime: Date,
      eventDetails: string, 
      charges:number
    ) {
      this.photographerID = photographerID;
      this.customerID = customerID;
      this.startTime = startTime;
      this.endTime = endTime;
      this.eventDetails = eventDetails;
      this.charges=charges
    }
}