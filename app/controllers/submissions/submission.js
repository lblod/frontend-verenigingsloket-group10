import Controller from '@ember/controller';
import { action } from '@ember/object';
import { service } from '@ember/service';

export default class SubmissionsSubmissionController extends Controller {
  @service store;
  @service router;
  @service userProfile;

  @action
  async submit() {
    await this.model.event.save();

    // TODO generate submissions for administrative-units
    const municipalityGent = await this.store.queryOne('administrative-unit', {
      'filter[classification]': 'https://data.vlaanderen.be/id/concept/BestuurseenheidClassificatieCode/5ab0e9b8a3b2ca7c5e000001', // Gemeente
      'filter[name]': 'Gent'
    });

    for (let administrativeUnit of [municipalityGent]) {
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

    this.router.transitionTo('cases.index');
  }
}
