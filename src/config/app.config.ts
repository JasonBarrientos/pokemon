export const EnvConfiguration = ()=>({
    enviroment:process.env.NODE_ENV || 'dev',
    mongodb: process.env.MONGODB,
    port: process.env.PORT || '3002',
    defaultlimit: process.env.default_limit || 7
})