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
        const petReq = await fetch(`${host}/bookstore-api/books`, POSTCORS(data));
        const petRes = await petReq.json();
        // console.log(petRes);
        if (petReq.ok) {
            runInAction(() => {
                this.booksInfo = petRes
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
        })
    }

    modalNoBalanceVisible = false
    setNoBalanceVisible = () => {
        runInAction(() => {
            this.modalNoBalanceVisible = true
        })
    }

    bookDelete = ''

    modalDeletePositionVisible = false
    setDeletePositionVisible = (name) => {
        runInAction(() => {
            this.bookDelete = name
            this.modalDeletePositionVisible = true
        })
    }

    modalClearCartVisible = false
    setClearCartVisible = () => {
        runInAction(() => {
            this.modalClearCartVisible = true
        })
    }

    closeModal = () => {
        runInAction(() => {
            this.modalBuyVisible = false
            this.modalNoBalanceVisible = false
            this.modalDeletePositionVisible = false
            this.modalClearCartVisible = false
            this.bookDelete = ''
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
        const petReq = await fetch(`${host}/bookstore-api/books/categories`);
        const petRes = await petReq.json();
        // console.log(petRes);
        if (petReq.ok) {
            runInAction(() => {
                this.categories = petRes
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
