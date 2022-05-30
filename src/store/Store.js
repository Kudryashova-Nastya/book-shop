import {makeAutoObservable, runInAction, autorun} from "mobx";
import {getHostInformation, POSTCORS} from "./helper";

const host = getHostInformation()

class Store {
    constructor() {
        makeAutoObservable(this)

        autorun(() => {
            this.setTotalPrice(this.cart.reduce((prev, item) => prev + item.totalPrice, 0))
        })
    }

    balance = 10200
    totalPriceCart = 0

    setTotalPrice = (newPrice) => {
        runInAction(() => {
            this.totalPriceCart = newPrice
        })
    }

    buyBooks = () => {
        const currentBalance = this.balance - this.totalPriceCart
        if (currentBalance > 0) {
            runInAction(() => {
                this.balance = currentBalance
                this.cart = []
            })
            this.closeModal()
        } else {
            this.closeModal()
            this.setNoBalanceVisible()
        }

    }


    booksInfo = null

    fetchBooksInfo = async (filters) => {
        const data = {
            "filters": filters
        }
        const petReq = await fetch(`${host}/bookstore-api/books`, POSTCORS(data));
        const petRes = await petReq.json();
        console.log(petRes);
        if (petReq.ok) {
            runInAction(() => {
                this.booksInfo = petRes
            })
        }
    }

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
                                totalPrice: ++position.count * price
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
                            totalPrice: ++position.count * position.price
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
                        return {
                            ...position,
                            count: count,
                            totalPrice: count * position.price
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

    closeModal = () => {
        runInAction(() => {
            this.modalBuyVisible = false
            this.modalNoBalanceVisible = false
            this.modalDeletePositionVisible = false
            this.bookDelete = ''
        })
    }
}

export default new Store()
