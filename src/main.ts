import { HeaderElement } from './components/header/Header';
import './style.css';

const header = new HeaderElement();
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = '<button>Agregar</button>';
const button = app.querySelector('button')!;

button.addEventListener('click', (event) => {

    const b = event.target as HTMLButtonElement;

    if (app.querySelector('header-element')) {
        header.remove();
        b.textContent = 'Agregar';
        return;
    }
    app.append(header);
    b.textContent = 'Destruir';
});