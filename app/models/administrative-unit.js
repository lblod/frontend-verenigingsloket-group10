import Model, { attr, hasMany } from '@ember-data/model';

export default class AdministrativeUnitModel extends Model {
  @attr('string') uri;
  @attr('string') name;

  @hasMany('submission', { inverse: 'administrativeUnit', async: true }) submissions;
}
