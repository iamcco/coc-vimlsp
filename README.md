# vim language server extension

> [vim-language-server](https://github.com/iamcco/vim-language-server)
> extension for coc.nvim

[![Npm](https://img.shields.io/github/package-json/v/iamcco/coc-vimlsp)](https://www.npmjs.com/package/coc-vimlsp)
![download](https://img.shields.io/npm/dm/coc-vimlsp)

![image](https://user-images.githubusercontent.com/5492542/57384333-019b9880-71e3-11e9-9ee8-7e731944777b.png)

## Features

- auto completion
- function signature help
- hover document
- go to definition
- go to references
- document symbols
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

## Usage

**Auto complete and function signature help**:

![autocomplete](https://user-images.githubusercontent.com/5492542/81493984-909c2e80-92d7-11ea-9638-d7be3e18e1d1.gif)

**Hover document**:

![hover](https://user-images.githubusercontent.com/5492542/81494066-5aab7a00-92d8-11ea-9ccd-31bd6440e622.gif)

**Go to definition and references**:

![goto](https://user-images.githubusercontent.com/5492542/81494125-c261c500-92d8-11ea-83c0-fecba34ea55e.gif)

**Document symbols**:

![symbols](https://user-images.githubusercontent.com/5492542/81494183-5cc20880-92d9-11ea-9495-a7691420df39.gif)

**Document highlight**:

![highlight](https://user-images.githubusercontent.com/5492542/81494214-b1fe1a00-92d9-11ea-9cc1-0420cddc5cbc.gif)

**Folding range and selection range**:

![fold](https://user-images.githubusercontent.com/5492542/81494276-3bade780-92da-11ea-8c93-bc3d2127a19d.gif)

**Rename**:

![rename](https://user-images.githubusercontent.com/5492542/81494329-aa8b4080-92da-11ea-8a5d-ace5385445e9.gif)

**Snippets and diagnostic**:

![dia](https://user-images.githubusercontent.com/5492542/81494408-503eaf80-92db-11ea-96ac-641d46027623.gif)

### Buy Me A Coffee ☕️

![btc](https://img.shields.io/keybase/btc/iamcco.svg?style=popout-square)

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
