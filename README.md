# vim language server extension for coc.nvim

## Install

``` vim
:CocInstall coc-vimlsp
```

## Config

``` jsonc
{
    "vimlsp.debug": {
      "type": "boolean",
      "default": false,
      "description": "enable coc-vimlsp service debug"
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
