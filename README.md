# cra-template-ts-electron-react-eslint-prettier-airbnb

Thank you for using this template! I hope you find useful all the features included in it.

## What it is?

An All-in-one template to create Electron applications with Create React App. The template includes:
- TypeScript 4.1.2
- React 17 with react-app-rewired and react-app-rewire-aliases to allow path aliases in webpack
- Recoil
- ESLint & Prettier with AirBnB Settings
- Support for SASS/SCSS files
- StyleLint to clean up and format SASS/SCSS stylesheets
- Electron 11 with electron-forge operations to build and develop executable files
- Support for `generate-react-cli` npx executable
- lint-staged with Husky to keep your commit cleans and error-free

# Requirements
- Node.js 12.16.3 or greater
- yarn 6.14.4 or greater
- yarn 1.22.10 or greater

## Installation
Use create-react-app and run the provided template:
```
$ npx create-react-app my_new_app --template cra-template-ts-electron-react-eslint-prettier-airbnb
```
## Developing with Electron
To start developing use `yarn start` so it will execute the compilation of the electron main process and the development server from create-react-app. after the build is complete, electron-forge will load the application on the browser.

Important Note: **The first time you run `yarn start` will take a while since electron-forge needs to initialize all the electron framework in your project.**

After the application starts, you are free to close the electron window and start to develop your application.

## Adding Components
Take advantage of the current `generate-react-cli.json` to generate components on the fly. To generate a new component run in your terminal
```
$ yarn add:component MyNewComponent
```
## Custom Paths
Paths are defined in two places: 
- ./tsconfig.paths.js
- ./config/config-overrides.js

As an example, I have left a custom path called `@` so you can invoke your scripts and stylesheets without going nuts. Example:
```
import MyNewComponent from `@/Components/MyNewComponent`;
```

or in SCSS

```
@import "@/lib/scss/_master";
```

## Did you like this template?
Support my work by donating any value in dogecoin in this url :)

https://dogechain.info/address/DFKcaAVmda9jTL59CBamSHEcYytXhd8Q2G
