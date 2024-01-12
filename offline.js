import {
  html,
  css,
  LitElement,
} from "https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js";

export class OnlineStatusDetector extends LitElement {
  static styles = css`
    .offline {
      display: none;
      background-color: red;
      color: white;
      padding: 10px;
      position: fixed;
      top: 0;
      left: 0;
      width: 90%;
      text-align: center;
    }
    .offline.show {
      display: block;
    }
  `;
  static getMetaConfig() {
    return {
      controlName: "Online Status Detector",
      version: "1.0",
      pluginAuthor: "Dan Stoll",
      pluginVersion: "1.0.0",
      description: "Detects when the device goes offline or comes back online.",
      iconUrl:
        "https://www.iconbolt.com/preview/facebook/ionicons-outline/cloud-offline.svg",
      groupName: "Nintex Gallery",
      fallbackDisableSubmit: false,
      searchTerms: ["Offline", "Online"],
    };
  }
  constructor() {
    super();
    this.isOnline = navigator.onLine;
  }

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener("online", this.updateOnlineStatus);
    window.addEventListener("offline", this.updateOnlineStatus);
  }

  disconnectedCallback() {
    window.removeEventListener("online", this.updateOnlineStatus);
    window.removeEventListener("offline", this.updateOnlineStatus);
    super.disconnectedCallback();
  }

  updateOnlineStatus = () => {
    this.isOnline = navigator.onLine;
    this.requestUpdate();
  };

  render() {
    return html`
      <div class="offline ${this.isOnline ? "" : "show"}">
        You are currently offline. Some features may not be available.
      </div>
    `;
  }
}

customElements.define("online-status-detector", OnlineStatusDetector);
