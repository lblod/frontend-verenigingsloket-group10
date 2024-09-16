import { module, test } from 'qunit';
import { setupTest } from 'verenigingsloket/tests/helpers';

module('Unit | Route | cases/active/status', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:cases/active/status');
    assert.ok(route);
  });
});
