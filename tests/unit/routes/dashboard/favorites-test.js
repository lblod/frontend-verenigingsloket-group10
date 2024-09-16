import { module, test } from 'qunit';
import { setupTest } from 'verenigingsloket/tests/helpers';

module('Unit | Route | dashboard/favorites', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:dashboard/favorites');
    assert.ok(route);
  });
});
