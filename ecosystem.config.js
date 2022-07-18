require('dotenv').config();

const filePath = './ecosystem.config.js';
const postDeployCommands = [
    'yarn install',
    'yarn build',
    `pm2 start ${filePath} --env production --update-env`,
];

module.exports = {
    apps: [
        {
            name          : 'mwinx',
            script        : './dist/index.js',
            watch         : true,
            ignore_watch  : ['node_modules'],
            env           : { NODE_ENV: 'development' },
            env_production: { NODE_ENV: 'production' },
        },
    ],
    deploy: {
    // "production" is the environment name
        production: {
            key          : process.env.DEPLOY_KEY,
            user         : process.env.DEPLOY_USER,
            host         : [{ host: process.env.DEPLOY_HOST, port: process.env.DEPLOY_PORT }],
            ref          : 'origin/main',
            repo         : 'https://github.com/Alaladdin/mpei-telegram-web-app',
            path         : process.env.DEPLOY_PATH,
            'pre-deploy' : `pm2 stop ${filePath}`,
            'post-deploy': postDeployCommands.join('; '),
        },
    },
};
