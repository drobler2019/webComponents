import { ExampleElement } from './components/ExampleComponent';
import './style.css';

const example = new ExampleElement();
const app = document.querySelector<HTMLDivElement>('#app')!;
app.innerHTML = '<button>Agregar</button>';
const button = app.querySelector('button')!;

button.addEventListener('click', (event) => {

    const b = event.target as HTMLButtonElement;

    if (app.querySelector('example-element')) {
        example.remove();
        b.textContent = 'Agregar';
        return;
    }
    app.append(example);
    b.textContent = 'Destruir';
});