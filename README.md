# Ember Experiments

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/)
* [Yarn](https://yarnpkg.com/)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation
- `git clone <repository-url>`
- `cd experiments`
- `yarn install`

## Running / Development
- `ember serve` to run the Ember server
- `ember test` to run the Ember tests

# The Data Table Component
The Ember `<DataTable />` component can be used in any instance where a collection of basic data objects need to be rendered in a HTML table format.

The component includes several key arguments and features.

```html
<DataTable
  @tableData={{@model.files}}
  @selectable={{true}}
  @selectedAction={{this.downloadFiles}}
  @selectedActionText="Download Selected"
  @accentedColumn="status"
  @accentedValue="available"
/>
```

## Standard Parameters
### `@tableData: Array`
The `@tableData` parameter must be used in order for the table to render any data. The parameter has been built to support an array of objects containing any type of primitive values.

## Table Action Parameters
The `<DataTable />` includes a few optional parameters that can be used to allow the table to select specific items in the `@tableData` array and perform an action upon that data.

_**Note:** All table action parameters must be used together._

### `@selectable: Boolean`
The `@selectable` enables the table to display a checkbox next to each row in the table. When used in conjunction with the other parameters, this allows the data to be selected and returned to the implementing component or controller.

### `@selectableAction: Function`
The `@selectableAction` enables the table to perform an action with the selected rows. This action will be called when a button is clicked in the action section of the table component.

### `@selectedActionText: String`
The `@selectedActionText` option specified the text that should be displayed for the action button.

## Accented Table Columns
The `<DataTable />` allows specific columns in the table rows to be accented.

_**Note:** The table accent parameters must be used together._

### `@accentedColumn: String`
The `@accentedColumn` option specifies which column could potentially contain an accent. This option maps to a key in the `@tableData` object array.

### `@accentedValue: String`
When used in conjunction with `@accentedColumn`, the `@accentedValue` option specifies which value in the selected column should be accented. The value of this parameter maps to the value of a key in the `@tableData` object array.
