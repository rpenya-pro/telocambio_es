import { Thread } from './model/threads.schema';
import { ThreadsService } from './threads.service';
export declare class ThreadsController {
    private readonly threadsService;
    constructor(threadsService: ThreadsService);
    create(thread: Thread): Promise<Thread>;
    getAllThreads(owner?: string, threadTemathic?: string[], page?: number, limit?: number, orderBy?: string): Promise<{
        threads: Thread[];
        hasMore: boolean;
    }>;
    findOne(id: string): Promise<Thread>;
    update(id: string, thread: Thread): Promise<Thread>;
    delete(id: string): Promise<Thread>;
}
