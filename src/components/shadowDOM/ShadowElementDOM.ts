import css from './shadowDOM.css?raw';

export class ExampleShadowDOM extends HTMLElement {

    private readonly sheet = new CSSStyleSheet();

    constructor() {
        super();
        this.attachShadow({ mode: "open" });
        /* hace referencia al light DOM (es la parte visible del DOM que fué tapado por el shado DOM) */
        this.innerHTML = '<p style="color: red">contenido por defecto</p>';
    }

    connectedCallback(): void {
        this.sheet.replace(css)
            .then(() => {
                this.shadowRoot!.adoptedStyleSheets.push(this.sheet);
                this.shadowRoot!.innerHTML = /* html */`
                       <div class="shadow-dom">
                          <h1>Hola usuario: <slot><p>desconocido</p></slot></h1>
                       </div>`;
            });
    }

    customElement(): void {
        const custom = customElements.get('example-element');
        console.log(custom);
    }

}

customElements.define('example-shadow-doom', ExampleShadowDOM);