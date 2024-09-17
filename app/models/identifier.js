import Model, { attr, belongsTo } from '@ember-data/model';

export default class IdentifierModel extends Model {
  @attr('number') value;

  @belongsTo('case', { inverse: 'identifier', async: true }) case;
}
