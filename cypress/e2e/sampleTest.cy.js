describe('Create an invoice and check data correctness', () =>
{
  //define test constants
  const merchantStoreName = 'Demo store'
  const customerName = 'Vlad Zoican'
  const customerEmail = 'vlad_zoican@yahoo.com'
  const billingAddress = 'Drumul Gura Ariesului, number 47-57'
  const city = 'Bucharest'
  const postCode = '032605'
  const state = 'Romania'
  const amount = '123.45'
  const description = 'Random payment'

  beforeEach(() =>
  {
    //cache session info
    cy.login('vlad.zoican90@gmail.com', 'a215Lufw@011')
  })
  it('Sign in on UTrust application', () =>
  {
    //log in
    cy.clearLocalStorage()
    cy.visit('/')
    cy.get('#email')
      .type('vlad.zoican90@gmail.com')
    cy.get('#password')
      .type('a215Lufw@011')
    cy.get('#progress-status').click()
    cy.url().should("contain", "/onboarding/get-started")
  })
  it('Select "Payments"', () =>
  {
    cy.visit("/onboarding/get-started")
    cy.get('.Sidebar_nav__MrTxF li').should('have.length', 4)
    cy.get('.Sidebar_nav__MrTxF li').first().should('have.text', 'Payments')
    cy.get('.Sidebar_nav__MrTxF li').last().should('have.text', 'Settings')

    cy.get('.Sidebar_nav__MrTxF li').first().click()
    cy.url().should("contain", "/payments")
  })
  it('Select "Invoices"', () =>
  {
    cy.visit("/payments")
    cy.get(':nth-child(2) > .Tabs_tab__3Yjya').should('have.text', 'Invoices').as('InvoicesTab')
    cy.get('@InvoicesTab').click()
    cy.url().should("contain", "/payments/invoices")
  })
  it('Select "+ New Invoice"', () =>
  {
    cy.visit("/payments/invoices")
    cy.get('[data-test="button-new-invoice"]').should('have.text', 'New invoice').as('NewInvoice')
    cy.get('@NewInvoice').click()
    cy.url().should("contain", "/payments/invoices/new")
  })
  it('Check that form cannot be submitted without filling in the mandatory fields', () =>
  {
    cy.visit("/payments/invoices/new")
    cy.get('#generate-invoice-button').click()

    cy.get('#customerName-error-message').should('have.text', 'This field is required')
    cy.get('#customerEmail-error-message').should('have.text', 'This field is required')
    cy.get('#billingAddress-error-message').should('have.text', 'This field is required')
    cy.get('#city-error-message').should('have.text', 'This field is required')
    cy.get('#postCode-error-message').should('have.text', 'This field is required')
    cy.get('#country-error-message').should('have.text', 'This field is required')
    cy.get('#currency-error-message').should('have.text', 'This field is required')
    cy.get('#amount-error-message').should('have.text', 'Must be higher than 0')
  })
  it('Check email and amount fields` additional validations', () =>
  {
    cy.visit("/payments/invoices/new")

    cy.get('#customerEmail').type(`invalidEmailAddress`)
    cy.get('#amount').type(`invalidAmount`)
    cy.get('#customerEmail').click()

    cy.get('#customerEmail-error-message').should('have.text', 'Invalid email address')
    cy.get('#amount-error-message').should('have.text', 'Must be a number')
  })
  it('Fill inputs and generate invoice', () =>
  {
    cy.visit("/payments/invoices/new")

    //Fill in Customer Info
    cy.get('#customerName').type(`${customerName}`)
    cy.get('#customerEmail').type(`${customerEmail}`)
    cy.get('#sendIssuedEmail').check().should('be.checked')
    cy.get('#billingAddress').type(`${billingAddress}`)
    cy.get('#city').type(`${city}`)
    cy.get('#postCode').type(`${postCode}`)
    cy.get('#state').type(`${state}`)
    cy.get('#downshift-1-input').click().get('[data-test="option-ROU"]').click()

    //Fill in Payment Info
    cy.get('#downshift-0-input').click().get('[data-test="option-RON"]').click()
    cy.get('#amount').type(`${amount}`)
    cy.get('#description').type(`${description}`)
    cy.get('#generate-invoice-button').click()

    //check that Invoice Info is correct before confirmation
    cy.get('#modal-element').should('be.visible')
    cy.get('.NewInvoiceConfirmationModal_modalBody__2olbI > .Heading_h3__3NZys').should('have.text', 'Invoice confirmation')
    cy.get(':nth-child(1) > :nth-child(2) > .Text_root__1Ipb5').should('have.text', `${customerName}`)
    cy.get(':nth-child(1) > :nth-child(3) > .Text_root__1Ipb5').should('have.text', `${customerEmail}`)
    cy.get(':nth-child(1) > :nth-child(4) > :nth-child(2)').should('have.text', `${billingAddress}`)
    cy.get(':nth-child(4) > :nth-child(3)').should('have.text', (`${postCode} ${city}`))
    cy.get(':nth-child(4) > :nth-child(4)').should('have.text', (`${state}, ${state}`))
    cy.get(':nth-child(2) > :nth-child(2) > .Text_root__1Ipb5').should('have.text', 'RON')
    cy.get(':nth-child(2) > :nth-child(3) > .Text_root__1Ipb5').should('have.text', `${amount}`)
    cy.get(':nth-child(2) > :nth-child(4) > .Text_root__1Ipb5').should('have.text', `${description}`)

    //confirm Invoice creation
    cy.get('[data-test="submit-new-invoice-button"]').click()
    cy.get('.InvoiceSentModal_root__1jglp > .Heading_h3__3NZys').should('have.text', 'Invoice sent')


    cy.get('[data-test="invoice-sent-ok"]').click()
    cy.get('.Heading_h1__9PSvP').should('have.text', 'Invoice details')

    //check invoice data correctness
    cy.get('[data-test="Customer name"] > .Text_root__1Ipb5').should('have.text', `${customerName}`)
    cy.get('[data-test="Customer email"] > .Text_root__1Ipb5').should('have.text', `${customerEmail}`)
    cy.get('.InvoiceDetails_details__18r7y > :nth-child(2) > :nth-child(2)').should('have.text', `${billingAddress}`)
    cy.get('.InvoiceDetails_details__18r7y > :nth-child(2) > :nth-child(3)').should('have.text', (`${postCode} ${city}`))
    cy.get('.InvoiceDetails_details__18r7y > :nth-child(2) > :nth-child(4)').should('have.text', (`${state}, ${state}`))
    cy.get('[data-test="Description "] > .Text_root__1Ipb5').should('have.text', `${description}`)
    cy.get('.AmountStrip_value__3HBgQ').should('have.text', `RON ${amount}`)
  })
  it('Check payment link', function ()
  {
    cy.visit('/payments/invoices')

    //access previously created invoice
    cy.get('.griddle-table-body > :nth-child(1) > :nth-child(1)').click()

    //get the payment link url and access it
    cy.get('.CodeDisplay_text__3U3UO').then(function (link)
    {
      const paymentLink = link.text()
      cy.visit(`${paymentLink}`)

    })
    cy.url().should("contain", "https://payment.sandbox-utrust.com/invoices/")

    //check payment data correctness 
    cy.get('.Details_storeName__3iENh').should('have.text', `${merchantStoreName}`)
    cy.get('.List_root__3LLI7 > div').should('have.text', `${description}`)
    cy.get('.Details_totalFiat__1Dk90').should('have.text', `lei ${amount}`)
  })

})

