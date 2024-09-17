import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CasesIndexRoute extends Route {
  @service store;

  model() {
    return this.store.query('case', {
      include: 'event,identifier,submissions'
    });
  }
}
