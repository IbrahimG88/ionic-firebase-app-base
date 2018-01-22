import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
  public eventList: Array<any>;

  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider
  ) {}

  ionViewDidLoad() {
    this.eventProvider.getEventList().on('value', eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
        return false;
      });
    });
  }

  //event of eventslist in the html provided the eventId value of the event iterator
  goToEventDetail(eventId): void {
    this.navCtrl.push('EventDetailPage', { eventId: eventId });
  }
}
