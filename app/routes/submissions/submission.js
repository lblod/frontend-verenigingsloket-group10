import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SubmissionsSubmissionRoute extends Route {
  @service store;

  async model(params) {
    const _case = await this.store.findRecord('case', params.case_id, {
      include: 'event,identifier'
    });

    const event = await _case.event;

    return { case: _case, event };
  }
}
