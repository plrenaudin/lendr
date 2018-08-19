describe("Adds a new entry", () => {
  it("Fetch result from ISBN", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
  });

  it("Clicks on add and toast is displayed", () => {
    cy.get("button")
      .contains("Add")
      .click();
    cy.get("button")
      .contains("Add new")
      .click();
    cy.get(".toastify")
      .contains("Item added")
      .should("be.visible");
  });

  it("should appear in the inventory", () => {
    cy.get("button")
      .contains("Show Inventory")
      .click();
    cy.get(".inventory-container table tbody td").contains("9782215087229");
    cy.get("button")
      .contains("Close")
      .click();
  });
});

describe("Adds an existing entry", () => {
  it("Displays the fact that an entry already exists", () => {
    cy.get(".main-input").type("9782215087229");
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
    cy.get(".available").contains("(1/1)");
  });

  it("Adds it and check the inventory", () => {
    cy.get("button")
      .contains("Add")
      .click();
    cy.get("button")
      .contains("Add one")
      .click();
    cy.get(".main-input").type("9782215087229");
    cy.get(".available").contains("(2/2)");
    cy.get(".main-input").clear();
  });
});

describe("Removes an entry", () => {
  it("Removes an item", () => {
    cy.get("button")
      .contains("Show Inventory")
      .click();
    const tableRow = cy.get("table tr");
    tableRow.contains("9782215087229");
    tableRow.get("td:nth-of-type(3)").should("contain", "2");
    tableRow.get(".bin").click();
    tableRow.get("td:nth-of-type(3)").should("contain", "1");
    cy.get(".toastify")
      .contains("Item removed")
      .should("be.visible", "Should show the toast on item removed");
    tableRow.get(".bin").click();
    cy.get("table tr").contains("No Results");
    cy.get("button")
      .contains("Close")
      .click();
  });
});
