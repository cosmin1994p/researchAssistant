module.exports = {
    apps: [{
      name: "research-assistant-ui",
      script: "server.js",
      env: {
        NODE_ENV: "production",
      },
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "1G",
    }]
  }