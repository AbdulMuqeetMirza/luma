import shippingData from '../fixtures/example.json'
describe('placing a order', () => {

  beforeEach(() =>{
    cy.visit('https://magento.softwaretestingboard.com/')
  })

  it('luma home page header assertions', () => {
    cy.get('.logo > img').should('be.visible')  //logo assertion
    cy.get('#search').should('be.visible')      //searchbar assertion
    cy.get('.showcart').should('be.visible')    //cart button assertion
    cy.get('#ui-id-2').should('be.visible')     //navbar assertion
  })

  it('luma home page listed products assertions', () => {
    cy.get('.content-heading > .title').should('be.visible')  //"hot sellers" heading
    cy.get(':nth-child(1) > .product-item-info').should('be.visible') //listed product 1
    cy.get(':nth-child(2) > .product-item-info').should('be.visible') //listed product 2
    cy.get(':nth-child(1) > .product-item-info > .product-item-photo > .product-image-container > .product-image-wrapper > .product-image-photo').should('be.visible')  //product 1 image
    cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-item-name > .product-item-link').should('be.visible') //product 1 name
    cy.get('#old-price-1556-widget-product-grid > .price')  //product 1 price
    cy.get(':nth-child(1) > .product-item-info > .product-item-details > .product-reviews-summary > .rating-summary > .rating-result').should('be.visible') //product 1 rating
  })

  it('luma home page footer assertions', () => {
    cy.get('.page-footer > .content').should('be.visible')  //footer
    cy.get('.widget > ul > :nth-child(1) > a').should('be.visible') //footer button 1
    cy.get('.widget > ul > :nth-child(2) > a').should('be.visible') //footer button 2
    cy.get('.widget > ul > :nth-child(3) > a').should('be.visible') //footer button 3
  })

  it('order placing', () => {
    cy.get(':nth-child(1) > .product-item-info').click() //product select
    cy.wait(5000)
    cy.get('#option-label-size-143-item-166').click() //size select
    cy.get('#option-label-color-93-item-50').click() //color select
    cy.get('#qty').clear().type('10')   //quantity select
    cy.get('#product-addtocart-button').click() //add to cart
    cy.wait(5000)
    cy.get('.showcart').click()  //access cart
    cy.get('#top-cart-btn-checkout').click()   //click proceed to checkout button
    cy.wait(10000)
    cy.get('#customer-email-fieldset > .required > .control > #customer-email').type(shippingData.email)
    cy.get('[name="firstname"]').type(shippingData.fname)
    cy.get('[name="lastname"]').type(shippingData.lname)
    cy.get('[name="company"]').type(shippingData.company)
    cy.get('[name="street[0]"]').type(shippingData.address)
    cy.get('[name="city"]').type(shippingData.city)
    cy.get('[name="region_id"]').select('Alabama')
    cy.get('[name="postcode"]').type(shippingData.zip)
    cy.get('[name="country_id"]').select('United States')
    cy.get('[name="telephone"]').type(shippingData.phone)
    cy.get(':nth-child(1) > :nth-child(1) > .radio').click()
    cy.get('.button').click()
    cy.wait(5000)
    cy.get('.payment-method-content > :nth-child(4) > div.primary > .action').click()
    cy.wait(5000)
    cy.get('.base').should('be.visible')  //order placed assertion
    cy.get('.checkout-success > .actions-toolbar > div.primary > .action').click()  //continue shopping
    cy.url().should('include','https://magento.softwaretestingboard.com/')  //user is redirected back to homepage

  })

  

})