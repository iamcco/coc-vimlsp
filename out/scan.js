"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var os_1 = tslib_1.__importDefault(require("os"));
var rxjs_1 = require("rxjs");
var fast_glob_1 = tslib_1.__importDefault(require("fast-glob"));
var path_1 = require("path");
var operators_1 = require("rxjs/operators");
var vscode_uri_1 = tslib_1.__importDefault(require("vscode-uri"));
var fs_1 = require("fs");
var util_1 = require("./util");
var constant_1 = require("./constant");
var indexes = {};
var indexesFiles = {};
var queue = [];
var source$;
var gap = 100;
var count = 3;
function initSource() {
    if (source$) {
        return;
    }
    source$ = new rxjs_1.Subject();
    source$.pipe(operators_1.concatMap(function (uri) {
        return rxjs_1.from(util_1.findWorkDirectory(vscode_uri_1.default.parse(uri).fsPath, constant_1.workDirPatterns)).pipe(operators_1.filter(function (workDir) { return workDir && workDir !== os_1.default.homedir(); }), operators_1.map(function (workDir) { return ({
            uri: uri,
            workDir: workDir
        }); }));
    }), operators_1.filter(function (_a) {
        var workDir = _a.workDir;
        if (!indexes[workDir]) {
            indexes[workDir] = true;
            return true;
        }
        return false;
    }), operators_1.concatMap(function (_a) {
        var workDir = _a.workDir;
        var indexPath = path_1.join(workDir, '**/*.vim');
        return rxjs_1.from(fast_glob_1.default([indexPath, '!**/node_modules/**'])).pipe(operators_1.catchError(function (error) {
            process.send({
                log: [
                    "Index Workspace Error: " + indexPath,
                    "Error => " + (error.stack || error.message || error)
                ].join('\n')
            });
            return rxjs_1.of(undefined);
        }), operators_1.filter(function (list) { return list && list.length > 0; }), operators_1.concatMap(function (list) {
            return rxjs_1.of.apply(void 0, list.sort(function (a, b) { return a.length - b.length; })).pipe(operators_1.filter(function (fpath) {
                if (!indexesFiles[fpath]) {
                    indexesFiles[fpath] = true;
                    return true;
                }
                return false;
            }), operators_1.mergeMap(function (fpath) {
                return rxjs_1.timer(gap).pipe(operators_1.concatMap(function () {
                    var content = fs_1.readFileSync(fpath).toString();
                    return rxjs_1.from(util_1.handleParse(content)).pipe(operators_1.filter(function (res) { return res[0] !== null; }), operators_1.map(function (res) { return ({
                        node: res[0],
                        uri: vscode_uri_1.default.file(fpath).toString()
                    }); }), operators_1.catchError(function (error) {
                        process.send({
                            log: fpath + ":\n" + (error.stack || error.message || error)
                        });
                        return rxjs_1.of(undefined);
                    }));
                }));
            }, count));
        }));
    }), operators_1.filter(function (res) { return !!res; })).subscribe(function (res) {
        process.send({
            data: res
        });
    }, function (error) {
        process.send({
            log: error.stack || error.message || error
        });
    });
    if (queue.length) {
        queue.forEach(function (uri) {
            source$.next(uri);
        });
        queue = [];
    }
}
process.on('message', function (mess) {
    var uri = mess.uri, config = mess.config;
    if (uri) {
        if (source$) {
            source$.next(uri);
        }
        else {
            queue.push(uri);
        }
    }
    if (config) {
        if (config.gap !== undefined) {
            gap = config.gap;
        }
        if (config.count !== undefined) {
            count = config.count;
        }
        initSource();
    }
});
//# sourceMappingURL=scan.js.map