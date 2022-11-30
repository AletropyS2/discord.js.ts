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
const discord_js_1 = require("discord.js");
const FileIO_1 = __importDefault(require("./FileIO"));
class TSClient extends discord_js_1.Client {
    constructor(options) {
        super(options);
        this.Commands = new discord_js_1.Collection();
        this.CommandsArray = [];
    }
    Initialize(token, paths) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.login(token ? token : process.env.DISCORD_TOKEN);
            if (paths) {
                if (paths.commandsPath)
                    yield this.LoadCommands(paths.commandsPath);
                if (paths.eventsPath)
                    yield this.LoadEvents(paths.eventsPath);
            }
            yield this.LoadEvents("./src/DiscordTS/Events"); // Load Default Events
        });
    }
    LoadCommands(commandsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!commandsPath)
                return;
            const files = yield FileIO_1.default.GetAllFiles(commandsPath);
            for (const file of files) {
                const command = require(file).default;
                this.Commands.set(command.data.name, command);
                this.CommandsArray.push(command.data);
            }
        });
    }
    LoadEvents(eventsPath) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!eventsPath)
                return;
            const files = yield FileIO_1.default.GetAllFiles(eventsPath);
            for (const file of files) {
                const event = require(file).default;
                if (event.once) {
                    this.once(event.name, (...args) => event.run(this, ...args));
                }
                else {
                    this.on(event.name, (...args) => event.run(this, ...args));
                }
            }
        });
    }
}
exports.default = TSClient;
