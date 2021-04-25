# textile-gui
Web frontend for querying and interacting with [Textile](https://www.textile.io/) threads and buckets. Aiming to make a simple management interface without needing to use the CLI.

#### Project Stage: Alpha

## Get Started

1. Create a `config.js` file inside the root directory.

Add your Textile Hub API key and secret to the `config.js` file. 

Example `config.js`:
```
export const HUB_KEY = "yourkeyhere";
export const HUB_SECRET = "yoursecretkeyhere";
export const DARK_MODE = true; // toggle for light / dark mode UI.
```

For information on how to create a Textile account and get your API keys, visit: https://docs.textile.io/hub/apis/

Remember these keys are private, so do not commit your `config.js` to a public repository!

2. Run: `npm run dev` in your terminal to start the [NextJS](https://nextjs.org/) webserver.

3. Open: `http://localhost:3000` in your browser.

## Features and Roadmap

- Querying threads, buckets, collections and instances in UI. (functional) ✔️
- Dark and Light mode UI. (functional) ✔️
- Editing Instances in Table Row UI. (in progress) 🚧
- Table column filtering. (functional) ✔️
- Search bar. (no progress) ❌
- Export collections and instances to a JSON file for download. (no progress) ❌
- Edit schemas in the UI. (no progress) ❌
- Delete threads, buckets, collections and instances in UI. (no progress) ❌
- Import JSON files as data. (no progress) ❌
- Upload KEY and SECRET_KEY from UI. Create settings UI to replace `config.js`. (no progress) ❌

## Technologies

[NextJS](https://nextjs.org/)

[React](https://reactjs.org/)

[Textile](https://www.textile.io/)

[Ant Design](https://ant.design/)

[Filecoin](https://filecoin.io/)

[IPFS](https://ipfs.io/)

## App UI Example

![ui](https://user-images.githubusercontent.com/27584221/115983138-00f69b00-a58f-11eb-90cf-c56daab970ab.png)


A Free and Open Source project from: [The Digital Labs](https://github.com/the-digital-labs)

