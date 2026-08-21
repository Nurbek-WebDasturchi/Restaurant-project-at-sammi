window.addEventListener("DOMContentLoaded", () => {
  "use strict";
  //   offers database on object
  const offers = [
    {
      src: "./img/offer1.png",
      title: "Quattro Pasta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam, quibusdam",
      price: 55,
      discount: 18,
    },
    {
      src: "./img/offer2.png",
      title: "Vegetarian Pasta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,quibusdam.",
      price: 35,
      discount: 10,
    },
    {
      src: "./img/offer3.png",
      title: "Gluten-Free Pasta",
      desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam,quibusdam.",
      price: 40,
      discount: 15,
    },
  ];
  // Class
  class Offers {
    constructor(src, title, desc, price, discount, parentSelector) {
      this.src = src;
      this.title = title;
      this.desc = desc;
      this.price = price;
      this.discount = discount;
      this.parent = document.querySelector(parentSelector);
    }
    formatToUSD() {
      this.discount = this.discount.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
      this.price = this.price.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    }

    render() {
      const element = document.createElement("div");
      element.innerHTML = `
        <img src="${this.src}" alt="Vegertarian Pasta" />
        <div>
            <h3>${this.title}</h3>
            <p>
                ${this.desc}
            </p>
            <p>
                <del>${this.price}</del> <span class="primary-text">${this.discount}</span>
            </p>
        </div>
        `;
      this.parent.append(element);
    }
  }
  //   using class:
  offers.forEach((item) => {
    const offer = new Offers(
      item.src,
      item.title,
      item.desc,
      item.price,
      item.discount,
      ".offers-items",
    );
    offer.formatToUSD();
    offer.render();
  });
});
