import t from "../../src/utils/wording";

describe("Lendr without data works", () => {
  it("Lands on Lendr", () => {
    cy.get(".scan-button-container").should("contain", t("scanButton"));
  });

  it("Opens and closes inventory", () => {
    cy.get(".inventory-container").should("not.be.visible");
    cy.get("button")
      .contains(t("inventory.button"))
      .click();
    cy.get(".inventory-container").should("be.visible");

    cy.get(".menu-container button").click();
    cy.get(".menu li").contains(t("importExport"));
    cy.get(".overlay").click();
    cy.get(".menu li").should("not.exist");

    cy.get("table tbody tr td").contains(t("inventory.noResults"));
    cy.get("nav li")
      .contains(t("inventory.tab.loans"))
      .click();
    cy.get("table tbody tr td").contains(t("inventory.noResults"));
    cy.get(".cancel").click();
    cy.get(".inventory-container").should("not.be.visible");
  });

  it("Opens the menu and closes it", () => {});

  xit("Uses the scan features", () => {
    cy.get("#scanner").should("not.exist");
    cy.get(".scan-button-container button").click();
    cy.get("#scanner").should("be.visible");
    cy.get(".overlay").click();
    cy.get("#scanner").should("not.exist");
  });
});
