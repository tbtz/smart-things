RELEASE_DIR="bin"

if [ ! -d $RELEASE_DIR ]; then
    mkdir $RELEASE_DIR
fi

mkdir "$RELEASE_DIR/webapp"

cp "backend/dist/app.bundle.js" "$RELEASE_DIR/index.js"
cp -r "frontend/dist/." "$RELEASE_DIR/webapp/"
cp "smart-things.js" $RELEASE_DIR

echo "Released under $RELEASE_DIR"