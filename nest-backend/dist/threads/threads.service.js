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
exports.ThreadsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const threads_schema_1 = require("./model/threads.schema");
let ThreadsService = class ThreadsService {
    constructor(threadModel, configService) {
        this.threadModel = threadModel;
        this.configService = configService;
    }
    async create(thread) {
        try {
            const createdThread = new this.threadModel(thread);
            return createdThread.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating thread');
        }
    }
    async findAllByFiltersWithLimit(ownerId, threadTemathic, page = 1, limit = 10, maxTotalLimit = 1000, orderBy = 'asc') {
        const filterCriteria = {};
        if (ownerId) {
            filterCriteria.owner = ownerId;
        }
        if (threadTemathic && threadTemathic.length) {
            filterCriteria.threadTemathic = { $in: threadTemathic };
        }
        const skip = (page - 1) * limit;
        limit = Math.min(limit, maxTotalLimit);
        const threads = await this.threadModel
            .find(filterCriteria)
            .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit + 1)
            .exec();
        const hasMore = threads.length > limit;
        return {
            threads: threads.slice(0, limit),
            hasMore: hasMore,
        };
    }
    async findOne(id) {
        const thread = await this.threadModel.findById(id);
        return thread;
    }
    async update(id, thread) {
        return this.threadModel.findByIdAndUpdate(id, thread, { new: true });
    }
    async delete(id) {
        return this.threadModel.findByIdAndRemove(id);
    }
};
exports.ThreadsService = ThreadsService;
exports.ThreadsService = ThreadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(threads_schema_1.Thread.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], ThreadsService);
//# sourceMappingURL=threads.service.js.map