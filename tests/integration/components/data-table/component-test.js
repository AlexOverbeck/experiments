import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | data-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a table', async function (assert) {
    await render(hbs`<DataTable />`);

    assert.dom('table').exists();
  });

  test('the table renders data in an expected table format', async function (assert) {
    this.set('tableData', [
      {
        columnOneHeader: 'columnOneValue',
        columnTwoHeader: 'columnTwoValue',
      },
    ]);

    await render(hbs`<DataTable @tableData={{this.tableData}}/>`);
    assert.dom('table thead').hasText(/columnOneHeader/i);
    assert.dom('table thead').hasText(/columnTwoHeader/i);
    assert.dom('table tbody').hasText(/columnOneValue/i);
    assert.dom('table tbody').hasText(/columnTwoValue/i);
  });

  test('the table renders irregular object data in a reliable table format', async function (assert) {
    this.set('tableData', [
      {
        columnOneHeader: 'columnOneValue',
        columnTwoHeader: 'columnTwoValue',
      },
      {
        columnOneHeader: 'columnOneValue',
        WUT: 'RLY?',
      },
    ]);

    await render(hbs`<DataTable @tableData={{this.tableData}}/>`);

    assert.dom('table thead').hasText(/columnOneHeader/i);
    assert.dom('table thead').hasText(/columnTwoHeader/i);
    assert.dom('table thead').hasText(/wut/i);
    assert.dom('table tbody').hasText(/columnOneValue/i);
    assert.dom('table tbody').hasText(/columnTwoValue/i);
    assert.dom('table tbody').hasText(/rly/i);
  });

  test('it renders an action section with controls only if specified', async function (assert) {
    this.set('selectable', false);
    this.set('selectedActionText', undefined);

    await render(hbs`<DataTable @selectable={{this.selectable}} @selectedActionText={{this.selectedActionText}}/>`);

    assert.dom('.data-table__actions').doesNotExist();

    this.set('selectable', true);
    this.set('selectedActionText', 'DO ALL THE THINGS!!')

    assert.dom('.data-table__actions').exists();
    const button = assert.dom('.data-table__actions button');
    button.hasAttribute('type', 'button');
    button.hasText(/all the things/i);

    assert.dom('.data-table__actions input[type=checkbox]').exists();
  });
});
