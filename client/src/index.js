import { createGreetingMessage } from './greeting-message';
import './style';

window.document.querySelector('.test-insert').innerHTML = 'Hello, World!';
window.document.body.appendChild(createGreetingMessage('visitor', 'blue'));
