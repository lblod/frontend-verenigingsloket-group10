import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class Form extends Component {
  @tracked selectedAdministrativeUnit;
  @tracked inlineParcoursModalOpen = false;

  @action
  selectAdministrativeUnit(administrativeUnit) {
    this.selectedAdministrativeUnit = administrativeUnit;
  }

  @action
  addAdministrativeUnit() {
    if (this.selectedAdministrativeUnit) {
      this.args.onAddAdministrativeUnit(this.selectedAdministrativeUnit);
    }
    this.inlineParcoursModalOpen = false;
    this.selectedAdministrativeUnit = false;
  }
}
