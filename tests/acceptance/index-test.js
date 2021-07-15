import { module, test } from 'qunit';
import { visit, click, find, findAll } from '@ember/test-helpers';
import { setupApplicationTest } from 'ember-qunit';
import { currentRouteName } from '@ember/test-helpers/setup-application-context';

module('Acceptance | index', function (hooks) {
  let originalAlert;

  setupApplicationTest(hooks);

  hooks.beforeEach(function(assert) {
    originalAlert = window.alert;
  });

  hooks.beforeEach(function(assert) {
    window.alert = originalAlert;
  });

  test('a specific file can be selected and downloaded', async function (assert) {
    await visit('/');

    const routeData = this.owner.lookup(`route:${currentRouteName()}`).context;
    const fileName = routeData.files[0].path;

    assert.ok(fileName);
    assert.dom('table tbody tr:nth-child(1)').includesText(fileName);
    assert.dom('tbody tr:nth-child(1) input[type="checkbox"]').exists();

    await click('tbody tr:nth-child(1) input[type="checkbox"]');

    const actionButton = document.evaluate('//button[text()="Download Selected"]', this.element).iterateNext();
    assert.dom(actionButton).exists();

    window.alert = (text) => {
      assert.equal(text, fileName);
    };

    await click(actionButton);
  });

  test('multiple files can be selected and downloaded', async function (assert) {
    await visit('/');

    const routeData = this.owner.lookup(`route:${currentRouteName()}`).context;

    [1, 3].forEach(async (rowIndex) => {
      const fileName = routeData.files[rowIndex-1].path;

      assert.ok(fileName);
      assert.dom(`table tbody tr:nth-child(${rowIndex})`).includesText(fileName);
      const checkbox = find(`tbody tr:nth-child(${rowIndex}) input[type="checkbox"]`);
      assert.dom(checkbox).exists();
      assert.dom(checkbox).isNotChecked();
      await click(checkbox);
      assert.dom(checkbox).isChecked();
    });

    const actionButton = document.evaluate('//button[text()="Download Selected"]', this.element).iterateNext();
    assert.dom(actionButton).exists();

    window.alert = (text) => {
      assert.true(text.includes(routeData.files[0].path))
      assert.true(text.includes(routeData.files[2].path))
    };

    await click(actionButton);
  });

  test('all the files can be selected and downloaded', async function (assert) {
    await visit('/');

    const routeData = this.owner.lookup(`route:${currentRouteName()}`).context;
    const selectAll = find('.data-table__actions input[type=checkbox]');

    findAll('tbody input[type="checkbox"]').forEach((checkbox)=>assert.dom(checkbox).isNotChecked());

    assert.dom(selectAll).exists();
    await click(selectAll);

    findAll('tbody input[type="checkbox"]').forEach((checkbox)=>assert.dom(checkbox).isChecked());


    const actionButton = document.evaluate('//button[text()="Download Selected"]', this.element).iterateNext();
    assert.dom(actionButton).exists();

    window.alert = (text) => {
      routeData.files.forEach((file)=>{
        assert.true(text.includes(file.path));
      });
    };

    await click(actionButton);
  });
});
