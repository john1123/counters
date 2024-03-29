const app = new Vue({
    el: '#app',
    data: {
        products: []
    },
    computed: {
        totalProducts () {
            return this.products.reduce((sum, product) => {
                return sum + product.quantity
            }, 0)
        }
    },
    created () {
        fetch('https://api.myjson.com/bins/kkp4j')
            .then(response => response.json())
            .then(json => {
                this.products = json.products
            })
    }
})