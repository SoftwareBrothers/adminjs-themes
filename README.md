# Themes for AdminJS

Themes let you change the style and default components of your admin panel. There are three elements added to the app by each theme:

`component overrides` - React components that replace a subset of overridable components

`theme overrides for @adminjs/design-system` - this is merged into the default config, and then user's branding is applied on top

`custom CSS styles` - a single global CSS file with additional theme styles

## Importing Themes in AdminJS

### Setup

You can add availableThemes configuration option with an array of theme objects (for example imported from @adminjs/themes package) or themes bundled locally with `@adminjs/themes` CLI adminjs-themes bundle. The first theme on the list will be active by default. This can be changed with defaultTheme option - specify the ID of a theme - these are usually the same as the named exports.

```ts
import AdminJS from 'adminjs'
import { light, dark } from '@adminjs/themes'

new AdminJS({
  defaultTheme: 'dark', // same as `dark` from id in the theme index file,
  availableThemes: [light, dark],
})
```

Bundle and style paths are taken from @adminjs/themes if the theme is officially supported by library or can be imported from a local path like:

```ts
import path from 'path';
import * as url from 'url';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

new AdminJS({
  defaultTheme: 'my-custom-theme',
  availableThemes: {
    id: 'my-custom-theme',
    name: 'my custom theme',
    overrides: {
      colors: {
        primary100: '#f00',
      },
    },
    bundlePath: `${path.join(__dirname, `../themes/my-custom-theme`)}/theme.bundle.js`,
    stylePath: `${path.join(__dirname, `../themes/my-custom-theme`)}/style.css`,
  },
});
```

Full example available in @adminjs/themes example app.

### Per-user themes

Additionally, the theme can be configured per-user by returning theme ID in the theme property of the CurrentAdmin object - this should be implemented via the framework plugin, i.e. authenticate function in @adminjs/express. Since you have full control of that object, returned the theme can be selected based on things like user's role or property in the database.

There's no UI control for changing themes, but you can implement this yourself. The general idea is to keep theme ID in the user resource, and add a button that will update the current user record with the selected theme. Alternatively, you can let the user edit their own record and offer a custom select property. Note that for the currentAdmin object to update the user most likely needs to sign in again.

### CLI

You can create a new theme using `@adminjs/themes` cli. After checkout the repository you can register cli on your machine with `yarn register:cli`. After that, you can use `adminjs-themes` in your command line. 

AdminJS Themes CLI provides commands for:

- `adminjs-themes generate <theme name>` - Generating a new theme with the recommended file structure.
- `adminjs-themes bundle` - Bundling all themes component overrides. You can pass theme ID as an argument to bundle ssingle theme.

For more information please use the command `adminjs-themes bundle --help`

## Usage

Please see the [documentation](https://docs.adminjs.co/ui-customization/writing-your-own-components#theming).

## License

AdminJS is copyrighted © 2023 rst.software. It is a free software, and may be redistributed under the terms specified in the [LICENSE](LICENSE.md) file.

## About rst.software

<img src="https://pbs.twimg.com/profile_images/1367119173604810752/dKVlj1YY_400x400.jpg" width=150>

We’re an open, friendly team that helps clients from all over the world to transform their businesses and create astonishing products.

* We are available for [hire](https://www.rst.software/estimate-your-project).
* If you want to work for us - check out the [career page](https://www.rst.software/join-us).
