# textile-gui
Web frontend for querying and interacting with Textile threads and buckets. Aiming to make a simple management interface without needing to use the CLI.

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
