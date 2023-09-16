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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProposalSchema = exports.Proposal = void 0;
const mongoose_1 = require("@nestjs/mongoose");
let Proposal = class Proposal {
};
exports.Proposal = Proposal;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Proposal.prototype, "owner", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Proposal.prototype, "articleInterested", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Proposal.prototype, "myOfferArticle", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Proposal.prototype, "user", void 0);
__decorate([
    (0, mongoose_1.Prop)({ default: Date.now }),
    __metadata("design:type", Date)
], Proposal.prototype, "proposalDate", void 0);
__decorate([
    (0, mongoose_1.Prop)(),
    __metadata("design:type", Date)
], Proposal.prototype, "expireDate", void 0);
__decorate([
    (0, mongoose_1.Prop)({ unique: true }),
    __metadata("design:type", String)
], Proposal.prototype, "proposalReference", void 0);
exports.Proposal = Proposal = __decorate([
    (0, mongoose_1.Schema)()
], Proposal);
exports.ProposalSchema = mongoose_1.SchemaFactory.createForClass(Proposal);
//# sourceMappingURL=proposals.schema.js.map