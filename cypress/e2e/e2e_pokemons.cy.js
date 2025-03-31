describe('Покупка аватара для своего тренера', function () {

    it('e2e покупка рандомного аватара для тренера', function () {
         cy.visit('https://pokemonbattle.ru/');
         cy.get('input[type="email"]').type('USER_LOGIN');
         cy.get('input[type="password"]').type('USER_PASSWORD');
         cy.get('button[type="submit"]').click();
         cy.wait(2000);
         cy.get('.header__container > .header__id').click({ force: true });
         cy.wait(2000);
         cy.get('[href="/shop"]').click();

         cy.get('.available > button').then($buttons => {  
            const randomIndex = Math.floor(Math.random() * $buttons.length);  
            cy.wrap($buttons[randomIndex]).click({ force: true });  
          });  
          // выше использовал конструкцию для выбора случайного аватара с классом available

         cy.get('.credit').type('5555 5555 4444 4442');
         cy.get('.k_input_date').type('07/28');
         cy.get('.k_input_ccv').type('125');
         cy.get('.k_input_name').type('KONSTANTIN SHUXTOV');
         cy.get('.pay-btn').click();
         cy.wait(1000);
         cy.get('#cardnumber').type('56456');
         cy.get('.payment__submit-button').click();
         cy.contains('Покупка прошла успешно').should('be.visible');
         
     })

     
})