import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class DashboardRoute extends Route {
  @service session;
  @service store;

  async model() {
    return this.store.findAll('case');
  }
}
