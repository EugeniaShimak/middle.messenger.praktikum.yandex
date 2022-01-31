## Веб-приложение "ЧАТ"

Проект реализован для Яндекс.Практикум

Можно зарегистрироваться/войти, менять инфу пользователя, загружать аватар, создавать чаты, добавлять новых собеседников, переписываться.

Ссылка на прототип в фигме https://www.figma.com/file/GdcudTtdkoOazIj4UGwMRI/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82-%D1%87%D0%B0%D1%82%D0%B0?node-id=0%3A1


Демо:
1) Ссылка на netify https://lucid-ardinghelli-54263f.netlify.app/
2) Ссылка на хероку https://messenger-praktikum458.herokuapp.com/

Ссылка на PR 4 спринта https://github.com/EugeniaShimak/middle.messenger.praktikum.yandex/pull/4
Ссылка на хероку https://messenger-praktikum458.herokuapp.com/

Все команды нужно запускать из корня проекта.


Запустить проект можно просто локально либо в контейнере докера:

Локально:
1) Установите Node
2) Запустите **`npm install`** (установка пакетов используемых в проекте)

Варианты локального запуска:
1) `npm run start` (запустит  собранное с помощью **parcel** приложение на localhost:3000)
2) `npm run build` - собрать проект в папку **dist**  с помощью **parcel**
3) `npm run server` - запустит express сервер на http://localhost:3000/ с раздачей статических фалов из папки dist( т.е. перед запуском `npm run server` нужно убедиться, что есть папка **dist**, если ее нет - запустите одну из двух команд выше)

С помощью докера:
1) Установите докер
2) Запустите команды в корне проекта:
   1) `docker build -t messenger .` - создание контейнера
   2) `docker run -p 3000:3000  -d messenger` - запуск контейнера в фоновом режиме на 3000 порте


Остальные команды
1) Запуск тестов `npm run test`
2) Запуск stylelint `npm run stylelint`
3) Запуск eslint `npm run eslint`

Используемые технологии
- Typescript
- Handlebars
- Express server
- Mocha, Chai
- Stylelint
- Eslint
- Webpack
- Sass
- Docker
