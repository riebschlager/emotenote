# DI Electron Boilerplate

A set of reasonable defaults for new Dimensional Innovations kiosk projects.

## Folder Structure

`app/assets/css` - Compiled CSS files

`app/assets/fonts` - Fonts used by the application

`app/assets/images` - Images used by the application

`app/assets/js` - Scripts used by the application

`app/assets/scss` - SCSS files

`app/assets/scss/includes` - Partial SCSS files included by `main.scss`

`app/assets/videos` - Videos used by the application

`app/assets/views` - Angular views and partials used by the application

`scripts` - Windows batch files to be used once the application is deployed

`config` - Application configuration files.

## Dependencies

NPM is used to manage both front-end and development dependencies. Bower is no longer used to manage front-end libraries. When adding a new package to a project, be sure to use the `--save` flag when installing so that the dependency will be persisted to `package.json`.

## Using NPM Libraries

Libraries should be included directly in `index.html`. Script concatenation is no longer part of the workflow. Any script that is needed by your project should be included in the `<head>` of `index.html`. By default, Angular is already installed.

### Example:

```html
<head>
    <script src="../node_modules/jquery/dist/jquery.js"></script>
    <script src="../node_modules/angular/angular.js"></script>
    <script src="../node_modules/underscore/underscore.js"></script>
</head>
```

## Custom Scripts

Scripts are no longer being concatenated by Gulp. All scripts should reside in `app/assets/js/` and be included before the closing `</body>` tag.

### Example:

```html
<body>
    <!-- Page content -->
    <script src="./app/assets/js/main.js"></script>
    <script src="./app/assets/js/controllers.js"></script>
    <script src="./app/assets/js/directives.js"></script>
</body>
```

## Styles - CSS and SCSS

All SCSS files are now in `app/assets/scss` and will be compiled to `app/assets/css/main.css`.

## Workflow

To begin a new project using this template, [download this repo as a ZIP file.](https://gitlab.com/dimensional-innovations/di-kiosk/repository/archive.zip?ref=master) And then create a new project in Gitlab and follow the instructions to add that new repo as the remote origin for your new project.

Run `npm install` in the root of your project to install any needed dependencies. During normal development, run `gulp` from the root of your project to compile and watch styles and scripts.

## Configuration

At a minimum, `config/default.json` should contain the following properties.

```json
{
    "debug": false,
    "debugPort": 30080,
    "appWidth": 1920,
    "appHeight": 1080
}
```
For local testing, create `config/local.json` and override the default settings. For example, set `debug` to `true`.

## Deployment

Both Git and Node must be installed on the production machine. After cloning the project repo, run `scripts/update.cmd` to install all necessary dependencies and build the executable.

## Updating a Production Deployment

Running `scripts/update.cmd` will pull the most recent code from the remote repository, install any new dependencies and then build the application in the `dist` directory.

## Debugging a Production Deployment

Running `scripts/debug.cmd` will run a debug version of the application identical to running `gulp` in your development environment.
