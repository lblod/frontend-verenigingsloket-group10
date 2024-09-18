import { modifier } from 'ember-modifier';
import Yasgui from '@triply/yasgui';
import env from '../config/environment';

const defaultQuery =
  env.yasgui.defaultQuery !== '{{YASGUI_DEFAULT_QUERY}}'
    ? env.yasgui.defaultQuery
    : `PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>

SELECT * WHERE {
  ?sub a ?type ; ?p ?o .
}
LIMIT 10
`;

export default modifier(function yasgui(element /*, params, hash*/) {
  const yasgui = new Yasgui(element, {
    requestConfig: { endpoint: '/sparql' },
    autofocus: true,
  });
  yasgui.config.yasqe.value = defaultQuery;
  if (env.yasgui.extraPrefixes !== '{{YASGUI_EXTRA_PREFIXES}}')
    yasgui.config.yasqe.addPrefixes(JSON.parse(env.yasgui.extraPrefixes));
});
