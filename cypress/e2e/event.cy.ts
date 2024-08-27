describe('Form Submission and Validation Tests', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should successfully submit the form with valid data', () => {
    cy.fixture('event.json').then((data) => {
      const { name, description, videoLink } = data.valid;

      cy.get('[data-cy="event-name"]').type(name);

      // Interacting with DatePicker
      cy.get('[placeholder="Select Date(s)..."]').click();
      cy.get('.cypress-test').click(); // Replace with actual selector or steps to select a date

      // Selecting Timezone
      cy.get('[data-cy="event-timezone"]').click();
      cy.get('[data-cy="event-timezone-list"]').first().click();

      // Selecting Start Time
      cy.get('[data-cy="event-time"]').click();
      cy.get('[data-cy="event-time-list"]').first().click();

      // Selecting End Time
      cy.get('[data-cy="event-end-time"]').click();
      cy.get('[data-cy="event-end-time-list"]').first().click();

      // Filling out description
      cy.get('[data-cy="event-description"]').type(description);

      // Adding a video link
      cy.get('[data-cy="event-video"]').type(videoLink);

      // Uploading a banner image
      cy.get('[data-cy="event-image"]')
        .attachFile('sponge.jpg')
        .should('have.value', 'C:\\fakepath\\sponge.jpg'); // Ensure this selector matches your actual file input's data-cy attribute

      // Submit the form
      cy.get('[data-cy="event-submit"]').click();

      // Verify success toast message
      cy.get('[data-cy="event-generated"]').should(
        'contain.text',
        'Emilia Gates'
      );
    });
  });

  it('should fail to submit the form with an invalid video URL', () => {
    cy.fixture('event.json').then((data) => {
      const { name, description, videoLink } = data.invalid;

      cy.get('[data-cy="event-name"]').type(name);

      // Interacting with DatePicker
      cy.get('[placeholder="Select Date(s)..."]').click();
      cy.get('.cypress-test').click(); // Replace with actual selector or steps to select a date

      // Selecting Timezone
      cy.get('[data-cy="event-timezone"]').click();
      cy.get('[data-cy="event-timezone-list"]').first().click();

      // Selecting Start Time
      cy.get('[data-cy="event-time"]').click();
      cy.get('[data-cy="event-time-list"]').first().click();

      // Selecting End Time
      cy.get('[data-cy="event-end-time"]').click();
      cy.get('[data-cy="event-end-time-list"]').first().click();

      // Filling out description
      cy.get('[data-cy="event-description"]').type(description);

      // Enter an invalid video URL
      cy.get('[data-cy="event-video"]').type(videoLink);

      // Attempt to submit the form
      cy.get('[data-cy="event-submit"]').click();

      // Check for the error message related to the video URL
      cy.contains('Video link must be a valid HTTPS URL').should('exist');
    });
  });

  it('should show errors when required fields are missing', () => {
    // Try to submit the form without filling anything
    cy.get('[data-cy="event-submit"]').click();

    // Check for error messages
    cy.contains('Event name is required').should('exist');
    cy.contains('Date is required').should('exist');
    cy.contains('Timezone is required').should('exist');
    cy.contains('Start Time is required').should('exist');
    cy.contains('End Time is required').should('exist');
  });

  it('should show an error if description is too short', () => {
    cy.fixture('event.json').then((data) => {
      const { name, videoLink } = data.valid;

      // Fill in valid data for all required fields except description
      cy.get('[data-cy="event-name"]').type(name);
      cy.get('[placeholder="Select Date(s)..."]').click();
      cy.get('.cypress-test').click(); // Replace with actual selector
      cy.get('[data-cy="event-timezone"]').click();
      cy.get('[data-cy="event-timezone-list"]').first().click();
      cy.get('[data-cy="event-time"]').click();
      cy.get('[data-cy="event-time-list"]').first().click();
      cy.get('[data-cy="event-end-time"]').click();
      cy.get('[data-cy="event-end-time-list"]').first().click();

      // Enter a short description
      cy.get('[data-cy="event-description"]').type('Too short');

      cy.get('[data-cy="event-submit"]').click();

      // Check for the error message related to the description length
      cy.contains('Description must be at least 15 characters long').should(
        'exist'
      );
    });
  });

  it('should submit the form successfully with valid data even if optional fields are empty', () => {
    cy.fixture('event.json').then((data) => {
      const { name, description } = data.valid;

      // Fill in required fields only
      cy.get('[data-cy="event-name"]').type(name);
      cy.get('[placeholder="Select Date(s)..."]').click();
      cy.get('.cypress-test').click(); // Replace with actual selector
      cy.get('[data-cy="event-timezone"]').click();
      cy.get('[data-cy="event-timezone-list"]').first().click();
      cy.get('[data-cy="event-time"]').click();
      cy.get('[data-cy="event-time-list"]').first().click();
      cy.get('[data-cy="event-end-time"]').click();
      cy.get('[data-cy="event-end-time-list"]').first().click();

      cy.get('[data-cy="event-description"]').type(description);

      // Leave video and bannerImage empty
      cy.get('[data-cy="event-submit"]').click();

      // Verify success toast message
      cy.get('[data-cy="event-generated"]').should(
        'contain.text',
        'Emilia Gates'
      );
    });
  });
});
