# Robomongo website

### Prerequisites

1. Node.js 4.X
2. Webpack (`npm install webpack -g`)

### Run frontend development server

```sh
$ npm install
$ npm start
```

Navigate to the [http://localhost:4111/webpack-dev-server/](http://localhost:4111/webpack-dev-server)

### Build for production:

```sh
$ webpack -p
```

### Conventions

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

For .js conventions we use [Standard.js](http://standardjs.com/). Referer to the documentation
to lear more

To check code styles use:

```sh
npm test
```

Main things to remember:

1. No semicolons
2. Single quotes for strings
3. No unused variables
4. 2 spaces – for indentation
5. Use `camelCase` when naming objects, functions, and instances.
6. Use `PascalCase` when naming constructors or classes.


##### Indention

All code (CSS, Less, JavaScript, HTML, JSON) should be indented with **2 spaces**.
Please do not use tabs.

##### File Names

File names are always lowercase, with dashes (`-`) as delimiters. Do
not use underscore in file names.

There are possible exceptions for JavaScript: if your file exports a single
class or single function, you may name your file name in PascalCase or camelCase
respectively.

##### CSS / LESS / SCSS

* Class names are always lowercase.
* Prefer dashes over camelCasing in class names. Underscores are OK if you're using BEM.
* When using multiple selectors in a rule declaration, give each selector its own line.
* Put a space before the opening brace `{` in rule declarations
* In properties, put a space after, but not before, the `:` character.
* Put closing braces `}` of rule declarations on a new line
* Put blank lines between rule declarations

##### BEM naming conventions

It is advisable to use CSS class naming scheme based on BEM. In this case please follow
naming conventions proposed by Nicolas Gallagher:

```css
.form { /* ... */ }
.form--theme-xmas { /* ... */ }
.form--simple { /* ... */ }
.form__input { /* ... */ }
.form__submit { /* ... */ }
.form__submit--disabled { /* ... */ }
```

##### Responsive grid breakpoints

* 1500px - ∞ (Extra Large)
* 1200px - 1499px (Large)
* 992px - 1199px (Medium)
* 768px - 991px (Small)
* 480px - 767px (Extra Small)
