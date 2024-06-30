// import { SignUp } from "./sign-up";

import { LitElement, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("sign-up")
export class SignUp extends LitElement {
  private _form: HTMLFormElement | null = null;
  private _submit: HTMLButtonElement | null = null;

  override connectedCallback(): void {
    super.connectedCallback();
    this._form = this.querySelector("form");
    this._submit = this.querySelector("button");
    if (this._submit) {
      this._submit.setAttribute("type", "button");
      console.log(this._submit);
      this._submit.onclick = () => {
        console.log("poot poot");
        if (this._form) {
          console.log(Object.fromEntries(new FormData(this._form)));
        }
      };
    } else {
      console.log("noop no button");
    }
  }
  render() {
    return html`<slot></slot>`;
  }
}
