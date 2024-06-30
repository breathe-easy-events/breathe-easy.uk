import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sign-up")
export class SignUp extends LitElement {
  private _form: HTMLFormElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._form = this.querySelector("form");
    if (this._form) {
      console.log(this._form);
    } else {
      console.log("noop no form");
    }
  }
  render() {
    return html`<slot></slot>`;
  }
}
