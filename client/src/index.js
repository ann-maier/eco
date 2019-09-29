import { createGreetingMessage } from './greeting-message';
import './style';
import loginHandler from "./loginHandler";

window.document.querySelector('.test-insert').innerHTML = 'Hello, World!';
window.document.body.appendChild(createGreetingMessage('visitor', 'blue'));

window.document.getElementById('loginBtn').addEventListener('click', loginHandler);
