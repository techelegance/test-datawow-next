describe("post detail spec", () => {
    it("view post detail", () => {
      cy.visit("http://localhost:3001");
      cy.get("input").type("test@gmail.com");
      cy.get("form").submit();
      cy.visit("http://localhost:3001/admin/post-detail/1");
    });
  });
  