# Clinician

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.0.

## Application Design

### Over View

The components to be implemented include:

- `home-page`
- `navigator`
- `login`
- `results-viewer`
- `locale-initialiser`
- `participant-initiliser`
- `navigator`

The services within the application will include:

- `something`
- `something-else`

#### Components

**Home Page**:

The `home-page` component will serve as the root for the application. From this component it will provide access to the other components.
Untill a user has been authenticated, the application will only allow interaction with the `login` component.

Within the `home-page` component, the `html` will hold the necessary angular `routing` markup, this should be limited to `<router-outlet></router-outlet>`. The `scss` will be minimal, using predfined global styling. The `TypeScript` element of this component will also be minimal.

**Navigator**

The `navigation` component will provide a series of button elements that allow the user to navigate the application. The navigator will exist along side the routing outlets on the `home-page` component. Eternally present on the navigator will be a `home` button, this will allow the user to return to the login screen of the application. When in a `home` state, the component will display a set of buttons that trigger routing events.

Within the `navigator` component, the `html` will feature a series of `div` elements acting as navigation buttons. Each button will trigger a routing event.

The routing links for each button will be along the lines of:
```
Home: routerLink='/' => <login>
View Results: '/results' => <results-viewer >
Add Locale: '/locale' => <locale-initialiser>
Initialise Test: '/tests' => <participant-initialiser>
```

**Login**
The `login` component will provide the user with a point from which they can authenticate themselves with the server. This component will consist of a form that allows the user to enter an `email` and `password`. These details will then be sent to the server by an additional service. An Authentication token is expected to be recieved



**Results Viewer**


**Locale Initialiser**


**Participant Initialiser**



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
