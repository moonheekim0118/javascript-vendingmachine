import { on, emit } from "../util/event.js";
import productTemplate from "../template/product.template.js";
import { EVENT_TYPE } from "../constant";

class ProductPageView {
  constructor() {
    this.$page = document.querySelector("#page");
    this.edited = false;
    this.bindEvent();
  }

  bindEvent = () => {
    on(this.$page, "submit", this.productSubmitHandler);
    on(this.$page, "click", this.onClick);
  };

  initDOMS = () => {
    this.$productStatus = document.querySelector("#product-status");
  };

  productSubmitHandler = (e) => {
    if (e.target.id !== "add-product-form") return;
    e.preventDefault();
    if (this.edited === true) return;

    const name = e.target.querySelector("#product-name-input").value;
    const price = e.target.querySelector("#product-price-input").valueAsNumber;
    const count = e.target.querySelector("#product-count-input").valueAsNumber;

    emit(EVENT_TYPE.ADD, { name, price, count });
  };

  onClick = ({ target }) => {
    if (target.classList.contains("delete-button")) {
      if (this.edited === true) return;

      this.productDeleteHandler(target);
    }
    if (target.classList.contains("edit-button")) {
      if (this.edited === true) return;

      this.productUpdateHandler(target);
    }

    if (target.classList.contains("save-button")) {
      this.productSubmitUpdateHandler(target);
    }
  };

  productDeleteHandler = (target) => {
    const productId = target.closest("tr").dataset.id;
    emit(EVENT_TYPE.DELETE, { id: productId });
  };

  productUpdateHandler = (target) => {
    const product = target.closest("tr");
    product.innerHTML = productTemplate.productUpdateForm({
      name: target.datset.name,
      price: target.dataset.price,
      count: target.dataset.count,
    });

    this.edited = true;
  };

  productSubmitUpdateHandler = (target) => {
    const updatedProduct = target.closest("tr");

    const idx = Number(updatedProduct.dataset.id);
    const updatedName = updatedProduct.querySelector("#edit-name-input").value;
    const updatedPrice =
      updatedProduct.querySelector("#edit-price-input").valueAsNumber;
    const updatedCount =
      updatedProduct.querySelector("#edit-count-input").valueAsNumber;

    this.edited = false;

    emit(EVENT_TYPE.EDIT, {
      idx,
      name: updatedName,
      price: updatedPrice,
      count: updatedCount,
    });
  };

  renderInputForm = () => {
    this.$page.replaceChildren();
    this.$page.insertAdjacentHTML("beforeend", productTemplate.input());
  };

  renderProductStatus = (products) => {
    this.$productStatus.replaceChildren();
    this.$productStatus.insertAdjacentHTML(
      "beforeend",
      productTemplate.productStatus(products)
    );
  };
}

export default ProductPageView;
