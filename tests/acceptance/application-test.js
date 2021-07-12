import { module, test } from 'qunit';
import { visit, currentURL } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';

module('Acceptance | application', function (hooks) {
  setupApplicationTest(hooks);

  test('a table with a list of files displays', async function (assert) {
    await visit('/');

    assert.equal(currentURL(), '/');
    assert.dom('table').exists();

    assert.dom('table thead').hasText(/name/i);
    assert.dom('table thead').hasText(/device/i);
    assert.dom('table thead').hasText(/path/i);
    assert.dom('table thead').hasText(/status/i);

    assert.dom('table tbody tr').exists();
  });

  test.skip('a specific file can be selected and downloaded', async function (assert) {

  });

  test.skip('multiple files can be selected and downloaded', async function (assert) {

  });

  test.skip('all the files can be selected and downloaded', async function (assert) {

  });
});
