import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  workspace,
  services
} from 'coc.nvim';
import {resolve} from 'path';

export async function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration('vimlsp')
  const isEnable = config.get<boolean>('enable', true)
  // extension is disable
  if (!isEnable) {
    return
  }
  // The server is implemented in node
  let serverModule = resolve(context.extensionPath, 'out', 'server')

  // If the extension is launched in debug mode then the debug server options are used
  // Otherwise the run options are used
  let serverOptions: ServerOptions = {
    run : {
      module: serverModule,
      transport: TransportKind.ipc
    },
    debug: {
      module: serverModule,
      transport: TransportKind.ipc
    }
  }

  const isEnableDebug = config.get<boolean>('debug', false)

  // The debug options for the server
  if (isEnableDebug) {
    serverOptions.debug.options = {
      execArgv: [
        "--nolazy",
        "--debug=6009"
      ]
    }
  }

  const { nvim } = workspace

  const vimruntime = await nvim.commandOutput('echo $VIMRUNTIME')
  const runtimepath = await nvim.getOption('runtimepath')
  const iskeyword = await nvim.getOption('iskeyword')
  const isEnableDiagnostic = config.get<boolean>('diagnostic.enable', true)
  const fromVimruntime = config.get<boolean>('suggest.fromVimruntime', true)
  const fromRuntimepath = config.get<boolean>('suggest.fromRuntimepath', false)
  const indexesRuntimepath = config.get<boolean>('indexes.runtimepath', true)
  const indexesCount = config.get<number>('indexes.count', 1)
  const indexesGap = config.get<number>('indexes.gap', 100)
  const projectRootPatterns = config.get<string[]>('indexes.projectRootPatterns', [".git", "autoload", "plugin"])

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    documentSelector: config.get<string[]>('vimlsp.filetypes', ['vim']),
    initializationOptions: {
      isNeovim: workspace.isNvim,
      iskeyword,
      vimruntime,
      runtimepath,
      diagnostic: {
        enable: isEnableDiagnostic
      },
      indexes: {
        runtimepath: indexesRuntimepath,
        count: indexesCount,
        gap: indexesGap,
        projectRootPatterns
      },
      suggest: {
        fromVimruntime,
        fromRuntimepath
      }
    }
  }

  // Create the language client and start the client.
  let client = new LanguageClient(
    'vimlsp',
    'vim language server',
    serverOptions,
    clientOptions
  );

  const changeIskeyword = async () => {
    const doc = await workspace.document
    if (!doc) {
      return
    }
    const buffer = doc.buffer
    const iskeyword = await buffer.getOption('iskeyword')
    client.sendNotification('$/change/iskeyword', iskeyword)
  }

  client.onReady().then(() => {
    setTimeout(changeIskeyword, 100);
  })

  context.subscriptions.push(
    workspace.registerAutocmd({
      event: "BufEnter",
      pattern: '*.vim',
      callback: changeIskeyword
    })
  )

  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  context.subscriptions.push(services.registLanguageClient(client));
}
