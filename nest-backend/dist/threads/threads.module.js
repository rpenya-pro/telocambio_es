"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadsModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const threads_schema_1 = require("./model/threads.schema");
const threads_controller_1 = require("./threads.controller");
const threads_service_1 = require("./threads.service");
let ThreadsModule = class ThreadsModule {
};
exports.ThreadsModule = ThreadsModule;
exports.ThreadsModule = ThreadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            mongoose_1.MongooseModule.forFeature([{ name: 'Thread', schema: threads_schema_1.ThreadSchema }]),
        ],
        controllers: [threads_controller_1.ThreadsController],
        providers: [threads_service_1.ThreadsService],
    })
], ThreadsModule);
//# sourceMappingURL=threads.module.js.map