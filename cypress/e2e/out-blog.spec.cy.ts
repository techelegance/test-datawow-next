describe("our blog spec", () => {
  it("view our blog", () => {
    cy.visit("http://localhost:3001");
    cy.get("input").type("test@gmail.com");
    cy.get("form").submit();
    cy.wait(1500);
    cy.contains('Our Blog').click()
    // cy.visit("http://localhost:3001/admin/out-blog");
  });
});
