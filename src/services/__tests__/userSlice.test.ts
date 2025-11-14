import userReducer, {
  loginUser,
  registerUser,
  updateUser,
  checkUserAuth,
  logoutUser,
  authChecked,
  clearError
} from '../userSlice';
import { TUser } from '@utils-types';

const mockUser: TUser = {
  email: 'test@example.com',
  name: 'Test User'
};

describe('userSlice', () => {
  it('должен обрабатывать начальное состояние', () => {
    const state = userReducer(undefined, { type: 'unknown' });

    expect(state).toEqual({
      user: null,
      isAuthChecked: false,
      error: null,
      loading: false
    });
  });

  it('должен устанавливать loading при входе пользователя', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(undefined, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('должен сохранять пользователя при успешном входе', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('должен сохранять ошибку при неудачном входе', () => {
    const action = {
      type: loginUser.rejected.type,
      payload: 'Ошибка входа'
    };
    const state = userReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Ошибка входа');
    expect(state.user).toBeNull();
  });

  it('должен сохранять пользователя при успешной регистрации', () => {
    const action = {
      type: registerUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(undefined, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('должен обновлять пользователя при успешном обновлении', () => {
    const initialState = {
      user: { email: 'old@example.com', name: 'Old User' },
      isAuthChecked: true,
      error: null,
      loading: false
    };

    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.error).toBeNull();
  });

  it('должен устанавливать isAuthChecked при проверке авторизации', () => {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(undefined, action);

    expect(state.isAuthChecked).toBe(true);
    expect(state.user).toEqual(mockUser);
    expect(state.loading).toBe(false);
  });

  it('должен очищать пользователя при выходе', () => {
    const initialState = {
      user: mockUser,
      isAuthChecked: true,
      error: null,
      loading: false
    };

    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(initialState, action);

    expect(state.user).toBeNull();
    expect(state.loading).toBe(false);
  });

  it('должен устанавливать authChecked', () => {
    const state = userReducer(undefined, authChecked());
    expect(state.isAuthChecked).toBe(true);
  });

  it('должен очищать ошибку', () => {
    const initialState = {
      user: null,
      isAuthChecked: false,
      error: 'Какая-то ошибка',
      loading: false
    };

    const state = userReducer(initialState, clearError());
    expect(state.error).toBeNull();
  });
});
