import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class SubmissionsSubmissionController extends Controller {
  @service store;
  @service router;
  @service userProfile;

  @tracked administrativeUnits = [];

  get isInvalid() {
    return this.administrativeUnits.length == 0;
  }

  @action
  addAdministrativeUnit(administrativeUnit) {
    this.administrativeUnits = [...this.administrativeUnits, administrativeUnit];
  }

  @action
  async cancel() {
    this.administrativeUnits = [];
    this.model.event.rollbackAttributes();
    await Promise.all([this.model.event.destroyRecord(), this.model.case.destroyRecord()]);
    this.router.transitionTo('dashboard');
  }

  @action
  async submit() {
    const [timeframe] = await this.model.event.timeframes;
    await timeframe.save();
    await this.model.event.save();

    for (let administrativeUnit of this.administrativeUnits) {
      const location = this.store.createRecord('location', {
        name: administrativeUnit.name,
        event: this.model.event,
      });
      await location.save();

      const applicant = await this.userProfile.user.organization;
      const now = new Date();
      const submission = this.store.createRecord('submission', {
        date: now,
        applicant,
        case: this.model.case,
        administrativeUnit,
      });

      await submission.save();
    }

    this.administrativeUnits = [];

    this.router.transitionTo('cases.index');
  }
}
