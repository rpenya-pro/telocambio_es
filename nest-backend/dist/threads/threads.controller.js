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
exports.ThreadsController = void 0;
const common_1 = require("@nestjs/common");
const threads_schema_1 = require("./model/threads.schema");
const threads_service_1 = require("./threads.service");
let ThreadsController = class ThreadsController {
    constructor(threadsService) {
        this.threadsService = threadsService;
    }
    async create(thread) {
        try {
            return this.threadsService.create(thread);
        }
        catch (error) {
            if (error instanceof common_1.BadRequestException) {
                throw new common_1.BadRequestException(error.message);
            }
            throw new Error('Internal server error');
        }
    }
    async getAllThreads(owner, threadTemathic, page = 1, limit = 10, orderBy = 'asc') {
        const maxTotalLimit = 1000;
        const result = await this.threadsService.findAllByFiltersWithLimit(owner, threadTemathic, page, limit, maxTotalLimit, orderBy);
        return {
            threads: result.threads,
            hasMore: result.hasMore,
        };
    }
    async findOne(id) {
        return this.threadsService.findOne(id);
    }
    async update(id, thread) {
        return this.threadsService.update(id, thread);
    }
    async delete(id) {
        return this.threadsService.delete(id);
    }
};
exports.ThreadsController = ThreadsController;
__decorate([
    (0, common_1.Post)('new'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [threads_schema_1.Thread]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('all'),
    __param(0, (0, common_1.Query)('owner')),
    __param(1, (0, common_1.Query)('threadTemathic', new common_1.ParseArrayPipe({ optional: true }))),
    __param(2, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(3, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(4, (0, common_1.Query)('orderBy')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array, Number, Number, String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "getAllThreads", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, threads_schema_1.Thread]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadsController.prototype, "delete", null);
exports.ThreadsController = ThreadsController = __decorate([
    (0, common_1.Controller)('thread'),
    __metadata("design:paramtypes", [threads_service_1.ThreadsService])
], ThreadsController);
//# sourceMappingURL=threads.controller.js.map