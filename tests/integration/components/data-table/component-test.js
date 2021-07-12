import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | data-table', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a table', async function (assert) {
    await render(hbs`<DataTable />`);

    assert.dom('table').exists();

    assert.dom('table thead').hasText(/name/i);
    assert.dom('table thead').hasText(/device/i);
    assert.dom('table thead').hasText(/path/i);
    assert.dom('table thead').hasText(/status/i);

    assert.dom('table tbody tr').exists();
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
