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

  test('the table renders data in an expected table format', async function(assert) {
    this.set('tableData', [{
      columnOneHeader: 'columnOneValue',
      columnTwoHeader: 'columnTwoValue',
    }]);

    await render(hbs`<DataTable @tableData={{this.tableData}}/>`);
    assert.dom('table thead').hasText(/columnOneHeader/i);
    assert.dom('table thead').hasText(/columnTwoHeader/i);
    assert.dom('table tbody').hasText(/columnOneValue/i);
    assert.dom('table tbody').hasText(/columnTwoValue/i);
  });

  test('it renders an action section with controls to select all and download', async function (assert) {
    await render(hbs`<DataTable />`);

    assert.dom('.data-table__actions').exists();

    const button = assert.dom('.data-table__actions button');
    button.hasAttribute('type', 'button');
    button.hasText(/download/i);

    assert.dom('label[for=select-all-rows]').exists();
    assert.dom('#select-all-rows').exists();
  });
});
