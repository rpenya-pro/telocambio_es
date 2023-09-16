import { Proposal } from './model/proposals.schema';
import { ProposalsService } from './proposals.service';
export declare class ProposalsController {
    private readonly proposalsService;
    constructor(proposalsService: ProposalsService);
    create(proposal: Proposal): Promise<Proposal>;
    getAllProposals(publishedBy?: string, tagsProposal?: string[], page?: number, limit?: number, orderBy?: string): Promise<{
        proposals: Proposal[];
        hasMore: boolean;
    }>;
    findOne(id: string): Promise<Proposal>;
    update(id: string, proposal: Proposal): Promise<Proposal>;
    findProposalsByUser(userId: string): Promise<Proposal[]>;
    findBySlug(slugProposal: string): Promise<Proposal>;
    delete(id: string): Promise<Proposal>;
}
