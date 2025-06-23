// dialogFactory.js
import { ElementBuilder } from './ElementBuilder.js';
import './dialog-modal.css'

export function createDialogModal() {
  const dialogContent = new ElementBuilder('div')
    .setId('dialog-content');

  const closeButton = new ElementBuilder('button')
    .setId('dialog-close')
    .addClass('sb-button', 'dialog-close')
    .setAttr('autofocus', '')
    .setText('X');

  const innerWrapper = new ElementBuilder('div')
    .addClass('flex-col')
    .append(closeButton)
    .append(dialogContent);

  const dialog = new ElementBuilder('dialog')
    .setId('dialog-modal')
    .addClass('dialog-modal')
    .append(innerWrapper);
    

  closeButton.on('click', e => dialog.build().close());

  return dialog.build(); // return native DOM element
}
