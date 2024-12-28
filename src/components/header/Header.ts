import { User } from '../../shared/models/User';
import './header.css';

export class HeaderElement extends HTMLElement {

    private name!: string;
    private users: User[] = [];
    private aux = 0;
    private buttons: HTMLButtonElement[] = [];

    connectedCallback(): void {
        console.log('me insertaron');
        this.name = 'DIEGO'
        this.clone();
        this.buttons = Array.from(this.querySelectorAll('button')!);
        this.buttons[0].addEventListener('click', this);
        this.buttons[1].addEventListener('click', this);
    }

    disconnectedCallback(): void {
        console.log('me eliminaron');
    }


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

    /* el método debe llamarse tal cual, handleEvent */
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

    static get observedAttributes() {
        return ['name']
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