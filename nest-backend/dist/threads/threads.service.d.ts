import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Thread, ThreadDocument } from './model/threads.schema';
export declare class ThreadsService {
    private threadModel;
    private configService;
    constructor(threadModel: Model<ThreadDocument>, configService: ConfigService);
    create(thread: Thread): Promise<Thread>;
    findAllByFiltersWithLimit(ownerId?: string, threadTemathic?: string[], page?: number, limit?: number, maxTotalLimit?: number, orderBy?: string): Promise<{
        threads: Thread[];
        hasMore: boolean;
    }>;
    findOne(id: string): Promise<Thread>;
    update(id: string, thread: Thread): Promise<Thread>;
    delete(id: string): Promise<Thread>;
}
