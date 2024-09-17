import Model, { belongsTo, hasMany, attr } from '@ember-data/model';

export default class CaseModel extends Model {
  @attr uri;
  @attr('datetime') created;

  @belongsTo('identifier', { inverse: 'case', async: true }) identifier;
  @belongsTo('event', { inverse: 'case', async: true }) event;
  @hasMany('submission', { inverse: 'case', async: true }) submissions;
}
