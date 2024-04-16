ldd --version
curl https://sh.rustup.rs -sSf | sh -s -- -y
source "$HOME/.cargo/env"
npm run build-release
npm test
node .github/workflows/deploy.js index.node hexo-word-counter/bin/nodejs/$(node -e "console.log(require('./package.json').version);")/linux__x64.node
