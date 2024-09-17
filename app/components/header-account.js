import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { modifier } from 'ember-modifier';
import { service } from '@ember/service';

export default class HeaderAccount extends Component {
  @service userProfile;

  @tracked referenceElement = undefined;
  @tracked arrowElement = undefined;
  @tracked dropdownOpen = false;

  reference = modifier(
    (element) => {
      this.referenceElement = element;
    },
    { eager: false },
  );

  arrow = modifier(
    (element) => {
      this.arrowElement = element;
    },
    { eager: false },
  );

  @action
  openDropdown() {
    this.dropdownOpen = true;
  }

  @action
  closeDropdown() {
    this.dropdownOpen = false;
    this.args.onClose?.();
  }

  @action
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;

    if (!this.dropdownOpen) {
      this.args.onClose?.();
    }
  }

  @action
  clickOutsideDeactivates(event) {
    let isClosedByToggleButton = this.referenceElement.contains(event.target);

    if (!isClosedByToggleButton) {
      this.closeDropdown();
    }

    return true;
  }
}
