module.exports = {
    apps: [
      {
        name: "foodflash",
        exec_mode: "cluster",
        instances: "1",
        script: "./src/index.js", // your script
        args: "start",
        env: {
          
        },
      },
    ],
  };