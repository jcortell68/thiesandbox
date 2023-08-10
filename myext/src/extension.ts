// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "myext" is now active. VS Code version = ' + vscode.version);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('myext.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user

		const panel = vscode.window.createWebviewPanel(
			'myextWebviewPanelType', // Identifies the type of the webview. Used internally
			'My Webview Panel', // Title of the panel displayed to the user
			vscode.ViewColumn.One, // Editor column to show the new webview panel in.
			{} // Webview options. More on these later.
		);

		// Show some initial conent
		panel.webview.html = getWebviewContent("Hi!");

		// Schedule updates to the content every second
		let iteration = 0;
      	const updateWebview = () => {
			const msg = (iteration++ % 2 === 0) ? 'It\'s Friday' : 'Or is it?';
			panel.webview.html = getWebviewContent(msg);
		};
		const interval = setInterval(updateWebview, 1000);

		// Stop updating the  webview content if the panel is closed (by the user)
		panel.onDidDispose(
			() => {
				// When the panel is closed, cancel any future updates to the webview content
				clearInterval(interval);
			},
			null,
			context.subscriptions
		);
	});

	context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}

function getWebviewContent(msg: string) {
	return `
	<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>Some Title</title>
	</head>
	<body>
		<h1>${msg}</h1>
	</body>
	</html>`;
}