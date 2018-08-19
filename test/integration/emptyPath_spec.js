describe("Lendr without data works", () => {
  it("Lands on Lendr", () => {
    cy.get(".scan-button-container").should("contain", "Scan");
  });

  it("Opens and closes inventory", () => {
    cy.get(".inventory-container").should("not.be.visible");
    cy.get("button")
      .contains("Show Inventory")
      .click();
    cy.get(".inventory-container").should("be.visible");

    cy.get("table tbody tr td").contains("No Results");
    cy.get("nav li")
      .contains("Loans")
      .click();
    cy.get("table tbody tr td").contains("No Results");
    cy.get("button")
      .contains("Close")
      .click();
    cy.get(".inventory-container").should("not.be.visible");
  });

  xit("Uses the scan features", () => {
    cy.get("#scanner").should("not.exists");
    cy.get(".scan-button-container button").click();
    cy.get("#scanner").should("be.visible");
    cy.get(".overlay").click();
    cy.get("#scanner").should("not.exists");
  });
});
