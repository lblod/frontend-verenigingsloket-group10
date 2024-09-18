import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class CasesIndexRoute extends Route {
  @service store;

  queryParams = {
    page: {
      refreshModel: true
    },
    size: {
      refreshModel: true
    },
  };

  model(params) {
    return this.store.query('case', {
      include: 'event,identifier,submissions',
      sort: '-created',
      page: {
        number: params.page,
        size: params.size
      },
    });
  }
}
