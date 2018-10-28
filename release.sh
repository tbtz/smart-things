RELEASE_DIR="lib"

if [ ! -d $RELEASE_DIR ]; then
    mkdir $RELEASE_DIR
fi

mkdir "$RELEASE_DIR/webapp"

cp "backend/dist/app.bundle.js" "$RELEASE_DIR/index.js"
cp -r "frontend/dist/." "$RELEASE_DIR/webapp/"

echo "Released under $RELEASE_DIR"