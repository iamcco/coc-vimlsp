"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLinePattern = /[^:]+:\s*(.+?):\s*line\s*([0-9]+)\s*col\s*([0-9]+)/;
exports.commentPattern = /^[ \t]*("|')/;
exports.keywordPattern = /[\w#&$<>.:]/;
exports.builtinFunctionPattern = /^((<SID>|\b(v|g|b|s|l|a):)?[\w#&]+)[ \t]*\([^)]*\)/;
exports.wordPrePattern = /^.*?(((<SID>|\b(v|g|b|s|l|a):)?[\w#&$.]+)|(<SID>|<SID|<SI|<S|<|\b(v|g|b|s|l|a):))$/;
exports.wordNextPattern = /^((SID>|ID>|D>|>|<SID>|\b(v|g|b|s|l|a):)?[\w#&$.]+|(:[\w#&$.]+)).*?(\r\n|\r|\n)?$/;
exports.colorschemePattern = /\bcolorscheme[ \t]+\w*$/;
exports.mapCommandPattern = /^([ \t]*(\[ \t]*)?)\w*map[ \t]+/;
exports.highlightLinkPattern = /^[ \t]*(hi|highlight)[ \t]+link([ \t]+[^ \t]+)*[ \t]*$/;
exports.highlightPattern = /^[ \t]*(hi|highlight)([ \t]+[^ \t]+)*[ \t]*$/;
exports.highlightValuePattern = /^[ \t]*(hi|highlight)([ \t]+[^ \t]+)*[ \t]+([^ \t=]+)=[^ \t=]*$/;
exports.autocmdPattern = /^[ \t]*(au|autocmd)!?[ \t]+([^ \t,]+,)*[^ \t,]*$/;
exports.builtinVariablePattern = [
    /\bv:\w*$/
];
exports.optionPattern = [
    /(^|[ \t]+)&\w*$/,
    /(^|[ \t]+)set(l|local|g|global)?[ \t]+\w+$/
];
exports.notFunctionPattern = [
    /^[ \t]*\\$/,
    /^[ \t]*\w+$/,
    /^[ \t]*"/,
    /(let|set|colorscheme)[ \t][^ \t]*$/,
    /[^([,\\ \t\w#]\w*$/,
    /^[ \t]*(hi|highlight)([ \t]+link)?([ \t]+[^ \t]+)*[ \t]*$/,
    exports.autocmdPattern
];
exports.commandPattern = [
    /(^|[ \t]):\w+$/,
    /^[ \t]*\w+$/,
    /:?silent!?[ \t]\w+/
];
exports.featurePattern = [
    /\bhas\([ \t]*["']\w*/
];
exports.expandPattern = [
    /\bexpand\(['"]<\w*$/,
    /\bexpand\([ \t]*['"]\w*$/
];
exports.notIdentifierPattern = [
    exports.commentPattern,
    /("|'):\w*$/,
    /^[ \t]*\\$/,
    /^[ \t]*call[ \t]+[^ \t()]*$/,
    /('|"|#|&|\$|<)\w*$/
];
//# sourceMappingURL=patterns.js.map