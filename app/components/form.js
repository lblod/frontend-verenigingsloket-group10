import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { endOfDay, startOfDay } from 'date-fns';

export default class Form extends Component {
  @tracked selectedAdministrativeUnit;
  @tracked inlineParcoursModalOpen = false;

  @action
  async setEventDate(dateStr) {
    const millis = Date.parse(dateStr);
    const [timeframe] = await this.args.model.timeframes;
    if (millis) {
      const date = new Date(millis);
      timeframe.start = startOfDay(date);
      timeframe.end = endOfDay(date);
    } else {
      timeframe.start = null;
      timeframe.end = null;
    }
  }

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
