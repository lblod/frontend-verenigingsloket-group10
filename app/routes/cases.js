import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CasesRoute extends Route {
  @service session;
  @service store;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  async model() {
    return this.store.findAll('case');
  }
}
