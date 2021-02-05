echo '部署开始'
cd /usr/sun/project/app/ff-demo/packages/ff-music
git reset --hard
git pull
rm -rf dist
npm run build
cp ./dist/music/index.html ./dist
echo '部署结束'