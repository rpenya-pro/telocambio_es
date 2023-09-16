import { ConfigService } from '@nestjs/config';
import { Model } from 'mongoose';
import { Proposal, ProposalDocument } from './model/proposals.schema';
export declare class ProposalsService {
    private proposalModel;
    private configService;
    constructor(proposalModel: Model<ProposalDocument>, configService: ConfigService);
    create(proposal: Proposal): Promise<Proposal>;
    findAllByFiltersWithLimit(publishedBy?: string, tagsProposal?: string[], page?: number, limit?: number, maxTotalLimit?: number, orderBy?: string): Promise<{
        proposals: Proposal[];
        hasMore: boolean;
    }>;
    findBySlug(slugProposal: string): Promise<Proposal>;
    findProposalsByUser(userId: string): Promise<Proposal[]>;
    findOne(id: string): Promise<Proposal>;
    update(id: string, proposal: Proposal): Promise<Proposal>;
    delete(id: string): Promise<Proposal>;
}
