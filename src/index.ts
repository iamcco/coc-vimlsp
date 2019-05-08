import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind,
  workspace,
  services
} from 'coc.nvim';

export async function activate(context: ExtensionContext) {
  const config = workspace.getConfiguration('vimlsp')
  const isEnable = config.get<boolean>('enable', true)
  // extension is disable
  if (!isEnable) {
    return
  }
  // The server is implemented in node
  let serverModule = require.resolve('vim-language-server')

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

  // Options to control the language client
  let clientOptions: LanguageClientOptions = {
    documentSelector: ['vim'],
    initializationOptions: {
      vimruntime,
      runtimepath
    }
  }

  // Create the language client and start the client.
  let client = new LanguageClient(
    'vimlsp',
    'vim language server',
    serverOptions,
    clientOptions
  );

  // Push the disposable to the context's subscriptions so that the
  // client can be deactivated on extension deactivation
  context.subscriptions.push(services.registLanguageClient(client));
}