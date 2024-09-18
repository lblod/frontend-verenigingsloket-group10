import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class SubmissionsSubmittedRoute extends Route {
  @service store;

  async model(params) {
    const _case = await this.store.findRecord('case', params.case_id, {
      include: 'event,identifier,submissions'
    });

    const event = await _case.event;
    const submissions = await _case.submissions;

    return { case: _case, event, submissions };
  }
}
