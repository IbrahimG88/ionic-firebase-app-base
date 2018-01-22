import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";

@IonicPage({
  // TODO checkout what a segment is
  segment: "event-detail/:eventId" })
@Component({
  selector: "page-event-detail",
  templateUrl: "event-detail.html"
})
export class EventDetailPage {

  public guestName: string = '';
  public currentEvent: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider
  ) {}

  ionViewDidLoad() {
    this.eventProvider .getEventDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
      this.currentEvent = eventSnapshot.val();
      this.currentEvent.id = eventSnapshot.key; });
  }
  addGuest(guestName: string): void {
    this.eventProvider.addGuest(
    guestName, this.currentEvent.id,
      this.currentEvent.price
  ).then(newGuest => { this.guestName = "";
  });
  }

}
