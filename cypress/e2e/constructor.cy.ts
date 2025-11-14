describe('Конструктор бургеров', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.visit('http://localhost:4000');
    cy.wait('@getIngredients');
  });

  describe('Добавление ингредиентов в конструктор', () => {
    it('добавляет булку, начинку и соус в конструктор', () => {
      // Добавляем булку
      cy.get('[data-cy="ingredient-bun"]').first().find('button').contains('Добавить').click();
      cy.get('[data-cy="constructor-top"]').should('contain', 'Краторная булка N-200i');
      cy.get('[data-cy="constructor-bottom"]').should('contain', 'Краторная булка N-200i');

      // Добавляем начинку
      cy.get('[data-cy="ingredient-main"]').first().find('button').contains('Добавить').click();
      cy.get('[data-cy="constructor-middle"]').should('contain', 'Биокотлета из марсианской Магнолии');

      // Добавляем соус
      cy.get('[data-cy="ingredient-sauce"]').first().find('button').contains('Добавить').click();
      cy.get('[data-cy="constructor-middle"]').should('contain', 'Соус Spicy-X');
    });

    it('активирует кнопку оформления заказа при добавлении ингредиентов', () => {
      // Добавляем минимальный набор ингредиентов
      cy.get('[data-cy="ingredient-bun"]').first().find('button').contains('Добавить').click();
      cy.get('[data-cy="ingredient-main"]').first().find('button').contains('Добавить').click();
      cy.get('[data-cy="ingredient-sauce"]').first().find('button').contains('Добавить').click();

      // Кнопка должна быть доступна
      cy.get('[data-cy="onOrderClick"]').should('be.enabled');
    });

    it('перенаправляет на логин при клике без авторизации', () => {
      // Удаляем токены
      cy.clearCookie('accessToken');
      window.localStorage.removeItem('refreshToken');

      // Перезагружаем страницу
      cy.reload();
      cy.wait('@getIngredients');

      // Добавляем ингредиенты
      cy.get('[data-cy="ingredient-bun"]').first().find('button').contains('Добавить').click();
      cy.get('[data-cy="ingredient-main"]').first().find('button').contains('Добавить').click();

      // Нажимаем кнопку оформления заказа
      cy.get('[data-cy="onOrderClick"]').click();

      // Должны быть перенаправлены на страницу логина
      cy.url().should('include', '/login');
    });
  });
});
