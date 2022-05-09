const Methods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const ValidationsTypes = {
    API: 'api',
    ENDPOINT: 'endpoint',
    IP: 'ip',
    IP_ENDPOINT: 'ipEndpoint'
}

const Apis = {
    'pokemon': {
        path: 'https://pokeapi.co/api/v2',
        cache: 24 * 60 * 60 * 1000,
        rate_limit: {
            api: {
                window: 1 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 1000000
            }, 

            endpoint: {
                window: 1 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 1000000
            }, 

            ip: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            }, 

            ipEndpoint: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            }
        }
    }, 

    'rickandmorty': {
        path: 'https://rickandmortyapi.com/api',
        cache: 24 * 60 * 60 * 1000,
        rate_limit: {
            api: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            },
            
            endpoint: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            }, 

            ip: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            },

            ipEndpoint: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            }
        }
    }, 

    'starwars': {
        path: 'https://swapi.dev/api',
        cache: 24 * 60 * 60 * 1000,
        rate_limit: {
            api: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            },
            
            endpoint: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            }, 

            ip: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            },

            ipEndpoint: {
                window: 24 * 60 * 60 * 1000, // 24 horas en milisegundos
                max: 100
            }
        }
    }
};

module.exports = { Methods, Apis, ValidationsTypes };