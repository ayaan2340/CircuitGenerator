"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const testing_route_1 = __importDefault(require("./testing-route"));
const cors_1 = __importDefault(require("cors"));
// Load variables from ../.env (one level above the server folder)
dotenv_1.default.config({ path: path_1.default.resolve(__dirname, "../.env") });
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.use("/api", testing_route_1.default);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
