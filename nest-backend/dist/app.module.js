"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const user_module_1 = require("./user/user.module");
const mongoose_1 = require("@nestjs/mongoose");
const threads_module_1 = require("./threads/threads.module");
const events_module_1 = require("./eventos/events.module");
const proposals_module_1 = require("./proposals/proposals.module");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const cloudinary_module_1 = require("./cloudinary/cloudinary.module");
const themes_module_1 = require("./themes/themes.module");
const jwt_1 = require("@nestjs/jwt");
const jwt_strategy_1 = require("./jwt-strategy");
const passport_1 = require("@nestjs/passport");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ envFilePath: '.env.production' }),
            passport_1.PassportModule.register({ defaultStrategy: 'jwt' }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', 'public'),
            }),
            user_module_1.UserModule,
            threads_module_1.ThreadsModule,
            themes_module_1.ThemesModule,
            events_module_1.EventsModule,
            proposals_module_1.ProposalsModule,
            jwt_1.JwtModule.registerAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => {
                    console.log('Secret Key:', configService.get('SECRET_KEY'));
                    return {
                        secret: configService.get('SECRET_KEY'),
                        signOptions: { expiresIn: '1h' },
                    };
                },
                inject: [config_1.ConfigService],
            }),
            mongoose_1.MongooseModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: async (configService) => ({
                    uri: configService.get('MONGODB_URI'),
                }),
                inject: [config_1.ConfigService],
            }),
            cloudinary_module_1.CloudinaryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map