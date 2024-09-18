import Route from '@ember/routing/route';
import { service } from '@ember/service';

export default class ApplicationRoute extends Route {
  @service session;
  @service router;
  @service userProfile;

  async beforeModel(transition) {
    await this.session.setup();

    if (this.session.isAuthenticated) {
      try {
        await this.userProfile.load();
      } catch(err) {
        await this.session.invalidate();
      }
    } else {
      if (transition.to?.name != 'sparql') {
        this.router.transitionTo('login');
      }
    }
  }
}
