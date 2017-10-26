# Freeze CSS Multi-column Layouts

In CSS Multi-column Layouts, the content is balanced between columns. There are situations where this is not ideal, i.e. when having an expandable element inside. This library will freeze the initial state, preventing a reflow when the column content changes.

## How it works

The script finds the first items in every column and applies `break-before: column` to them. If the browser does not support this property (looking at you, Firefox) or does crazy things with it ([looking at you, IE](https://stackoverflow.com/a/23001256)), a `margin-top` fallback is used. In IE, the script needs to compensate this `margin-top` by adding a negative `margin-bottom` to the element.

Demo: https://backflip.github.io/freeze-css-columns/test/

## Install

```
npm install --save css-freeze-columns
```

## Usage

Require module:
```bash
import FreezeCssColumns from 'css-freeze-columns'

# Alternative: Add transpiled script to HTML: <script src="dist/es5.js"></script>
```

Freeze columns:
```js
const target = document.querySelector('.columns'),
  columnFreezer = new FreezeCssColumns(target)

columnFreezer.engage()
```

Handle resize:
```js
const target = document.querySelector('.columns'),
  columnFreezer = new FreezeCssColumns(target)

// Initial freeze
columnFreezer.engage()

// Let columns reflow on resize and freeze again
window.addEventListener('resize', () => {
  columnFreezer.update()
}, false)
```

Disable freezing:
```js
const target = document.querySelector('.columns'),
  columnFreezer = new FreezeCssColumns(target)

columnFreezer.engage()

// Disable
columnFreezer.disengage()
```
