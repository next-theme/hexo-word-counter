#!/bin/sh
# ============================================================== #
# Shell script to autodeploy Hexo & NexT & NexT website source.
# ============================================================== #
PATH=/bin:/sbin:/usr/bin:/usr/sbin:/usr/local/bin:/usr/local/sbin:~/bin:$PATH
export PATH

# https://en.wikipedia.org/wiki/ANSI_escape_code
#red='\033[0;31m'
#green='\033[0;32m'
#brown='\033[0;33m'
#blue='\033[0;34m'
#purple='\033[0;35m'
cyan='\033[0;36m'
#lgray='\033[0;37m'
#dgray='\033[1;30m'
lred='\033[1;31m'
lgreen='\033[1;32m'
yellow='\033[1;33m'
lblue='\033[1;34m'
lpurple='\033[1;35m'
lcyan='\033[1;36m'
white='\033[1;37m'
norm='\033[0m'
bold='\033[1m'

echo
echo "=============================================================="
echo " ${yellow}Checking starting directory structure...${norm}"
echo "=============================================================="
    echo "${lcyan}`pwd`${norm}"
    du -sh
    du -sh *

echo
echo "=============================================================="
echo " ${lgreen}Checking Node.js & NPM version...${norm}"
echo "=============================================================="
    echo "${yellow}Node version:${norm} ${lcyan}`node -v`${norm}"
    echo "${yellow}NPM version:${norm} ${lcyan}`npm -v`${norm}"

echo
echo "=============================================================="
echo " ${lgreen}Installing Hexo & NPM modules...${norm}"
echo "=============================================================="
    rm -rf .tmp-hexo-optimize-test
    git clone https://github.com/hexojs/hexo-theme-unit-test .tmp-hexo-optimize-test
    cd .tmp-hexo-optimize-test
    git submodule add https://github.com/hexojs/hexo-many-posts source/_posts/hexo-many-posts
    git submodule add -f https://github.com/hexojs/hexo-theme-landscape themes/landscape
    npm install --silent

echo
echo "=============================================================="
echo " ${yellow}Checking Hexo version...${norm}"
echo "=============================================================="
    hexo() {
        npx hexo "$@"
    }
    hexo -v
    npm ls --depth 0

echo
echo "=============================================================="
echo " ${lpurple}Generating content for baseline...${norm}"
echo "=============================================================="
    python3 ../test/benchmark.py baseline

echo
echo "=============================================================="
echo " ${lpurple}Generating content for hexo-symbols-count-time...${norm}"
echo "=============================================================="
    ejs=themes/landscape/layout/_partial/article.ejs
    npm install hexo-symbols-count-time
    echo '<%= symbolsCount(post) %>' >> $ejs
    python3 ../test/benchmark.py hexo-symbols-count-time

echo
echo "=============================================================="
echo " ${lpurple}Generating content for hexo-reading-time...${norm}"
echo "=============================================================="
    npm uninstall hexo-symbols-count-time
    npm install hexo-reading-time
    git submodule foreach git reset --hard
    echo '<%= readingTime(post.content) %>' >> $ejs
    python3 ../test/benchmark.py hexo-reading-time

echo
echo "=============================================================="
echo " ${lpurple}Generating content for hexo-wordcount...${norm}"
echo "=============================================================="
    npm uninstall hexo-reading-time
    npm install hexo-wordcount
    git submodule foreach git reset --hard
    echo '<%= wordcount(post.content) %>' >> $ejs
    python3 ../test/benchmark.py hexo-wordcount

echo
echo "=============================================================="
echo " ${lpurple}Generating content for hexo-word-counter...${norm}"
echo "=============================================================="
    npm uninstall hexo-wordcount
    npm install ..
    git submodule foreach git reset --hard
    echo '<%= symbolsCount(post) %>' >> $ejs
    python3 ../test/benchmark.py hexo-word-counter
