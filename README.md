## Веб-приложение "ЧАТ"


Ссылка на прототип в фигме https://www.figma.com/file/GdcudTtdkoOazIj4UGwMRI/%D0%9C%D0%B0%D0%BA%D0%B5%D1%82-%D1%87%D0%B0%D1%82%D0%B0?node-id=0%3A1

Ссылка на netify https://lucid-ardinghelli-54263f.netlify.app/

Ссылка на PR https://github.com/EugeniaShimak/middle.messenger.praktikum.yandex/pull/2

Все команды нужно запускать из корня проекта.


Подготовка к запуску:
1) Установите Node
2) Запустите **`npm install`** (установка пакетов используемых в проекте)

Варианты запуска:
1) `npm run start` (запустит  собранное с помощью **parcel** приложение на localhost:3000)
2) `npm run build` - собрать проект в папку **dist**  с помощью **parcel**
3) `npm run server` - запустит express сервер на http://localhost:3000/ с раздачей статических фалов из папки dist( т.е. перед запуском `npm run server` нужно убедиться, что есть папка **dist**, если ее нет - запустите одну из двух команд выше)
