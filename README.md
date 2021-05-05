# textile-gui
Web frontend for querying and interacting with [Textile](https://www.textile.io/) threads and buckets. Aiming to make a simple management interface without needing to use the CLI.

#### Project Stage: Alpha

## Get Started

1. Visit: https://the-digital-labs.github.io/textile-gui/index.html

2. Click on the settings icon in the bottom left. Input your Textile API key + secret and click "save". Your information is saved in your localstorage, we do not collect or send your keys anywhere. The whole app is fully client-side.

For information on how to create a Textile account and get your API keys, visit: https://docs.textile.io/hub/apis/

### Dev Setup

1. `npm i`

2. `npm run dev` 

3. Open `http://localhost:9000` in your browser.

## Features and Roadmap

- Querying threads, buckets, collections and instances in UI. (functional) ✔️
- Dark and Light mode UI. (functional) ✔️
- Editing Instances in Table Row UI. (in progress) 🚧
- Table column filtering. (functional) ✔️
- Search bar. (functional) ✔️
- Adding new instances (functional) ✔️
- Export collections and instances to a JSON file for download. (functional) ✔️
- Edit schemas in the UI. (no progress) ❌
- Delete threads, buckets, collections and instances in UI. (can delete instances) 🚧
- Import JSON files as data. (no progress) ❌
- Upload KEY and SECRET_KEY from UI. Create settings UI to replace `config.js`. (functional) ✔️
- Refactor NextJS out of project into a normal client-side React app. (complete) ✔️

## Technologies

[React](https://reactjs.org/)

[Textile](https://www.textile.io/)

[Ant Design](https://ant.design/)

[Filecoin](https://filecoin.io/)

[IPFS](https://ipfs.io/)

## App UI Example

![cxbvxcvbxcvb](https://user-images.githubusercontent.com/27584221/116507622-748cf680-a874-11eb-8316-090585d65fbc.PNG)

A Free and Open Source project from: [The Digital Labs](https://github.com/the-digital-labs)

