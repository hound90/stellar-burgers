describe('Создание заказа', () => {
  beforeEach(() => {
    // Моки для всех необходимых запросов
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('GET', '**/auth/user', { fixture: 'user.json' }).as('getUser');
    cy.intercept('POST', '**/orders', { fixture: 'order.json' }).as('createOrder');
    cy.setCookie('accessToken', 'test-access-token');
    window.localStorage.setItem('refreshToken', 'test-refresh-token');

    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
    cy.wait('@getUser');
  });

  it('успешно создает заказ и очищает конструктор', () => {
    // Добавляем ингредиенты в конструктор
    cy.get('[data-cy="ingredient-bun"]').first().find('button').contains('Добавить').click();
    cy.get('[data-cy="ingredient-main"]').first().find('button').contains('Добавить').click();

    // Проверяем что ингредиенты добавились в конструктор
    cy.get('[data-cy="constructor-top"]').should('contain', 'Краторная булка N-200i');
    cy.get('[data-cy="constructor-middle"]').should('contain', 'Биокотлета из марсианской Магнолии');

    // Нажимаем кнопку оформления заказа
    cy.get('[data-cy="onOrderClick"]').click();

    // Проверяем, что открылось модальное окно с номером заказа
    cy.get('[data-cy="modal"]').should('be.visible');
    cy.get('[data-cy="order-number"]').should('contain', '12345');

    // Закрываем модальное окно
    cy.get('[data-cy="modal-close"]').click();
    cy.get('[data-cy="modal"]').should('not.exist');

    // Проверяем, что конструктор пуст
    cy.get('[data-cy="constructor-top"]').should('contain', 'Выберите булки');
    cy.get('[data-cy="constructor-middle"]').should('contain', 'Выберите начинку');
    cy.get('[data-cy="constructor-bottom"]').should('contain', 'Выберите булки');

    // Дополнительная проверка - что можно снова добавлять ингредиенты
    cy.get('[data-cy="ingredient-bun"]').first().find('button').contains('Добавить').click();
    cy.get('[data-cy="constructor-top"]').should('contain', 'Краторная булка N-200i');
  });
});
