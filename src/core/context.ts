import { UserOptions, ResolvedOptions, ResolvedSource } from "../types";
import { resolveSources, resolveOptions, getSourceOutput } from "./utils";
import * as compressing from "compressing";
import path, { resolve } from "path";
import fs from "fs/promises";
import { Log } from "./log";
import { hooks } from "./hooks";

export class Context {
    options: ResolvedOptions;
    sources: ResolvedSource[];
    isCompressed = false
    constructor(options?: UserOptions) {
        this.options = resolveOptions(options)
        this.sources = resolveSources(this.options)
        hooks.addHooks(this.options.hooks)
    }

    async compress(source: ResolvedSource) {
        hooks.callHook('compress:prepare', this, source)
        const compressAdapter = compressing[source.adapter];
        const resolvedInput = resolve(process.cwd(), source.source);
        const sourceOutput = getSourceOutput(source);
        const resolvedOutput = path.join(
            resolve(process.cwd(), source.outDir),
            sourceOutput
        );
        try {
            await compressAdapter.compressDir(resolvedInput, resolvedOutput, source.compressingOptions);
            hooks.callHook('compress:after', this, { ...source, resolvedInput, resolvedOutput })
            const stat = await fs.stat(resolvedOutput);
            Log.success(`${sourceOutput}\t${stat.size} bytes`);
        } catch (error) {
            Log.error(`skip ${sourceOutput}: ${error}`)
            Log.error('This is an error caused by compressing, please check if the source parameter is legal.')
            console.error(error)
        }
    }

    async compressAll() {
        Log.log("start compressing");
        await Promise.all(this.sources.map(s => this.compress(s)))
        Log.success("compressed success");
    }

    async compressAllOnce() {
        if (this.isCompressed) return
        this.isCompressed = true
        await this.compressAll()
    }
}