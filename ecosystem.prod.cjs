module.exports = {
    apps: [
      {
        name: "server",
        script: "bun",
        args: "run serve",
        watch: false,
        autorestart: true,
        restart_delay: 5000,
      },
      {
        name: "app",
        script: "bash",
        args: "sh/prod.sh",
        watch: false,
        autorestart: true,
        restart_delay: 5000,
      },
    ],
  };