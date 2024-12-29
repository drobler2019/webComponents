import { ExampleElement } from './components/createCustomElement/ExampleComponent';
import { ExampleShadowDOM } from './components/shadowDOM/ShadowElementDOM';
import './style.css';

const example = new ExampleElement();
const exampleDOM = new ExampleShadowDOM();

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

app.append(exampleDOM);