import { post } from './httpService';
import { LOGIN_URL } from './urlHelper';

export default function loginHandler(): void {
    const loginInput: HTMLInputElement = <HTMLInputElement>document.getElementById('loginInput');
    const passwordInput: HTMLInputElement = <HTMLInputElement>document.getElementById('loginInput');

    const login: string = loginInput.value.trim();
    const password: string = passwordInput.value.trim();

    const body = { login, password };

    post(LOGIN_URL, body).then(({ data }) => {
      alert(`Logged: ${ data.success }`);
    });
}
