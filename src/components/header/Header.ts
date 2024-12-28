import { User } from '../../shared/models/User';
import './header.css';

export class HeaderElement extends HTMLElement {

    private name!: string;
    private users: User[] = [];
    private aux = 0;
    private buttons: HTMLButtonElement[] = [];

    /* este método se llama cuando se inserta el elemento en el DOM */
    connectedCallback(): void {
        this.name = 'DIEGO'
        this.clone();
        this.buttons = Array.from(this.querySelectorAll('button')!);
        const [add, remove] = this.buttons;
        add.addEventListener('click', this);
        remove.addEventListener('click', this);
        console.log('Creando eventos...');
    }


    /* destruir eventos de boton cuando se elimine el elemento en el DOM */
    disconnectedCallback(): void {
        const [add, remove] = this.buttons;
        add.removeEventListener('clck', this);
        remove.removeEventListener('click', this);
        console.log('Destruyendo eventos...');
    }


    /* este método detecta cambios en un atributo de un custom element*/
    static get observedAttributes() {
        return ['name']
    }

    /* este método recibe la información antigua y nueva de los cambios detectados en su atributo */
    attributeChangedCallback(name: string, old: string, now: string) {
        const firstChild = this.firstElementChild!;
        const firstTextContent = firstChild.querySelector('#original')!.cloneNode(true);
        firstChild.innerHTML = '';
        firstChild.appendChild(firstTextContent);
        const users: User[] = JSON.parse(now ?? '[]');
        users.forEach(user => {
            const textContent = this.createTextElement(user);
            const child = this.querySelector('.container');
            if (child) {
                child.insertAdjacentElement('afterbegin', textContent);
            }
        });

    }

    clone(): void {
        this.innerHTML = /* html */`
        <section>
        <button>agregar</button>
        <button>eliminar</button>
          <div class="container">
            <p id="original"><strong>Valor campo</strong>: ${this.name}</p>
          </div>
        </section>
        `;
    }

    /* el método debe llamarse tal cual, handleEvent
     este método recibirá el evento y podremos gestionarlo desde su interior
    */
    handleEvent(event: MouseEvent): void {
        if (event.type === 'click') {
            this.modifyInformation(event);
        }
    }

    private modifyInformation(mouseEvent: MouseEvent): void {
        const button = mouseEvent.target as HTMLButtonElement;
        if (button.textContent === 'agregar') {
            this.aux++;
            this.users.push({ name: this.aux.toString(), password: Math.floor(Math.random() * 255).toString() });
            this.render();
            return;
        }

        if (this.users.length > 0) {
            this.users.pop();
            this.aux--;
            this.render();
        }

    }

    private createTextElement(user: User) {
        const p = document.createElement('p');
        const strong = document.createElement('strong');
        strong.textContent = 'valor atributo: ';
        p.textContent += `${user.name} - ${user.password}`;
        p.insertAdjacentElement('afterbegin', strong);
        return p;
    }

    private render(): void {
        const firstChild = this.firstElementChild!.lastElementChild!;
        const firstTextContent = firstChild.querySelector('#original')!.cloneNode(true);
        firstChild.innerHTML = '';
        firstChild.appendChild(firstTextContent);
        this.users.forEach(user => {
            const textContent = this.createTextElement(user);
            const child = this.querySelector('.container');
            if (child) {
                child.insertAdjacentElement('beforeend', textContent);
            }
        });
    }

}

customElements.define('header-element', HeaderElement);