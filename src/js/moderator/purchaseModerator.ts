import { EVENT_TYPE } from "../constant";
import VendingMachine from "../domain/vendingMachine";
import PurchasePageView from "../ui/purchasePageView";
import { on } from "../util/event";

class PurchaseModerator {
  purchasePageView;
  vendingMachine;

  constructor() {
    this.purchasePageView = new PurchasePageView();
    this.vendingMachine = VendingMachine.getInstance();
    on<any>(window, EVENT_TYPE.INPUT, (e) => {
      this.chargeMoney(e.detail);
    });

    on<any>(window, EVENT_TYPE.PURCHASE, (e) => {
      this.purchaseProduct(e.detail);
    });

    on<any>(window, EVENT_TYPE.RETURN, () => {
      this.returnChanges();
    });
  }

  init() {
    this.purchasePageView.init();

    const chargedMoney = this.vendingMachine.getChargedMoney();
    const purchaseableProducts = this.vendingMachine.getPurchaseableProducts();

    this.purchasePageView.renderCurrentChargedMoney(chargedMoney);
    this.purchasePageView.renderPurchaseableProducts(purchaseableProducts);
    this.purchasePageView.renderReturnedChanges({
      500: 0,
      100: 0,
      50: 0,
      10: 0,
    });
  }

  purchaseProduct({ id }) {
    this.vendingMachine.purchaseProduct(id);

    const chargedMoney = this.vendingMachine.getChargedMoney();
    const purchaseableProducts = this.vendingMachine.getPurchaseableProducts();
    this.purchasePageView.renderCurrentChargedMoney(chargedMoney);
    this.purchasePageView.renderPurchaseableProducts(purchaseableProducts);
  }

  returnChanges() {
    const changes = this.vendingMachine.returnChanges();
    this.purchasePageView.renderReturnedChanges(changes);
  }

  chargeMoney({ money }) {
    this.vendingMachine.chargeMoney(money);
    const chargedMoney = this.vendingMachine.getChargedMoney();
    const purchaseableProducts = this.vendingMachine.getPurchaseableProducts();
    this.purchasePageView.renderCurrentChargedMoney(chargedMoney);
    this.purchasePageView.renderPurchaseableProducts(purchaseableProducts);
  }
}

export default PurchaseModerator;
