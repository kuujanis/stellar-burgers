require('@4tw/cypress-drag-drop')

const testUrl = 'http://localhost:3000'

describe('Constructor tests', function() {
    before(function () {
        cy.visit(testUrl);
    });

    it('should open and close some ingredient', function() {
        cy.get('#sauce > div > [class^="product"]:first-child').click();
        cy.get('[class^="modal_close_button"]').click();
    });
    const firstchild = ' > div > [class^="product"]:first-child'
    const constructor = '[class^="burger-constructor"]'

    it('should make drag-and-drop and click to order', function() {
        cy.get('#bun'+firstchild).drag(constructor);
        cy.get('#main'+firstchild).drag(constructor);
        cy.get('#sauce'+firstchild).drag(constructor);
        cy.get('button').contains('Оформить заказ').click();
        // cy.wait(500);
    });

    it('should login', function() {
        cy.get(':nth-child(2) > .input').type('sasha26x@yandex.ru');
        cy.get(':nth-child(3) > .input').type('ret567yt');
        cy.get('button').contains('Войти').click().as('login');
        // cy.wait(500);
    });

    it('should create order', function() {
        cy.get('button').contains('Оформить заказ', {timeout: 30000}).click()
    });

    it('should get order number', function() {
        cy.get('.text_type_digits-large').then(($orderNumber) => {
            cy.exec('print ' + $orderNumber.text());
        });
    });

});