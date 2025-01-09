describe("User login", () => {
  it("successful login with valid credentials", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.get("input#email")
      .should("be.visible")
      .should("have.attr", "placeholder", "hello@example.com")
      .type("111202214127@mhs.dinus.ac.id")
      .should("have.value", "111202214127@mhs.dinus.ac.id");

    cy.get("input#password")
      .should("be.visible")
      .should("have.attr", "placeholder", "*************")
      .type("123456")
      .should("have.value", "123456");

    cy.get("button").contains("Login").click();

    cy.get("nav");
    cy.get("header");
  });

  it("error display for missing @ in student email", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.get("input#email")
      .should("be.visible")
      .type("111202214127mhs.dinus.ac.id");

    cy.get("input#password").should("be.visible").type("123456");

    cy.get("button").contains("Login").click();

    // Simplified error message check
    cy.contains("Invalid email").should("be.visible");
  });

  it("error display for missing domain in student email", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.get("input#email").should("be.visible").type("111202214127@");

    cy.get("input#password").should("be.visible").type("123456");

    cy.get("button").contains("Login").click();

    // Simplified error message check
    cy.contains("Invalid email").should("be.visible");
  });

  it("error display for missing dot in student email", () => {
    cy.visit("http://localhost:5173/");
    cy.url().should("include", "/login");

    cy.get("input#email")
      .should("be.visible")
      .type("111202214127@mhsdinusacid");

    cy.get("input#password").should("be.visible").type("123456");

    cy.get("button").contains("Login").click();

    // Simplified error message check
    cy.contains("Invalid email").should("be.visible");
  });
});

describe("Dashboard Overview", () => {
  beforeEach(() => {
    // Intercept API calls
    cy.intercept("POST", "https://jwt-auth-eight-neon.vercel.app/login").as(
      "loginRequest"
    );
    cy.intercept("GET", "https://jwt-auth-eight-neon.vercel.app/bills").as(
      "getBills"
    );
    cy.intercept("GET", "https://jwt-auth-eight-neon.vercel.app/goals").as(
      "getGoals"
    );

    // Visit login page
    cy.visit("http://localhost:5173/login");

    // Login process
    cy.get("input#email")
      .should("be.visible")
      .type("111202214127@mhs.dinus.ac.id");

    cy.get("input#password").should("be.visible").type("123456");

    cy.get("button").contains("Login").click();

    // Wait for login request to complete
    cy.wait("@loginRequest").then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
    });

    // Wait for dashboard data to load
    cy.wait(["@getBills", "@getGoals"]);

    // Wait for navigation to complete and verify we're on dashboard
    cy.location("pathname", { timeout: 10000 }).should("eq", "/");
  });

  it("main dashboard sections display verification", () => {
    // Verify basic layout
    cy.get("nav").should("be.visible");
    cy.get("header").should("be.visible");
    cy.get("main").should("be.visible");

    // Verify all cards are present
    cy.contains("Total Balance").should("exist");
    cy.contains("Goals").should("exist");
    cy.contains("Bills").should("exist");
    cy.contains("Recent Transaction").should("exist");
    cy.contains("Statistics").should("exist");
    cy.contains("Expenses Breakdown").should("exist");
  });

  it("balance information display verification", () => {
    cy.contains("Total Balance")
      .parent()
      .within(() => {
        cy.get("a").contains("All account").should("be.visible");
        cy.contains("Account Type").should("be.visible");
        cy.get(".text-2xl.font-bold").should("be.visible");
      });
  });

  it("goals card data verification", () => {
    // Wait for goals data to load
    cy.wait("@getGoals");

    // First find the Goals card container
    cy.contains("div", "Goals")
      .parents(".bg-special-mainBg")
      .within(() => {
        // Check present amount
        cy.get("span.text-2xl.font-bold").should("exist");
        // Check target sections
        cy.get("span.text-gray-02").contains("Target Achieved").should("exist");
        cy.get("span.text-gray-02")
          .contains("This Month Target")
          .should("exist");
        // Check edit button
        cy.get("div.bg-gray-05").should("exist");
      });
  });

  it("bills information display verification", () => {
    // Wait for bills data to load
    cy.wait("@getBills");

    // Find the Bills card container
    cy.contains("div", "Bills")
      .parents(".bg-special-mainBg")
      .first()
      .within(() => {
        // Check if there are bill items
        cy.get("div.lg\\:flex").each(($billItem) => {
          cy.wrap($billItem).within(() => {
            // Check bill date and info
            cy.get("div.bg-special-bg").should("exist");
            cy.get("span.text-xs").should("exist");
            cy.get("span.font-bold").should("exist");
            cy.get("span.p-2.border.rounded-lg").should("exist");
          });
        });

        // Check for bill images
        cy.get("img").should("exist");
        cy.contains("Last Charge").should("exist");
      });
  });

  it("transaction filtering functionality verification", () => {
    cy.contains("Recent Transaction")
      .parent()
      .within(() => {
        // Test each filter tab
        cy.contains("button", "All")
          .click()
          .should("have.class", "border-primary");
        cy.contains("button", "Revenue")
          .click()
          .should("have.class", "border-primary");
        cy.contains("button", "Expense")
          .click()
          .should("have.class", "border-primary");
      });
  });

  it("statistics chart display verification", () => {
    cy.contains("Statistics")
      .parent()
      .within(() => {
        cy.get("select").should("have.value", "Weekly Comparison");
        cy.get(".h-72").should("be.visible");
      });
  });

  it("expenses breakdown display verification", () => {
    cy.contains("Expenses Breakdown")
      .parent()
      .within(() => {
        cy.get(".bg-special-bg").should("be.visible");
        cy.get(".text-gray-02").should("be.visible");
        cy.get(".font-bold.text-lg").should("be.visible");
      });
  });
});
