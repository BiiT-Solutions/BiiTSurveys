import {Injectable} from "@angular/core";
import {Event, EventService as KafkaEventService} from "kafka-event-structure-lib";
import {v4 as uuid} from "uuid";

@Injectable({providedIn: 'root'})
export class EventService {

  constructor(private eventService: KafkaEventService) { }
  public sendEvent<T>(payload: T, entityType: string, subject: string, customProperties: Map<string, string>, topic: string = undefined): void {
    const sessionId: string = uuid();
    const event: Event<T> = new Event();
    event.subject = subject;
    event.sessionId = sessionId;
    event.payload = payload;
    event.customPropertiesMap = customProperties;
    this.eventService.createEvent(event, topic).subscribe();
  }
}
