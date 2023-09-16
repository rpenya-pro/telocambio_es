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
exports.EventsService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const events_schema_1 = require("./model/events.schema");
let EventsService = class EventsService {
    constructor(eventModel, configService) {
        this.eventModel = eventModel;
        this.configService = configService;
    }
    async create(event) {
        try {
            const createdEvent = new this.eventModel(event);
            return createdEvent.save();
        }
        catch (error) {
            throw new common_1.BadRequestException('Error creating event');
        }
    }
    async findAllByFiltersWithLimit(publishedBy, tagsEvent, page = 1, limit = 10, maxTotalLimit = 1000, orderBy = 'asc') {
        const filterCriteria = {};
        if (publishedBy) {
            filterCriteria.publishedBy = publishedBy;
        }
        if (tagsEvent && tagsEvent.length) {
            filterCriteria.tagsEvent = { $all: tagsEvent };
        }
        const skip = (page - 1) * limit;
        limit = Math.min(limit, maxTotalLimit);
        const events = await this.eventModel
            .find(filterCriteria)
            .sort({ publishDate: orderBy === 'asc' ? 1 : -1 })
            .skip(skip)
            .limit(limit + 1)
            .exec();
        const hasMore = events.length > limit;
        return {
            events: events.slice(0, limit),
            hasMore: hasMore,
        };
    }
    async findBySlug(slugEvent) {
        try {
            return await this.eventModel.findOne({ slugEvent });
        }
        catch (error) {
            throw new common_1.BadRequestException('Error finding event by slug');
        }
    }
    async findOne(id) {
        return this.eventModel.findById(id);
    }
    async update(id, event) {
        return this.eventModel.findByIdAndUpdate(id, event, { new: true });
    }
    async delete(id) {
        return this.eventModel.findByIdAndRemove(id);
    }
};
exports.EventsService = EventsService;
exports.EventsService = EventsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(events_schema_1.Event.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        config_1.ConfigService])
], EventsService);
//# sourceMappingURL=events.service.js.map