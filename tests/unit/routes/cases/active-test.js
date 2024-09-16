import { module, test } from 'qunit';
import { setupTest } from 'verenigingsloket/tests/helpers';

module('Unit | Route | cases/active', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:cases/active');
    assert.ok(route);
  });
});
