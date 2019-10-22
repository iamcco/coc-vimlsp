"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var path_1 = tslib_1.__importDefault(require("path"));
var findup_1 = tslib_1.__importDefault(require("findup"));
var child_process_1 = require("child_process");
var patterns_1 = require("./patterns");
var vscode_languageserver_1 = require("vscode-languageserver");
var vimparser_1 = require("./lib/vimparser");
function isSomeMatchPattern(patterns, line) {
    return patterns.some(function (p) { return p.test(line); });
}
exports.isSomeMatchPattern = isSomeMatchPattern;
function executeFile(input, command, args, option) {
    return new Promise(function (resolve, reject) {
        var stdout = '';
        var stderr = '';
        var error;
        var isPassAsText = false;
        args = (args || []).map(function (arg) {
            if (/%text/.test(arg)) {
                isPassAsText = true;
                return arg.replace(/%text/g, input.toString());
            }
            return arg;
        });
        var cp = child_process_1.spawn(command, args, option);
        cp.stdout.on('data', function (data) {
            stdout += data;
        });
        cp.stderr.on('data', function (data) {
            stderr += data;
        });
        cp.on('error', function (err) {
            error = err;
            reject(error);
        });
        cp.on('close', function (code) {
            if (!error) {
                resolve({ code: code, stdout: stdout, stderr: stderr });
            }
        });
        // error will occur when cp get error
        if (!isPassAsText) {
            input.pipe(cp.stdin).on('error', function () { });
        }
    });
}
exports.executeFile = executeFile;
// cover cb type async function to promise
function pcb(cb) {
    return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return new Promise(function (resolve) {
            cb.apply(void 0, args.concat([function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    resolve(args);
                }]));
        });
    };
}
exports.pcb = pcb;
// find work dirname by root patterns
function findWorkDirectory(filePath, rootPatterns) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var dirname, patterns, _i, patterns_2, pattern, _a, err, dir;
        return tslib_1.__generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    dirname = path_1.default.dirname(filePath);
                    patterns = [].concat(rootPatterns);
                    _i = 0, patterns_2 = patterns;
                    _b.label = 1;
                case 1:
                    if (!(_i < patterns_2.length)) return [3 /*break*/, 4];
                    pattern = patterns_2[_i];
                    return [4 /*yield*/, pcb(findup_1.default)(dirname, pattern)];
                case 2:
                    _a = _b.sent(), err = _a[0], dir = _a[1];
                    if (!err && dir && dir !== '/') {
                        return [2 /*return*/, dir];
                    }
                    _b.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, dirname];
            }
        });
    });
}
exports.findWorkDirectory = findWorkDirectory;
function markupSnippets(snippets) {
    return [
        '``` vim',
        snippets.replace(/\$\{[0-9]+(:([^}]+))?\}/g, '$2'),
        '```'
    ].join('\n');
}
exports.markupSnippets = markupSnippets;
function getWordFromPosition(doc, position) {
    if (!doc) {
        return;
    }
    var character = doc.getText(vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(position.line, position.character), vscode_languageserver_1.Position.create(position.line, position.character + 1)));
    // not keyword position
    if (!character || !patterns_1.keywordPattern.test(character)) {
        return;
    }
    var currentLine = doc.getText(vscode_languageserver_1.Range.create(vscode_languageserver_1.Position.create(position.line, 0), vscode_languageserver_1.Position.create(position.line + 1, 0)));
    // comment line
    if (patterns_1.commentPattern.test(currentLine)) {
        return;
    }
    var preSegment = currentLine.slice(0, position.character);
    var nextSegment = currentLine.slice(position.character);
    var wordLeft = preSegment.match(patterns_1.wordPrePattern);
    var wordRight = nextSegment.match(patterns_1.wordNextPattern);
    var word = "" + (wordLeft && wordLeft[1] || '') + (wordRight && wordRight[1] || '');
    return {
        word: word,
        wordLeft: wordLeft && wordLeft[1] ? preSegment.replace(new RegExp(wordLeft[1] + "$"), word) : "" + preSegment + word,
        wordRight: wordRight && wordRight[1] ? nextSegment.replace(new RegExp("^" + wordRight[1]), word) : "" + word + nextSegment,
        left: wordLeft && wordLeft[1] || '',
        right: wordRight && wordRight[1] || ''
    };
}
exports.getWordFromPosition = getWordFromPosition;
// parse vim buffer
function handleParse(textDoc) {
    return tslib_1.__awaiter(this, void 0, void 0, function () {
        var text, tokens, node;
        return tslib_1.__generator(this, function (_a) {
            text = textDoc instanceof Object ? textDoc.getText() : textDoc;
            tokens = new vimparser_1.StringReader(text);
            try {
                node = new vimparser_1.VimLParser(true).parse(tokens);
                return [2 /*return*/, [node, '']];
            }
            catch (error) {
                return [2 /*return*/, [null, error]];
            }
            return [2 /*return*/];
        });
    });
}
exports.handleParse = handleParse;
// remove snippets of completionItem
function removeSnippets(completionItems) {
    if (completionItems === void 0) { completionItems = []; }
    return completionItems.map(function (item) {
        if (item.insertTextFormat === vscode_languageserver_1.InsertTextFormat.Snippet) {
            return tslib_1.__assign({}, item, { insertText: item.label, insertTextFormat: vscode_languageserver_1.InsertTextFormat.PlainText });
        }
        return item;
    });
}
exports.removeSnippets = removeSnippets;
//# sourceMappingURL=util.js.map