"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const compression = require("compression");
const helmet_1 = require("helmet");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.enableCors({
        origin: 'http://www.rafapenya.com',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
        credentials: true,
    });
    app.use((req, res, next) => {
        if (req.method === common_1.RequestMethod.OPTIONS) {
            res.status(200).send();
            return;
        }
        next();
    });
    app.use(compression());
    app.use((0, helmet_1.default)());
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map