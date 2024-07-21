describe("login spec", () => {
  it("login", () => {
    cy.visit("http://localhost:3001");
    cy.get("input").type("test@gmail.com");
    cy.get("form").submit();
  });
});
