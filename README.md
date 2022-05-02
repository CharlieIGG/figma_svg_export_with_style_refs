# Figma SVG Export with Style References

⚠️⚠️⚠️ **Warning: this plugin is experimental, as well as a WORK-IN-PROGRESS**. Don't waste your time or risk your work by using this plugin... unless you know what you're doing.

- [Figma SVG Export with Style References](#figma-svg-export-with-style-references)
  - [Overview](#overview)
  - [Usage](#usage)
    - [Adding the plugin to Figma](#adding-the-plugin-to-figma)
    - [Using the plugin](#using-the-plugin)
  - [General Instructions for Figma Plugin Development](#general-instructions-for-figma-plugin-development)

## Overview
Figma is great, and SVG exports work like a charm, but what if you want to export SVG representations of your designs that still hold a reference to the Style variables you've defined, such as colors?

As of May 2022, no plugins are found that allow you to somehow keep the reference to variable names, which is necessary if you want to be able to edit the styles of the SVGs on-the-fly outside of Figma (e.g. if you have a website builder and want Users to see how their style selections change the UI).

This plugin is an attempt to fill in this gap from Figma.

## Usage

### Adding the plugin to Figma
Currently, in order to use this plugin, you will need to use it in "development mode". For this you need to:

  1. Clone this repo wherever it makes sense on your machine: 
  ```shell
  git clone git@github.com:CharlieIGG/figma_svg_export_with_style_refs.git
  ```
  2. Go to `Figma > Plugins > Development > "Import plugin from manifest..."``
  3. Select the `manifest.json` file inside of this project on your machine

### Using the plugin
As of today, the plugin will only emit the resulting SVG into Figma's console stream... be sure to have your console open (hit `cmd + p` in Figma and search for "console" to find the `open console` command).

Simply go to `Figma > Plugins > Development > Selection to SVG with Referred Styles`... observe and copy the output SVG from the console.

**NOTE:** This plugin will currently export the whole page. Selection export coming soon...

## General Instructions for Figma Plugin Development
Below are the steps to get your plugin running. You can also find instructions at:

  https://www.figma.com/plugin-docs/setup/

This plugin template uses Typescript and NPM, two standard tools in creating JavaScript applications.

First, download Node.js which comes with NPM. This will allow you to install TypeScript and other
libraries. You can find the download link here:

  https://nodejs.org/en/download/

Next, install TypeScript using the command:

  npm install -g typescript

Finally, in the directory of your plugin, get the latest type definitions for the plugin API by running:

  npm install --save-dev @figma/plugin-typings

If you are familiar with JavaScript, TypeScript will look very familiar. In fact, valid JavaScript code
is already valid Typescript code.

TypeScript adds type annotations to variables. This allows code editors such as Visual Studio Code
to provide information about the Figma API while you are writing code, as well as help catch bugs
you previously didn't notice.

For more information, visit https://www.typescriptlang.org/

Using TypeScript requires a compiler to convert TypeScript (code.ts) into JavaScript (code.js)
for the browser to run.

We recommend writing TypeScript code using Visual Studio code:

1. Download Visual Studio Code if you haven't already: https://code.visualstudio.com/.
2. Open this directory in Visual Studio Code.
3. Compile TypeScript to JavaScript: Run the "Terminal > Run Build Task..." menu item,
    then select "tsc: watch - tsconfig.json". You will have to do this again every time
    you reopen Visual Studio Code.

That's it! Visual Studio Code will regenerate the JavaScript file every time you save.
