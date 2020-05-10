# vim language server extension

> [vim-language-server](https://github.com/iamcco/vim-language-server)
> extension for coc.nvim

![image](https://user-images.githubusercontent.com/5492542/57384333-019b9880-71e3-11e9-9ee8-7e731944777b.png)

## Features

- auto completion
- function signature help
- hover document
- go to definition
- go to references
- document highlight
- folding range
- select range
- rename
- snippets
- diagnostic

## Install

``` vim
:CocInstall coc-vimlsp
```

## Config

document highlight:

``` vim
let g:markdown_fenced_languages = [
      \ 'vim',
      \ 'help'
      \]
```

coc-settings.json

- `vimlsp.trace.server`
  > "description": "Trace level of vim language server"
- `vimlsp.debug`: default: false
  > "description": "enable coc-vimlsp service debug"
- `vimlsp.diagnostic.enable`: default: true
  > "description": "enable diagnostic"
- `vimlsp.indexes.runtimepath`: default: true
  > "description": "if index vim's runtimepath files, this will effect the suggest"
- `vimlsp.indexes.count`: default: 3
  > "description": "count of files index at the same time, change to greater will speed up index but will cause high CPU usage for some time"
- `vimlsp.indexes.gap`: default: 100
  > "description": "time gap between parse file, change to smaller will speed up index but will cause high CPU usage for some time"
- `vimlsp.indexes.projectRootPatterns`: default: [".git", "autoload", "plugin"]
  > "description": "Names of files used as the mark of project root."
- `vimlsp.suggest.fromVimruntime`: `default`: true
  > "description": "completeitems from runtimepath's vim files, if this is true that fromVimruntime is true"  > },
- `vimlsp.suggest.fromRuntimepath`: default: false
  > "description": "completeitems from runtimepath's vim files, if this is true that fromVimruntime is true"

**Note**: while `fromRuntimepath` is true, if you have install too many plugins it will slow down the complete

### Buy Me A Coffee ☕️

![btc](https://img.shields.io/keybase/btc/iamcco.svg?style=popout-square)

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
