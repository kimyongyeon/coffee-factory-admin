const environment = {
    local: {
        host: 'localhost',
        port: '8888',
        api: function() {
            return `http://${this.host}:${this.port}/api`;
        }
    },
    dev: {
        host: 'dev-coffee-oda.shop',
        port: '4000',
        api: function() {
            return `http://${this.host}:${this.port}/api`;
        }
    },
    stg: {
        host: 'stg-coffee-oda.shop',
        port: '5000',
        api: function() {
            return `http://${this.host}:${this.port}/api`;
        }
    },
    prd: {
        host: 'coffee-oda.shop',
        port: '3000',
        api: function() {
            return `http://${this.host}:${this.port}/api`;
        }
    } 

}

export default environment;