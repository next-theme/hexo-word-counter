ldd --version
curl https://sh.rustup.rs -sSf | sh -s -- -y
source "$HOME/.cargo/env"
npm run build-release
npm test
python3 -m pip install boto3
python3 .github/workflows/deploy.py index.node hexo-word-counter/bin/nodejs/$(node -e "console.log(require('./package.json').version);")/linux__x64.node
