import chalk from "chalk";
import path from "path";

function getCallerFile(): string {
    const stack = new Error().stack?.split("\n") || [];
    // stack[0]: Error, [1]: getCallerFile, [2]: logger fn, [3]: actual caller
    const callerLine = stack[3] || stack[2] || "";
    const match = callerLine.match(/\((.*):\d+:\d+\)$/);
    if (!match) return "<unknown>";
    const fullPath = match[1];
    return path.relative(process.cwd(), fullPath);
}

function isServer(): boolean {
    return typeof window === "undefined";
}

function format(level: "log" | "warn" | "error", msg: string, caller: string) {
    const side = isServer() ? "SERVER" : "CLIENT";
    const time = new Date().toISOString();
    let coloredMsg = msg;
    switch (level) {
        case "log":
            coloredMsg = chalk.green(msg);
            break;
        case "warn":
            coloredMsg = chalk.yellow(msg);
            break;
        case "error":
            coloredMsg = chalk.red(msg);
            break;
    }
    return `[${time}] [${side}] [${caller}] ${coloredMsg}`;
}

export const logger = {
    log: (msg: string, ...args: any[]) => {
        const caller = getCallerFile();
        console.log(format("log", msg, caller), ...args);
    },
    warn: (msg: string, ...args: any[]) => {
        const caller = getCallerFile();
        console.warn(format("warn", msg, caller), ...args);
    },
    error: (msg: string, ...args: any[]) => {
        const caller = getCallerFile();
        logger.error(format("error", msg, caller), ...args);
    },
};
