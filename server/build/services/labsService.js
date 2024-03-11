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
var __asyncValues = (this && this.__asyncValues) || function (o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.labService = void 0;
const crypto_1 = require("crypto");
const PrismaInstance_1 = require("../interface/PrismaInstance");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const stream_1 = require("stream");
const util_1 = __importDefault(require("util"));
const pump = util_1.default.promisify(stream_1.pipeline);
exports.labService = {
    reportExam: (examId, data) => __awaiter(void 0, void 0, void 0, function* () {
        yield PrismaInstance_1.prisma.reportForExams.create({
            data: { textReport: data, examsForPet: { connect: { id: parseInt(examId) } } },
        });
    }),
    saveExamPdfs: (data) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, e_1, _b, _c;
        const filePath = path_1.default.join(__dirname, '..', './pdfs_images');
        try {
            const files = data;
            let paths = [];
            try {
                for (var _d = true, files_1 = __asyncValues(files), files_1_1; files_1_1 = yield files_1.next(), _a = files_1_1.done, !_a;) {
                    _c = files_1_1.value;
                    _d = false;
                    try {
                        const parts = _c;
                        let id = (0, crypto_1.randomUUID)();
                        let extension = path_1.default.extname(parts.filename);
                        yield pump(parts.file, fs_1.default.createWriteStream(`${filePath}/${id}${extension}`));
                        paths.push(`${id}${extension}`);
                    }
                    finally {
                        _d = true;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (!_d && !_a && (_b = files_1.return)) yield _b.call(files_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            if (paths.length < 0)
                return;
            return paths;
        }
        catch (error) {
            console.log(error);
        }
    }),
    returnExamFile: (fileId) => __awaiter(void 0, void 0, void 0, function* () {
        const filePath = path_1.default.join(__dirname, '..', 'pdfs_images', `${fileId}`);
        if (!fs_1.default.existsSync(filePath)) {
            return;
        }
        const stream = fs_1.default.readFileSync(filePath);
        return stream;
    })
};
