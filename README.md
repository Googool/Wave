# Wave <img align="right" width="100" height="100" src="assets\logo.png">

> [!CAUTION]
> This application is still in development; features may not work as intended, and you may encounter bugs or issues.

# Quickstart 🚀

Get started by cloning the repository and navigating into the project directory:

```bash
git clone https://github.com/Googool/Wave.git
cd Wave
```

## Docker 🐳

To build and run your application inside a Docker container, use the following commands:

```bash
docker build -t wave-discord-bot .
docker run --env-file .env wave-discord-bot
```

Ensure your `.env` file is in the same directory and contains the necessary environment variables (e.g., `CLIENT_ID`, `DISCORD_TOKEN`, `DATABASE_URL`).

## License

The content and software in this [repository](https://github.com/Googool/Wave) are licensed under the [MIT license](https://mit-license.org/).
