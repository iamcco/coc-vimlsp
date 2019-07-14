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

``` jsonc
{
    "vimlsp.debug": {
      "type": "boolean",
      "default": false,
      "description": "enable coc-vimlsp service debug"
    },
    "vimlsp.diagnostic.enable": {
      "type": "boolean",
      "default": true,
      "description": "enable diagnostic"
    },
    "vimlsp.trace.server": {
      "type": "string",
      "default": "off",
      "enum": [
        "off",
        "messages",
        "verbose"
      ],
      "description": "Trace level of vim language server"
    }
}
```

### Buy Me A Coffee ☕️

![btc](https://img.shields.io/keybase/btc/iamcco.svg?style=popout-square)

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
