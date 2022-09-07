import {makeAutoObservable, runInAction, autorun} from "mobx";
import {getHostInformation, POSTCORS} from "./helper";
import Cookie from 'mobx-cookie'

const host = getHostInformation()

class Store {
    constructor() {
        makeAutoObservable(this)

        if (this.cookieBalance.value) {
            this.balance = +this.cookieBalance.value
        }

        autorun(() => {
            this.updateBalanceCookie(this.balance)
        })


        if (this.cookieCart.value) {
            this.cart = JSON.parse(this.cookieCart.value)
            this.setToastCookieVisible(false)
        }

        autorun(() => {
            this.updateCartCookie(this.cart)
        })


        autorun(() => {
            this.setTotalPrice(this.cart.reduce((prev, item) => prev + item.totalPrice, 0))
        })

    }

    // Куки

    cookieBalance = new Cookie('balance')

    updateBalanceCookie = (value) => {
        runInAction(() => {
            this.cookieBalance.set(value, { expires: 2 })
        })
    }

    cookieCart = new Cookie('cart')

    updateCartCookie = (value) => {
        runInAction(() => {
            this.cookieCart.set(JSON.stringify(value), { expires: 2 })
        })
    }

    // Баланс и Итого

    balance = 10200
    totalPriceCart = 0

    setTotalPrice = (newPrice) => {
        runInAction(() => {
            this.totalPriceCart = newPrice
        })
    }

    // Книги

    booksInfo = []

    fetchBooksInfo = async () => {
        this.setLoading(true)
        const data = {
            "filters": this.filters
        }
        try {
            const petReq = await fetch(`${host}/bookstore-api/books`, POSTCORS(data));
            const petRes = await petReq.json();
            // console.log(petRes);
            if (petReq.ok) {
                runInAction(() => {
                    this.booksInfo = petRes
                })
            }
        } catch {
            runInAction(() => {
                this.booksInfo = [
                    {
                        "name": "Отзывчивый веб-дизайн",
                        "authorName": "Итан Маркотт",
                        "price": 349,
                        "coverUrl": "https://cv7.litres.ru/pub/c/elektronnaya-kniga/cover_max1500/3744275-itan-markott-otzyvchivyy-veb-dizayn.jpg",
                        "categoryId": 1
                    },
                    {
                        "name": "Эмоциональный веб-дизайн",
                        "authorName": "Аарон Уолтер",
                        "price": 349,
                        "coverUrl": "https://cv3.litres.ru/pub/c/elektronnaya-kniga/cover_max1500/3744235-aaron-uolter-emocionalnyy-veb-dizayn.jpg",
                        "categoryId": 1
                    },
                    {
                        "name": "Дизайн — это работа",
                        "authorName": "Майк Монтейро",
                        "price": 349,
                        "coverUrl": "https://miro.medium.com/max/1047/1*9f2tnp19YvaMotONlONeJg.jpeg",
                        "categoryId": 1
                    },
                    {
                        "name": "Управление проектами от А до Я",
                        "authorName": "Ричард Ньютон",
                        "price": 675,
                        "coverUrl": "https://cdn1.ozone.ru/s3/multimedia-u/6083509554.jpg",
                        "categoryId": 2
                    },
                    {
                        "name": "Чистый код: создание, анализ и рефакторинг",
                        "authorName": "Роберт Мартин",
                        "price": 700,
                        "coverUrl": "https://mywishboard.com/thumbs/wish/m/q/t/600x0_dslypurveyhxiige_jpg_0e28.jpg",
                        "categoryId": 3
                    },
                    {
                        "name": "Бизнес с нуля",
                        "authorName": "Эрик Рис",
                        "price": 920,
                        "coverUrl": "https://cv5.litres.ru/pub/c/elektronnaya-kniga/cover_max1500/6884055-erik-ris-biznes-s-nulya-metod-lean-startup-dlya-bystrogo-testirovaniya-ide.jpg",
                        "categoryId": 2
                    },
                    {
                        "name": "Идеальный программист",
                        "authorName": "Роберт Мартин",
                        "price": 1020,
                        "coverUrl": "https://knigamir.com/upload/resizer2/10/f71/f7186234317f1c991842337949d3e345.JPG",
                        "categoryId": 3
                    },
                    {
                        "name": "Не заставляйте меня думать",
                        "authorName": "Стив Круг",
                        "price": 1169,
                        "coverUrl": "https://avatars.mds.yandex.net/get-mpic/4331935/img_id1438814894880962860.jpeg/orig",
                        "categoryId": 1
                    },
                    {
                        "name": "Как пасти котов",
                        "authorName": "Дж.Ханк Рейнвотер",
                        "price": 1207,
                        "coverUrl": "https://cdn1.ozone.ru/multimedia/1024486505.jpg",
                        "categoryId": 2
                    },
                    {
                        "name": "Пять пороков команды",
                        "authorName": "Патрик Ленсиони",
                        "price": 1649,
                        "coverUrl": "https://www.combook.ru/imgrab/0073/9785001951865.jpg",
                        "categoryId": 2
                    },
                    {
                        "name": "Совершенный код",
                        "authorName": "Стив Макконнелл",
                        "price": 1787,
                        "coverUrl": "https://cdn1.ozone.ru/multimedia/1020973362.jpg",
                        "categoryId": 3
                    },
                    {
                        "name": "Scrum. Революционный метод управления проектами",
                        "authorName": "Джефф Сазерленд",
                        "price": 1937,
                        "coverUrl": "https://bookprose.ru/pictures/1016752146.jpg",
                        "categoryId": 2
                    },
                    {
                        "name": "Модульные системы в графическом дизайне",
                        "authorName": "Йозеф Мюллер-Брокманн",
                        "price": 2048,
                        "coverUrl": "https://cdn1.ozone.ru/multimedia/1023267350.jpg",
                        "categoryId": 1
                    },
                    {
                        "name": "Deadline. Роман об управлении проектами",
                        "authorName": "Том Демарко",
                        "price": 2448,
                        "coverUrl": "https://main-cdn.sbermegamarket.ru/big2/hlr-system/174826385/100024719491b1.jpg",
                        "categoryId": 2
                    },
                    {
                        "name": "Код: тайный язык информатики",
                        "authorName": "Чарльз Петцольд",
                        "price": 2479,
                        "coverUrl": "https://khanin.info/uploads/20140921/code.jpg",
                        "categoryId": 3
                    },
                    {
                        "name": "Программист-прагматик",
                        "authorName": "Дэвид Томас, Эндрю Хант",
                        "price": 3495,
                        "coverUrl": "https://cdn1.ozone.ru/multimedia/1013930687.jpg",
                        "categoryId": 3
                    },
                    {
                        "name": "Шаблоны корпоративных приложений",
                        "authorName": "Мартин Фаулер",
                        "price": 4295,
                        "coverUrl": "https://assets.htmlacademy.ru/content/blog/377/3@1x.jpg",
                        "categoryId": 3
                    },
                    {
                        "name": "Рефакторинг. Улучшение проекта, существующего кода",
                        "authorName": "Мартин Фаулер",
                        "price": 7125,
                        "coverUrl": "https://www.ukazka.ru/img/g/uk272988.jpg",
                        "categoryId": 3
                    },
                    {
                        "name": "Алгоритмы. Построение и анализ",
                        "authorName": "Томас Кормен, Чарльз Лейзерсон, Рональд Ривест, Клиффорд Штайн",
                        "price": 16875,
                        "coverUrl": "https://cdn1.ozone.ru/multimedia/1026535643.jpg",
                        "categoryId": 3
                    }
                ]
            })
        }

        this.setLoading(false)
    }

    // Корзина

    cart = []

    addBookToCart = (name, price) => {
        const bookInCart = this.cart.find(item => item.name === name);
        runInAction(() => {
            if (bookInCart) {
                this.cart = this.cart.map((position) => {
                        if (position.name === name) {
                            return {
                                ...position,
                                price: price,
                                count: ++position.count,
                                totalPrice: position.count * price
                            }
                        }
                        return position
                    }
                )
            } else {
                this.cart.push({
                    name: name,
                    price: price,
                    totalPrice: price,
                    count: 1
                })
                // autorun не реагирует на push, поэтому добавляем изменения в куки вручную
                this.updateCartCookie(this.cart)
            }
            // console.log(JSON.stringify(this.cart))
        })
    }


    plus = (name) => {
        runInAction(() => {
            this.cart = this.cart.map((position) => {
                    if (position.name === name) {
                        return {
                            ...position,
                            count: ++position.count,
                            totalPrice: position.count * position.price
                        }
                    }
                    return position
                }
            )
        })
    }

    minus = (name) => {
        runInAction(() => {
            this.cart = this.cart.map((position) => {
                    if (position.name === name) {
                        const currentCount = position.count - 1 < 1 ? 1 : position.count - 1
                        return {
                            ...position,
                            count: currentCount,
                            totalPrice: currentCount * position.price
                        }
                    }
                    return position
                }
            )
        })
    }

    changeCount = (name, count) => {
        runInAction(() => {
            this.cart = this.cart.map((position) => {
                    if (position.name === name) {
                        const currentCount = count < 1 ? 1 : count
                        return {
                            ...position,
                            count: currentCount,
                            totalPrice: currentCount * position.price
                        }
                    }
                    return position
                }
            )
        })
    }

    deleteBookFromCart = () => {
        this.cart = this.cart.filter((position) => position.name !== this.bookDelete)
        this.closeModal()
    }

    buyBooks = () => {
        const currentBalance = this.balance - this.totalPriceCart
        if (currentBalance > 0) {
            runInAction(() => {
                this.balance = currentBalance
                this.cart = []
                this.setToastOkVisible(true)
            })
            this.closeModal()
        } else {
            this.closeModal()
            this.setNoBalanceVisible()
        }
    }

    clearCart = () => {
        runInAction(() => {
            this.cart = []
        })
        this.closeModal()
    }

    // Модальные окна

    modalBuyVisible = false
    setBuyVisible = () => {
        runInAction(() => {
            this.modalBuyVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    modalNoBalanceVisible = false
    setNoBalanceVisible = () => {
        runInAction(() => {
            this.modalNoBalanceVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    bookDelete = ''

    modalDeletePositionVisible = false
    setDeletePositionVisible = (name) => {
        runInAction(() => {
            this.bookDelete = name
            this.modalDeletePositionVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    modalClearCartVisible = false
    setClearCartVisible = () => {
        runInAction(() => {
            this.modalClearCartVisible = true
            document.body.style.overflow = 'hidden';
        })
    }

    closeModal = () => {
        runInAction(() => {
            this.modalBuyVisible = false
            this.modalNoBalanceVisible = false
            this.modalDeletePositionVisible = false
            this.modalClearCartVisible = false
            this.bookDelete = ''
            document.body.style.overflow = 'unset';
        })
    }

    // Тосты

    ToastCookieVisible = true
    setToastCookieVisible = (bool) => {
        runInAction(() => {
            this.ToastCookieVisible = bool
        })
    }

    ToastOkVisible = false
    setToastOkVisible = (bool) => {
        runInAction(() => {
            this.ToastOkVisible = bool
        })
    }

    // Лоадер

    isLoading = true
    setLoading = (bool) => {
        runInAction(() => {
            this.isLoading = bool
        })
    }

    // Фильтры

    filters = {sortPrice: "ASC"}
    categories = []

    fetchCategories = async () => {
        try {
            const petReq = await fetch(`${host}/bookstore-api/books/categories`);
            const petRes = await petReq.json();
            if (petReq.ok) {
                runInAction(() => {
                    this.categories = petRes
                })
            }
        } catch {
            runInAction(() => {
                this.categories = [
                    {
                        "id": 1,
                        "name": "Дизайн"
                    },
                    {
                        "id": 2,
                        "name": "Управление проектами"
                    },
                    {
                        "id": 3,
                        "name": "Разработка"
                    },
                    {
                        "id": 4,
                        "name": "Тестирование"
                    }
                ]
            })
        }
    }

    toggleSort = () => {
        runInAction(() => {
            if (this.filters.sortPrice === "ASC") {
                this.filters.sortPrice = "DESC"
            } else {
                this.filters.sortPrice = "ASC"
            }
        })
        void this.fetchBooksInfo()
    }

    setSearchReq = (req) => {
        runInAction(() => {
            this.filters.search = req
            this.searchValue = req
        })
        void this.fetchBooksInfo()
    }

    categoryName = null

    setCategory = (id) => {
        runInAction(() => {
            this.filters.categoryId = id
            this.categoryName = this.findCategoryName(id)
        })
        void this.fetchBooksInfo()
    }

    findCategoryName = (id) => {
        const categoryItem = this.categories.find(item => item.id === id);
        return (categoryItem?.name)
    }

    searchValue = ''

    clearFilters = () => {
        runInAction(() => {
            this.filters = {sortPrice: "ASC"}
            this.categoryName = null
            this.searchValue = ''
        })
        void this.fetchBooksInfo()
    }

}

export default new Store()
