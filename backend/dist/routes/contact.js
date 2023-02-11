"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const check_1 = require("express-validator/check");
const contactController = __importStar(require("../controllers/contact"));
const is_auth_1 = __importDefault(require("../middleware/is-auth"));
const router = express_1.default.Router();
// GET /contact/contacts
router.get('/contacts/:userId', is_auth_1.default, contactController.getContacts);
// POST /contact/post
router.post('/contact', is_auth_1.default, [
    check_1.body('first_name')
        .trim(),
    check_1.body('last_name')
        .trim(),
    check_1.body('gender')
        .trim(),
    check_1.body('phone')
        .trim()
], contactController.createContact);
router.get('/contact/:contactId', is_auth_1.default, contactController.getContact);
router.put('/contact/:contactId', is_auth_1.default, [
    check_1.body('first_name')
        .trim(),
    check_1.body('last_name')
        .trim(),
    check_1.body('gender')
        .trim(),
    check_1.body('phone')
        .trim()
], contactController.updateContact);
router.delete('/contact/:contactId', is_auth_1.default, contactController.deleteContact);
exports.default = router;
