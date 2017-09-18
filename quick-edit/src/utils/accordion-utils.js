import $ from 'jquery';
import 'materialize-css/dist/js/materialize.min';

export function initializeAccordion(el) {
    $(el).collapsible();
}