import css from './shadowDOM.css?raw';

export class ExampleShadowDOM extends HTMLElement {

    private readonly sheet = new CSSStyleSheet();
    
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback(): void {
        this.shadowRoot!.innerHTML = /* html */`
        <div class="shadow-dom">
          <h1>HOLA MUNDO</h1>
        </div>
        <style>
    </style>`;
        this.sheet.replace(css)
            .then(() => this.shadowRoot!.adoptedStyleSheets.push(this.sheet));
    }

    customElement(): void {
        const custom = customElements.get('example-element');
        console.log(custom);
    }

}

customElements.define('example-shadow-doom', ExampleShadowDOM);