import * as main_page from "../locators/main_page.json";
import * as recovery_password_page from "../locators/recovery_password_page.json"
import * as result_page from "../locators/result_page.json"

describe('Проверка авторизации', function () {
// Использую beforeEach чтобы не прописывать ссылку руками каждый раз
    beforeEach('Начало теста', function () {
        cy.visit('/'); // ссылка лежит в фале cypress.config.js, поэтому так обозначаем
          });

// Использую afterEach чтобы всегда проверять наличие крестика на результирующей странице (эта проверка есть почти в каждом автотесте)
    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible');
       });

    it('Позитивный кейс авторизации', function () {
         cy.get(main_page.email).type('german@dolnikov.ru');
         cy.get(main_page.password).type('iLoveqastudio1');
         cy.get(main_page.login_button).click();
         cy.get(result_page.title).contains('Авторизация прошла успешно');
     })

     it('Восстановление пароля', function () {
        cy.get(main_page.fogot_pass_btn).click();
        cy.get(recovery_password_page.email).type('shuxtovk@yandex.ru');
        cy.get(recovery_password_page.send_button).click();
        cy.get(result_page.title).contains('Успешно отправили пароль на e-mail');
    })

    it('Негативный кейс авторизации: Неправильный пароль', function () {
        cy.get(main_page.email).type('german@dolnikov.ru');
        cy.get(main_page.password).type('iLoveqaKKKKKKstudio1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Негативный кейс авторизации: Неправильный логин', function () {
        cy.get(main_page.email).type('banan@ya.ru');
        cy.get(main_page.password).type('iLoveqastudio1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Такого логина или пароля нет');
    })

    it('Негативный кейс валидации', function () {
        cy.get(main_page.email).type('germandolnikov.ru');
        cy.get(main_page.password).type('iLoveqastudio1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Нужно исправить проблему валидации');
    })

    it('Приведение к строчным буквам в логине', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru');
        cy.get(main_page.password).type('iLoveqastudio1');
        cy.get(main_page.login_button).click();
        cy.get(result_page.title).contains('Авторизация прошла успешно');
    })


})