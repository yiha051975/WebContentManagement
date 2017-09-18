import $ from 'jquery';
import 'materialize-css/dist/js/materialize';

const modals = {};

export function modalTriggerLinkOnClick(e) {
    const modalId = $(e.target).data('target');

    modals[modalId].modal('open');
}

export function modalCloseLinkOnClick(e) {
    const modalId = $(e.target).data('target');

    modals[modalId].modal('close');
}

export function initializeModalContainer(el) {
    if (el) {
        modals[el.id] = $(el);
        modals[el.id].modal();
    }
}