"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const errorHandler_1 = __importDefault(require("./middleware/errorHandler"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
require("express-async-errors");
const index_1 = __importDefault(require("./routes/index"));
const logger_1 = __importDefault(require("./lib/logger"));
const nodemailer_1 = __importDefault(require("nodemailer"));
nodemailer_1.default.createTestAccount((err, account) => {
    console.log(account);
});
const app = (0, express_1.default)();
app.use((0, morgan_1.default)("combined"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)(process.env.JWT_SECRET));
app.use(express_1.default.json());
// Import routes
// Use routes
app.use(index_1.default);
app.use(errorHandler_1.default);
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    logger_1.default.info(`server running on port ${PORT}`);
});
