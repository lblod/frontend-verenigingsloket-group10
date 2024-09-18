import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { service } from '@ember/service';
import { keepLatestTask, timeout } from 'ember-concurrency';

export default class AdministrativeUnitSelectComponent extends Component {
  @service store;

  @tracked options = [];

  constructor() {
    super(...arguments);
    this.search.perform();
  }

  @keepLatestTask
  *search(term) {
    yield timeout(100);
    this.options = yield this.store.query('administrative-unit', {
      sort: 'name',
      page: {
        size: 100,
      },
      filter: {
        classification: 'http://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001', // Gemeente
        name: term,
      },
    });
  }
}
