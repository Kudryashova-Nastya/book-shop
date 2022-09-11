## Магазин книг
### Тестовое задание для cпециальности Фронтенд-разработчик в "Сферум"
### Кудряшова Анастасия

![image](https://user-images.githubusercontent.com/56070980/189551152-7622637c-ae23-475f-b50c-dc58f095c1e7.png)

__Ссылки__

[Git-репозиторий](https://github.com/Kudryashova-Nastya/book-shop)

[Рабочий проект](http://book-shop.std-953.ist.mospolytech.ru/)

---
__Функциональность__

Разработан интерфейс для книжного магазина. 
На счёту пользователя установлен изначальный баланс в 10 200 ₽, из этой суммы он может закупиться книгами, представленными в списке.
Список хранится на сервере, книги можно добавлять в корзину в любом количестве, под корзиной динамически подсчитывается общая сумма покупки.
У каждой книги в корзине есть кнопка удаления, а также наверху есть кнопка очистки всей корзины.

При нажатии на кнопку *Купить* выводится попап с подтверждением покупки, а после подтверждения следует проверка, хватает ли денег на счёте пользователя.
Если денег не хватает, то выводится сообщение: *«На вашем балансе недостаточно средств для покупки»*.
Если денег хватает, то:
- Уменьшается счёт пользователя на сумму добавленных в корзину книг
- Корзина очищается
- Выводится сообщение: *«Спасибо за покупку»*

Над списком книг размещается блок фильтрации и поиска.
Книги можно фильтровать по категории и сортировать по возрастанию и убыванию цены. Фильтры всегда можно сбросить соответсвующей кнопкой.

Дополнительная функциональность:
- Ввёрстка адаптивна под все устройства
- Хранение состояния на клиенте (состояние корзины и текущий счёт пользователя при перезагрузке страницы или при закрытии браузера не сбрасываются)
- Список категорий книг также получен через API

__Технологии__
- ReactJS
- MobX
- Cookie

__Библиотека стилей__ - [Bootswatch Minty](https://bootswatch.com/minty/)

__Библиотека для хранения состояния на клиенте__ - [mobx-cookie](https://www.npmjs.com/package/mobx-cookie)

__Лоадер__ - [React Spinners](https://www.npmjs.com/package/react-spinners)

---
__Инструкция по локальному запуску__

Для запуска на ПК должны быть установлены: Node.js и Git;

Склонируйте репозиторий
$ git clone https://github.com/Kudryashova-Nastya/book-shop.git

Откройте консоль в папке проекта и поочерёдно введите команды 
$ npm install 
$ npm start
После чего страница проекта откроется в окне браузера по адресу [http://localhost:3000](http://localhost:3000).

