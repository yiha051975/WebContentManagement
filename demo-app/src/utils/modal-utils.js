import $ from 'jquery';
import 'materialize-css/dist/js/materialize.min';

const modals = {};

export function modalTriggerLinkOnClick(e) {
    const modalId = $(e.target).data('target');

    openModal(modalId);
}

export function modalCloseLinkOnClick(e) {
    const modalId = $(e.target).data('target');

    closeModal(modalId);
}

export function initializeModalContainer(el) {
    if (el) {
        modals[el.id] = $(el);
        modals[el.id].modal();
    }
}

export function openModal(modalId) {
    if (modalId && modals[modalId]) {
        modals[modalId].modal('open');
    }
}

export function closeModal(modalId) {
    if (modalId && modals[modalId]) {
        modals[modalId].modal('close');
    }
}