import * as cp from 'child_process';
import * as vscode from 'vscode';

function registerCommand(context: vscode.ExtensionContext, command: string, callback: (...args: any[]) => any, thisArg?: any): void {
	const disposable = vscode.commands.registerCommand(command, callback, thisArg);
	context.subscriptions.push(disposable);
}

export function activate(context: vscode.ExtensionContext) {
	console.log('extension "tctony" is now active!');

	registerCommand(context, 'tctony.helloWorld', () => {
		vscode.window.showInformationMessage('Hello World from tctony!');
	});

	// clangd启用时，使用clangd的switchheadersource命令
	registerCommand(context, 'tctony.switchHeaderSource', () => { 
		if (vscode.extensions.getExtension('llvm-vs-code-extensions.vscode-clangd')?.isActive) {
			vscode.commands.executeCommand('clangd.switchheadersource');
		} else {
			vscode.commands.executeCommand('C_Cpp.SwitchHeaderSource');
		}
	});

	// 调用xw命令
	registerCommand(context, 'tctony.xw', (args: any[]) => {
		const ret = cp.spawnSync('xw', args ?? []);
		return ret.stdout.toString();
	});
}

export function deactivate() {}
