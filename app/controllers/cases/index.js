import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class CasesController extends Controller {
  @tracked page = 0;
  @tracked size = 25;

  @tracked dateFilter = false;

  @action toggleDateFilter() {
    this.dateFilter = !this.dateFilter;
  }


  @action
  setPage(page) {
    this.page = page;
  }

  @action
  setPageSize(size) {
    this.size = size;
    this.setPage(0);
  }
}
