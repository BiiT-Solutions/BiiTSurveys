import {Injectable} from "@angular/core";
import {Event, EventService as KafkaEventService} from "@biit-solutions/kafka-event-structure"
import {v4 as uuid} from "uuid";

@Injectable({providedIn: 'root'})
export class EventService {
  static readonly REPLY_TO: string = "BiitSurveys";

  constructor(private eventService: KafkaEventService) {
  }

  public sendEvent<T>(payload: T, entityType: string, tag: string, subject: string, customProperties: Map<string, string>, topic: string = undefined): void {
    const sessionId: string = uuid();
    const event: Event<T> = new Event();
    event.subject = subject;
    event.sessionId = sessionId;
    event.payload = payload;
    event.replyTo = EventService.REPLY_TO;
    event.tag = tag;
    if ((payload as any).class) {
      event.entityType = (payload as any).class;
    }
    event.customPropertiesMap = customProperties;
    this.eventService.createEvent(event, topic).subscribe();
  }
}
