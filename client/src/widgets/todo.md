В папке widgets размещаются виджеты, которые:

    Инкапсулируют собственную логику и UI.
    Могут быть переиспользуемыми на разных страницах.
    Работают с данными и внешними источниками.
widgets
		WeatherWidget/
├── model/
│   ├── weatherSlice.ts     // Redux slice для управления погодой
│   ├── useWeather.ts       // Хук для работы с погодой
│   ├── types.ts            // Типы данных (например, WeatherData)
├── ui/
│   ├── WeatherCard.tsx     // Карточка с данными о погоде
│   ├── WeatherWidget.tsx   // Главный компонент виджета
│   ├── WeatherWidget.module.css // Стили
│   ├── index.ts            // Реэкспорт UI
├── lib/
│   ├── formatWeatherData.ts // Функция форматирования данных
├── index.ts                // Реэкспорт всех частей виджета
