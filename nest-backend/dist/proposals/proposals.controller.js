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
exports.ProposalsController = void 0;
const common_1 = require("@nestjs/common");
const proposals_schema_1 = require("./model/proposals.schema");
const proposals_service_1 = require("./proposals.service");
const winston_config_1 = require("../winston.config");
let ProposalsController = class ProposalsController {
    constructor(proposalsService) {
        this.proposalsService = proposalsService;
    }
    async create(proposal) {
        try {
            return await this.proposalsService.create(proposal);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(error.message);
            }
            if (error instanceof common_1.ConflictException) {
                throw new common_1.ConflictException(error.message);
            }
            winston_config_1.logger.error(`Failed to create proposal: ${error.message}`);
            throw new Error('Registro duplicado');
        }
    }
    async getAllProposals(publishedBy, tagsProposal, page = 1, limit = 10, orderBy = 'asc') {
        const maxTotalLimit = 1000;
        const result = await this.proposalsService.findAllByFiltersWithLimit(publishedBy, tagsProposal, page, limit, maxTotalLimit, orderBy);
        return {
            proposals: result.proposals,
            hasMore: result.hasMore,
        };
    }
    async findOne(id) {
        return this.proposalsService.findOne(id);
    }
    async update(id, proposal) {
        return this.proposalsService.update(id, proposal);
    }
    async findProposalsByUser(userId) {
        return this.proposalsService.findProposalsByUser(userId);
    }
    async findBySlug(slugProposal) {
        return await this.proposalsService.findBySlug(slugProposal);
    }
    async delete(id) {
        return this.proposalsService.delete(id);
    }
};
exports.ProposalsController = ProposalsController;
__decorate([
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [proposals_schema_1.Proposal]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)('publishedBy')),
    __param(1, (0, common_1.Query)('tagsProposal', new common_1.ParseArrayPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "getAllProposals", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, proposals_schema_1.Proposal]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "update", null);
__decorate([
    (0, common_1.Get)('/proposalbyuser/:userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "findProposalsByUser", null);
__decorate([
    (0, common_1.Get)('slug/:slugProposal'),
    __param(0, (0, common_1.Param)('slugProposal')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "findBySlug", null);
__decorate([
    (0, common_1.Delete)('/delete/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProposalsController.prototype, "delete", null);
exports.ProposalsController = ProposalsController = __decorate([
    (0, common_1.Controller)('proposal'),
    __metadata("design:paramtypes", [proposals_service_1.ProposalsService])
], ProposalsController);
//# sourceMappingURL=proposals.controller.js.map