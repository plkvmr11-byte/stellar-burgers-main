import { useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate
} from 'react-router-dom';

import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';

import {
  AppHeader,
  IngredientDetails,
  Modal,
  OrderInfo,
  ProtectedRoute
} from '@components';

import { Preloader } from '@ui';

import { useDispatch, useSelector } from '../../services/store';

import { getIngredients } from '../../services/slices/ingredientsSlice';
import { checkUserAuth } from '../../services/slices/authSlice';

import {
  selectIngredients,
  selectIngredientsError,
  selectIngredientsLoading
} from '../../services/selectors/ingredientsSelectors';

import '../../index.css';
import styles from './app.module.css';

const App = (): React.JSX.Element => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const backgroundLocation = location.state?.background;

  const ingredients = useSelector(selectIngredients);
  const isIngredientsLoading = useSelector(
    selectIngredientsLoading
  );
  const ingredientsError = useSelector(
    selectIngredientsError
  );

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const handleModalClose = (): void => {
    navigate(-1);
  };

  return (
    <div className={styles.app}>
      <AppHeader />

      <Routes location={backgroundLocation || location}>
        <Route
          path="/"
          element={
            isIngredientsLoading ? (
              <Preloader />
            ) : ingredientsError ? (
              <p
                className={`${styles.message} text text_type_main-medium`}
              >
                Не удалось загрузить ингредиенты: {ingredientsError}
              </p>
            ) : ingredients.length > 0 ? (
              <ConstructorPage />
            ) : (
              <p
                className={`${styles.message} text text_type_main-medium`}
              >
                Нет ингредиентов
              </p>
            )
          }
        />

        <Route path="/feed" element={<Feed />} />

        <Route
          path="/login"
          element={
            <ProtectedRoute onlyUnAuth>
              <Login />
            </ProtectedRoute>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedRoute onlyUnAuth>
              <Register />
            </ProtectedRoute>
          }
        />

        <Route
          path="/forgot-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ForgotPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/reset-password"
          element={
            <ProtectedRoute onlyUnAuth>
              <ResetPassword />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/orders"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />

        <Route
          path="/ingredients/:id"
          element={
            <div className={styles.detailPageWrap}>
              <p
                className={`text text_type_main-large ${styles.detailHeader}`}
              >
                Детали ингредиента
              </p>
              <IngredientDetails />
            </div>
          }
        />

        <Route
          path="/feed/:number"
          element={<OrderInfo />}
        />

        <Route
          path="/profile/orders/:number"
          element={
            <ProtectedRoute>
              <OrderInfo />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound404 />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path="/ingredients/:id"
            element={
              <Modal
                title="Детали ингредиента"
                onClose={handleModalClose}
              >
                <IngredientDetails />
              </Modal>
            }
          />

          <Route
            path="/feed/:number"
            element={
              <Modal
                title=""
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />

          <Route
            path="/profile/orders/:number"
            element={
              <ProtectedRoute>
                <Modal
                  title=""
                  onClose={handleModalClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRoute>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App; 