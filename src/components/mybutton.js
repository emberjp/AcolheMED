export class MyButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'})
        this.shadowRoot.innerHTML = `
        <style>
            button {
                padding: 10px 15px;
                border-radius: 15px;
                border: 2px solid var(--dark-green);
                background: var(--beige);
                color: var(--dark-green);
                cursor: pointer;
            }
            button:hover {
                background-color: var(--dark-green);
                color: var(--beige);
            }
        </style>
            <button><slot></slot></button>

        `
    }
}
