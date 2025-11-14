describe('Модальные окна ингредиентов', () => {
  describe('Навигация по ингредиентам с главной страницы', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients');
    });

    it('переходит на страницу ингредиента при клике на булку', () => {
      cy.get('[data-cy="ingredient-bun"]').first().click();

      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa093c');
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Краторная булка N-200i').should('exist');
    });

    it('переходит на страницу ингредиента при клике на начинку', () => {
      cy.get('[data-cy="ingredient-main"]').first().click();

      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0941');
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Биокотлета из марсианской Магнолии').should('exist');
    });

    it('переходит на страницу ингредиента при клике на соус', () => {
      cy.get('[data-cy="ingredient-sauce"]').first().click();

      cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0942');
      cy.contains('Детали ингредиента').should('exist');
      cy.contains('Соус Spicy-X').should('exist');
    });
  });

  describe('Возврат со страницы ингредиента', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients');
    });

    it('возвращается на главную страницу через навигацию назад', () => {
      cy.get('[data-cy="ingredient-bun"]').first().click();
      cy.url().should('include', '/ingredients/');

      cy.go('back');
      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('возвращается на главную страницу через кнопку браузера', () => {
      cy.get('[data-cy="ingredient-main"]').first().click();
      cy.url().should('include', '/ingredients/');

      cy.go('back');
      cy.url().should('eq', 'http://localhost:4000/');
      cy.contains('Соберите бургер').should('exist');
    });
  });

  describe('Закрытие модальных окон', () => {
    beforeEach(() => {
      cy.intercept('GET', '**/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
      cy.visit('http://localhost:4000');
      cy.wait('@getIngredients');
    });

    it('закрывает модальное окно ингредиента по клику на крестик', () => {
      cy.get('[data-cy="ingredient-bun"]').first().click();
      cy.get('[data-cy="modal-close"]').click();
      cy.url().should('eq', 'http://localhost:4000/');
    });

    it('закрывает модальное окно ингредиента по клику на оверлей', () => {
      cy.get('[data-cy="ingredient-main"]').first().click();
      cy.get('[data-cy="modal-overlay"]').click({ force: true });
      cy.url().should('eq', 'http://localhost:4000/');
    });
  });
});
