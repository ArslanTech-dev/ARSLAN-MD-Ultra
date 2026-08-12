module.exports = {
  apps: [{
    name: 'arslan-md',
    script: 'index.js',
    watch: false,
    exec_mode: 'fork',
    instances: 1,
    autorestart: true,
  }]
};