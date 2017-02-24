(function() {
    var TILE_HEIGHT = 821;
    var TILE_WIDTH = 591;
    var TILE_SCALE = 20;
    var TILE_SPACING = 40/TILE_SCALE;
    /**
     * Set up Pixi.js
     */
    var renderer = PIXI.autoDetectRenderer(660, 500, {backgroundColor: 0x34495e});
    document.body.appendChild(renderer.view);

    // Create the stage
    var stage = new PIXI.Container();

    // Create textures from our images
    var selected = PIXI.Texture.fromImage('images/selected.png');
    var blank = PIXI.Texture.fromImage('images/blank.png');
    var clicked = PIXI.Texture.fromImage('images/clicked.png');

    var newTile = function(x, y) {
        // Create our goose with the gooseIdle texture
        var tile = new PIXI.Sprite(blank);
        tile.scale.x /= TILE_SCALE;
        tile.scale.y /= TILE_SCALE;

        // Center the anchor and place in the center of our stage
        tile.anchor.x = 0.5;
        tile.anchor.y = 0.5;
        tile.position.x = x;
        tile.position.y = y;

        // Make the goose interactive
        tile.interactive = true;

        var onEnter = function() {
            this.texture = selected;
        };
        var onExit = function() {
            this.texture = blank;
        };
        var onClick = function() {
            this.texture = clicked;
        };

        // Set interactions on the tile
        tile 
            .on('mouseover', onEnter)
            .on('mouseout', onExit)
            .on('mouseup', onClick);

        return tile;
    }

    for (var i = 0; i < renderer.width / (TILE_WIDTH/TILE_SCALE) + 1; i++) {
        for (var j = 0; j < renderer.height / ((TILE_HEIGHT/TILE_SCALE)*(TILE_WIDTH/TILE_HEIGHT)) + 1; j++) {
            var x = i * TILE_WIDTH/TILE_SCALE + TILE_SPACING * i;
            if (j%2==0) {
                x += TILE_WIDTH/TILE_SCALE/2;
            }
            var y = j * (TILE_HEIGHT/TILE_SCALE)*TILE_WIDTH/TILE_HEIGHT + TILE_SPACING * j;
            var tile = newTile(x, y);
            stage.addChild(tile);
        }
    }

    animate();

    function animate() {
        // Render the stage
        renderer.render(stage);
        requestAnimationFrame(animate);
    }

    /**
     * Add some more functions here.
     */
})();
