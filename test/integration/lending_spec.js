describe("Adds a new entry and lends it", () => {
  it("Adds the entry", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
    cy.get("button")
      .contains("Add")
      .click();
    cy.get("button")
      .contains("Add new")
      .click();
  });

  it("Lends it", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get("button")
      .contains("Lend")
      .click();
    cy.get(".lendForm button").should("be.disabled");
    cy.get(".lendForm input").type("Martine");
    cy.get(".lendForm button")
      .should("not.be.disabled")
      .click();
    cy.get(".toastify")
      .contains("Item lent")
      .should("be.visible");
  });

  it("Availability should be 0", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get(".available").contains("(0/1)");
  });

  it("Should not be possible to lend it", () => {
    cy.get(".button-group .button.upload").should("not.exist");
    cy.get(".button-group .button.download").should("not.exist");
    cy.get(".main-input").clear();
  });

  it("Should show the loan in the loan tab", () => {
    cy.get("button")
      .contains("Show Inventory")
      .click();
    cy.get("nav li")
      .contains("Loans")
      .click();
    cy.get("table tr td:nth-of-type(2)").contains("Martine");
    cy.get(".cancel").click();
  });
});

describe("Returns the item", () => {
  it("returns the item", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get("button")
      .contains("Return")
      .click();
    cy.get(".returnForm button").should("be.disabled");
    cy.get(".returnForm ul li")
      .contains("Martine")
      .click();
    cy.get(".returnForm button")
      .should("not.be.disabled")
      .click();
    cy.get(".toastify")
      .contains("Item returned")
      .should("be.visible");
  });

  it("Availability should be 1", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get(".available").contains("(1/1)");
    cy.get(".main-input").clear();
  });

  it("should not appear in the loan section", () => {
    cy.get("button")
      .contains("Show Inventory")
      .click();
    cy.get("nav li")
      .contains("Loans")
      .click();
    cy.get("table tr").contains("No Results");
  });

  it("should appear in the not active loan section", () => {
    cy.get("label")
      .contains("Active only")
      .click();
    cy.get("table tr td:nth-of-type(2)").contains("Martine");
    cy.get(".cancel").click();
  });
});
