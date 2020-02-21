rm -rf ./execFiles/* || \
npx tsc && \
echo 'compile sucessed' && \
mkdir ./execFiles/bin && \
echo 'Have made ./execFiles/bin dir' && \
npx pkg -t node12-macos-x64,node12-linux-x64,node12-win-x64 --out-path ./execFiles/bin/ ./execFiles/index.js && \
echo 'Already packaged' && \
mv ./execFiles/bin/index-macos ./execFiles/bin/ddns && \
rm /usr/local/bin/ddns; \
cp ./execFiles/bin/ddns /usr/local/bin/ddns && \
rm -rf ./execFiles && \
echo 'Install completed try "ddns" to run program'