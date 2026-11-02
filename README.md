# My Mobile Showcase

I am looking to create a Portfolio website for myself as a Mobile developer, I also have three videos to share that are too large to share right now but these are demos of my previous projects. I want this website to use the colors I have shown in my VSCode window screenshot.

## Preview locally (before committing)

Run one command from the project folder:

```sh
./preview.sh
```

It installs dependencies the first time, starts the site on your computer, and opens your browser at `http://localhost:8080/`. Edit any file and the page updates instantly. Press `Ctrl+C` in that terminal to stop it.

`npm run preview:local` does the same thing.

This preview never touches git: it does not commit, push, or deploy, so nothing you see locally reaches your live domain until you decide to commit and push.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

That starts the same local server without opening the browser.
