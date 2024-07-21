describe("create post spec", () => {
  it("create", () => {
    cy.visit("http://localhost:3001");
    cy.get("input").type("test@gmail.com");
    cy.get("form").submit();
    cy.intercept("GET", "/auth/profile", []).as("getProfile");
    cy.wait(500);
    cy.wait("@getProfile");
    cy.get('button[id="btn-create-post"]').click();
    cy.get('button[id="listbox-btn-group"]').click();
    cy.get("#listbox-option-1").click();
    cy.wait(1000);

    // cy.get("input").type("test post");
    // cy.get("textarea").type("test content");
    // cy.get("form").submit();
  });
});
