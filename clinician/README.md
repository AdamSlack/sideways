# Clinician

This is the clinician Application. It's an Angular 4/5 project initialised using the Angular Command Line Interface known as Angular/Cli.

This application requires NodeJS. Versions of NodeJS below 8.x might not behave as expected.

With version 8.x and above, the node package manager npm is installed alongside nodejs. This package manager is required to install angular.cli.

to install from ubuntu:
```
curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
sudo apt-get install -y nodejs
```

additionally:
```
sudo apt-get install -y build-essential
```

For windows, please see: [Node.js](https://nodejs.org/en/download/)

Once installed you need to use npm from a command line of your choice.

To install angular cli as a global node.js package use:
```
ng -g --save @angular/cli
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
