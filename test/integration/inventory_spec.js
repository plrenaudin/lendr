import t from "../../src/utils/wording";

describe("Adds a new entry", () => {
  it("Fetch result from ISBN", () => {
    cy.get(".main-input input").type("9782215087229");
    cy.get("li.add").click();
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
  });

  it("Clicks on add and toast is displayed", () => {
    cy.get("button")
      .contains(t("action.add"))
      .click();
    cy.get("button")
      .contains(t("action.addAction"))
      .click();
    cy.get(".toastify")
      .contains(t("notification.added"))
      .should("be.visible");
  });

  it("should appear in the inventory", () => {
    cy.get("button")
      .contains(t("inventory.button"))
      .click();
    cy.log("clicking on inventory line selects the item");
    cy.get(".inventory-container table tbody td")
      .contains("9782215087229")
      .click();
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
    cy.contains(".cancel", t("action.cancel")).click();
  });
});

describe("Adds an existing entry", () => {
  it("Displays the fact that an entry already exists", () => {
    cy.get(".main-input input").type("9782215087229");
    cy.get("ul.suggestions li:first").click();
    cy.get(".card.description").contains("La forêt - Emilie Beaumont, Nathalie Bélineau");
    cy.get(".available").contains("(1/1)");
  });

  it("Adds it and check the inventory", () => {
    cy.get("button")
      .contains(t("action.add"))
      .click();
    cy.get(".main-input input").type("9782215087229");
    cy.get("ul.suggestions li:first").click();
    cy.get(".available").contains("(2/2)");
    cy.get(".cancel").click();
  });
});

describe("Removes an entry", () => {
  it("Removes an item", () => {
    cy.get("button")
      .contains(t("inventory.button"))
      .click();
    const tableRow = cy.get("table tr");
    tableRow.contains("9782215087229");
    tableRow.get("td:nth-of-type(3)").should("contain", "2");
    tableRow.get(".bin").click();
    tableRow.get("td:nth-of-type(3)").should("contain", "1");
    cy.get(".toastify")
      .contains(t("notification.removed"))
      .should("be.visible", "Should show the toast on item removed");
    tableRow.get(".bin").click();
    cy.get("table tr").contains(t("inventory.noResults"));
    cy.get(".cancel").click();
  });
});
