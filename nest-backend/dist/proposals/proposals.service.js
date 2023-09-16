"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const proposals_schema_1 = require("./model/proposals.schema");
let ProposalsService = class ProposalsService {
    constructor(proposalModel, configService) {
        this.proposalModel = proposalModel;
        this.configService = configService;
    }
    async create(proposal) {
        try {
            const proposalDate = new Date(proposal.proposalDate);
            proposalDate.setMonth(proposalDate.getMonth() + 1);
            proposal.expireDate = proposalDate;
            const createdProposal = new this.proposalModel(proposal);
            return createdProposal.save();
        }
        catch (error) {
            if (error.name === 'MongoError' && error.code === 11000) {
                throw new common_1.ConflictException('El proposalReference ya existe');
            }
            throw new common_1.BadRequestException('Error creating proposal');
        }
    }
    async findAllByFiltersWithLimit(publishedBy, tagsProposal, page = 1, limit = 10, maxTotalLimit = 1000, orderBy = 'asc') {
        const filterCriteria = {};
        if (publishedBy) {
            filterCriteria.publishedBy = publishedBy;
        }
        if (tagsProposal && tagsProposal.length) {
            filterCriteria.tagsProposal = { $all: tagsProposal };
        }
        const skip = (page - 1) * limit;
        limit = Math.min(limit, maxTotalLimit);
        const proposals = await this.proposalModel
            .find(filterCriteria)
            .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit + 1)
            .exec();
        const hasMore = proposals.length > limit;
        return {
            proposals: proposals.slice(0, limit),
            hasMore: hasMore,
        };
    }
    async findBySlug(slugProposal) {
        try {
            return await this.proposalModel.findOne({ slugProposal });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error finding proposal by slug');
        }
    }
    async findProposalsByUser(userId) {
        try {
            return await this.proposalModel.find({ user: userId });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error finding proposals by user');
        }
    }
    async findOne(id) {
        return this.proposalModel.findById(id);
    }
    async update(id, proposal) {
        return this.proposalModel.findByIdAndUpdate(id, proposal, { new: true });
    }
    async delete(id) {
        return this.proposalModel.findByIdAndRemove(id);
    }
};
exports.ProposalsService = ProposalsService;
exports.ProposalsService = ProposalsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(proposals_schema_1.Proposal.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], ProposalsService);
//# sourceMappingURL=proposals.service.js.map