import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Event, EventDocument } from './model/events.schema';
export declare class EventsService {
    private eventModel;
    private configService;
    constructor(eventModel: Model<EventDocument>, configService: ConfigService);
    create(event: Event): Promise<Event>;
    findAllByFiltersWithLimit(publishedBy?: string, tagsEvent?: string[], page?: number, limit?: number, maxTotalLimit?: number, orderBy?: string): Promise<{
        events: Event[];
        hasMore: boolean;
    }>;
    findBySlug(slugEvent: string): Promise<Event>;
    findOne(id: string): Promise<Event>;
    update(id: string, event: Event): Promise<Event>;
    delete(id: string): Promise<Event>;
}
