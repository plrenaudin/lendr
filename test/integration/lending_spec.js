import t from "../../src/utils/wording";

describe("Adds a new entry and lends it", () => {
  it("Adds the entry and lends it", () => {
    cy.log("Adding new entry");
    cy.get(".main-input input").type("9782215087229");
    cy.get("li.add").click();
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
    cy.get("button")
      .contains(t("action.add"))
      .click();
    cy.get("button")
      .contains(t("action.addAction"))
      .click();

    cy.log("Lending entry");
    cy.get(".main-input input").type("9782215087229");
    cy.get("ul.suggestions li:first").click();
    cy.get("button")
      .contains(t("action.lendAction"))
      .click();
    cy.get(".lend-form button").should("be.disabled");
    cy.get(".lend-form input").type("Martine");
    cy.get(".lend-form button")
      .should("not.be.disabled")
      .click();
    cy.get(".toastify")
      .contains(t("notification.lent"))
      .should("be.visible");
  });

  it("Availability should be 0", () => {
    cy.get(".main-input input").type("9782215087229");
    cy.get("ul.suggestions li:first").click();
    cy.get(".available").contains("(0/1)");

    cy.log("Should not be possible to lend it");

    cy.get(".button-group .button.upload").should("not.exist");
    cy.get(".button-group .button.download").should("not.exist");
    cy.get(".cancel").click();
  });

  it("Should show the loan in the loan tab", () => {
    cy.get("button")
      .contains(t("inventory.button"))
      .click();
    cy.get("nav li")
      .contains(t("inventory.tab.loans"))
      .click();
    cy.get("table tr td:nth-of-type(2)").contains("Martine");
    cy.get(".cancel").click();
  });
});

describe("Returns the item", () => {
  it("returns the item", () => {
    cy.get(".main-input input").type("9782215087229");
    cy.get("ul.suggestions li:first").click();
    cy.get("button")
      .contains(t("action.returnAction"))
      .click();
    cy.get(".return-form ol li.selected").contains("Martine");
    cy.get(".return-form button")
      .should("not.be.disabled")
      .click();
    cy.get(".toastify")
      .contains(t("notification.returned"))
      .should("be.visible");
  });

  it("Availability should be 1", () => {
    cy.get(".main-input input").type("9782215087229");
    cy.get("ul.suggestions li:first").click();
    cy.get(".available").contains("(1/1)");
    cy.get(".cancel").click();
  });

  it("should appear in the loan section correctly", () => {
    cy.log("should not appear in the loan section");
    cy.get("button")
      .contains(t("inventory.button"))
      .click();
    cy.get("nav li")
      .contains(t("inventory.tab.loans"))
      .click();
    cy.get("table tr").contains(t("inventory.noResults"));

    cy.log("should appear in the not active loan section");
    cy.get("label")
      .contains(t("inventory.activeOnly"))
      .click();
    cy.get("table tr td:nth-of-type(2)").contains("Martine");
    cy.get(".cancel").click();
  });
});
