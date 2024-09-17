import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SubmissionRoute extends Route {
  @service session;
  @service store;
  @service router;

  async beforeModel() {
    const identifier = await this.store.queryOne('identifier', {
      sort: '-value',
      'filter[:has:case]': 't'
     });

    this.nextCaseNumber = identifier ? identifier.value + 1 : 1000;
  }

  async model() {
    const identifier = this.store.createRecord('identifier', {
      value: this.nextCaseNumber,
    });

    const event = this.store.createRecord('event', {

    });

    await Promise.all([identifier.save(), event.save()]);

    const _case = this.store.createRecord('case', {
      created: new Date(),
      identifier,
      event,
    });

    await _case.save();

    return _case;
  }

  afterModel(model) {
    this.router.transitionTo('submissions.submission', model.id);
  }
}
