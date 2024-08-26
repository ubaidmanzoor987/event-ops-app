describe('form submition', () => {
  it('passes', () => {
    cy.visit('http://localhost:7777/');
    cy.fixture('sample.json').then((data) => {
      const { name, description, videoLink } = data;
      cy.get('[data-cy="event-name"]').type(name);
      cy.get('[placeholder="Select Date(s)..."]').click();
      cy.get('.cypress-test').click();
      // cy.get('.cypress-active').click();
      cy.get('[data-cy="event-timezone"]').click();
      cy.get('[data-cy="event-timezone-list"]').first().click();
      cy.get('[data-cy="event-time"]').click();
      cy.get('[data-cy="event-time-list"]').first().click();
      cy.get('[data-cy="event-end-time"]').click();
      cy.get('[data-cy="event-end-time-list"]').first().click();

      cy.get('[data-cy="event-description"]').type(description);
      cy.get('[data-cy="event-video"]').type(videoLink);
      cy.get('[data-cy="event-image"]')
        .attachFile('sponge.jpg') // Attach the file from fixtures
        .should('have.value', 'C:\\fakepath\\sponge.jpg'); // Verify the file path shown
    });

    cy.get('[data-cy="event-submit"]').click();
    cy.get('[data-cy="event-generated"]').should(
      'contain.text',
      'Emilia Gates'
    );
  });
});
