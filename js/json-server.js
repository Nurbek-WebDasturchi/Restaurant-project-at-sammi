window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  class Json {
    constructor(src, title, cost, desc, parentSelector) {
      this.src = src;
      this.title = title;
      this.cost = cost;
      this.desc = desc;
      this.parentSelector = document.querySelector(parentSelector);
    }
    formatToUSD() {
      this.cost = this.cost.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }
    render() {
      const element = document.createElement("div");
      element.classList.add("col-12", "col-md-6");
      element.innerHTML = `
        <div class="menu-item">
            <img src="${this.src}" alt="LASAL Cheese" />
            <div>
                <h3>${this.title} <span class="primary-text">${this.cost}</span></h3>
                <p>
                    ${this.desc}
                </p>
            </div>
        </div>
        `;
      this.parentSelector.append(element);
    }
  }
  fetch("http://localhost:3000/menu", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach((item) => {
        const menuObj = new Json(
          item.src,
          item.title,
          item.cost,
          item.desc,
          ".menu-items",
        );
        menuObj.formatToUSD();
        menuObj.render();
      });
    })
    .catch(() => {
      console.log("Nimadir xato ketdi");
    });
});
