ldd --version
curl https://sh.rustup.rs -sSf | sh
npm run build-release
pip3 install boto3
python3 deploy.py index.node hexo-word-counter/bin/nodejs/$(node -e "console.log(require('./package.json').version);")/linux__x64.node
