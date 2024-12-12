├── features/
│   └── auth/                     # Пример фичи "аутентификация"
│       ├── model/                # Слайсы, селекторы, thunks
│       │   ├── slice.ts          # Redux slice для аутентификации
│       │   ├── selectors.ts      # Селекторы аутентификации
│       │   └── thunks.ts         # Асинхронные действия
│       ├── api/                  # API для фичи (если есть)
│       │   └── authApi.ts
│       ├── ui/                   # Компоненты, относящиеся к фиче
│       │   ├── LoginForm/        
│       │   │   ├── index.tsx     
│       │   │   ├── LoginForm.module.css
│       │   │   └── types.ts      # Локальные типы
│       │   └── ...
│       ├── lib/                  # Вспомогательные функции
│       └── index.ts              # Объединение всех экспортов


//!
src/
├── entities/
│   ├── user/
│   │   ├── model/
│   │   │   ├── userSlice.ts         # Состояние пользователя
│   │   │   ├── selectors.ts         # Селекторы для доступа к данным
│   │   ├── types/
│   │   │   ├── IUser.ts             # Типы данных пользователя
├── features/
│   ├── auth/
│   │   ├── model/
│   │   │   ├── authSlice.ts         # Состояние авторизации
│   │   │   ├── authThunks.ts        # Асинхронные действия
│   │   ├── api/
│   │   │   ├── authApi.ts           # API-запросы
│   │   ├── ui/
│   │   │   ├── LoginForm/
│   │   │   │   ├── index.ts         # Экспорт компонента
│   │   │   │   ├── LoginForm.tsx    # Компонент формы логина
│   │   │   │   ├── styles.module.scss # Стили компонента
│   │   │   ├── RegisterForm/
│   │   │       ├── index.ts         # Экспорт компонента
│   │   │       ├── RegisterForm.tsx # Компонент формы регистрации
├── pages/
│   ├── LoginPage/
│   │   ├── index.ts                 # Экспорт страницы
│   │   ├── LoginPage.tsx            # Страница логина
│   ├── RegisterPage/
│       ├── index.ts                 # Экспорт страницы
│       ├── RegisterPage.tsx         # Страница регистрации
├── shared/
│   ├── api/
│   │   ├── axiosInstance.ts         # Базовый экземпляр axios
│   ├── config/
│   │   ├── apiConfig.ts             # Конфигурация API
│   ├── types/
│   │   ├── AuthResponse.ts          # Типы данных API-ответов
