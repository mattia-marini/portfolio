class IncludeHtml extends HTMLElement {
  constructor() {
    super();
  }

  static get observedAttributes() {
    return ["src", "head"];
  }

  connectedCallback() {
    this.style.display = "none"; // Set default display to 'none'
    this.attributeChangedCallback("src", null, this.attributes.src.value);
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (!this.parentNode) return;
    console.log(`Attribute ${name} has changed.`);
    // $(this.shadow).find("#content").load(newValue);
    // $(this).load(newValue);
    console.log(this.attributes.getNamedItem("head"));

    fetch(newValue)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.text(); // or response.text() depending on the expected format
      })
      .then((data) => {
        if (this.attributes.getNamedItem("head") === null)
          this.insertAdjacentHTML("afterend", data);
        else document.head.insertAdjacentHTML("beforeend", data);

        //execute scripts one by one
        var div = document.createElement("div");
        div.innerHTML = data.trim();

        var scripts = div.getElementsByTagName("script");
        console.log(scripts.length);
        while (scripts.length) {
          var script = scripts[0];
          script.parentNode.removeChild(script);
          var newScript = document.createElement("script");
          if (script.src) {
            newScript.src = script.src;
          } else if (script.textContent) {
            newScript.textContent = script.textContent;
          } else if (script.innerText) {
            newScript.innerText = script.innerText;
          }
          document.body.appendChild(newScript);
        }
      })
      .catch((error) => {
        console.error(
          "There has been a problem with your fetch operation:",
          error,
        );
      });
  }
}

customElements.define("include-html", IncludeHtml);
