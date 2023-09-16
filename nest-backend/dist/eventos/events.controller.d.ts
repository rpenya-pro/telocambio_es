import { Event } from './model/events.schema';
import { EventsService } from './events.service';
export declare class EventsController {
    private readonly eventsService;
    constructor(eventsService: EventsService);
    create(event: Event): Promise<Event>;
    getAllEvents(publishedBy?: string, tagsEvent?: string[], page?: number, limit?: number, orderBy?: string): Promise<{
        events: Event[];
        hasMore: boolean;
    }>;
    findOne(id: string): Promise<Event>;
    update(id: string, event: Event): Promise<Event>;
    findBySlug(slugEvent: string): Promise<Event>;
    delete(id: string): Promise<Event>;
}
