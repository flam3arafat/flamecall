"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const connect_1 = __importDefault(require("./db/connect"));
require('dotenv').config();
const router = express_1.default.Router();
const auth_1 = __importDefault(require("./routes/auth"));
const contact_1 = __importDefault(require("./routes/contact"));
const app = express_1.default();
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});
app.use('/auth', auth_1.default);
app.use('/crud', contact_1.default);
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});
app.use("/", router);
router.get('/', (req, res) => {
    res.json("PhoneApp server is listening...");
});
const port = process.env.PORT || 3001;
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield connect_1.default(process.env.MONGO_URI);
        //  await connectDB(mongodb://mongodb:27017/docker-db)
        app.listen(port);
        console.log(`Server is listening on ${port}...`);
    }
    catch (error) {
        console.log(error);
    }
});
start();
