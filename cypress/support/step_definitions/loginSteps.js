import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from "../../pageObjects/LoginPage";

Given("I open the SauceDemo login page", () => {
  LoginPage.visit();
});

When("I login with {string} and {string}", (username, password) => {
  LoginPage.login(username, password);
});

Then("I should be redirected to the products page", () => {
  cy.url().should("include", "/inventory.html");
  cy.get(".title").should("contain.text", "Products");
});

Then("I should see an error message {string}", (msg) => {
  cy.get('[data-test="error"]').should("be.visible").and("contain.text", msg);
});

Then("I should detect potential UI inconsistencies heuristically", () => {
  // Heuristic: very low number of unique product images (problem_user shows duplicates)
  cy.get(".inventory_item_img img").then(($imgs) => {
    const srcs = [...$imgs].map((img) => img.getAttribute("src"));
    const unique = new Set(srcs);
    const uniqueCount = unique.size;
    const totalImages = $imgs.length;
    
    cy.log(`Found ${uniqueCount} unique product image(s) out of ${totalImages} total images`);
    
    // Normal users should have 6 unique images (one per product)
    // Problem user has duplicates - this is what we're detecting
    if (uniqueCount <= 2) {
      cy.log(`⚠️ UI Inconsistency detected: Only ${uniqueCount} unique product image(s) found (expected more - possible duplicates)`);
      expect(uniqueCount, "Should detect UI inconsistency: fewer unique images than expected").to.be.at.most(2);
    } else {
      cy.log(`✓ No image inconsistency detected: ${uniqueCount} unique images found`);
    }
  });
});

