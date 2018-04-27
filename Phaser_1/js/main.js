var config = {
    type:Pahser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y: 500},
            debug: false
        }
    },
    scene: {
        key: 'main',
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

var map;
var player;
var cursors;
var groundLayer, coinLayer;
var text;
var score = 0;

function preload() {
    this.load.tilemapTiledJSON('map', 'assets/map.json');
    
    this.load.spritesheet('tiles', 'assets/tiles.png', {frameWidth: 70, frameHeight: 70});
    
    this.load.image('coins', 'assets/coinGold.png');
    
    this.load.atlas('player', 'assets/player.png', 'assets/player.json');
}

function create() {
    map = thi.make.tilemap({key: 'map'});
    
    var groundTiles = map.addTilesetImage('tiles');
    
    groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
    
    groundLayer.setCollisionByExclusion([-1]);
    
    var coinTiles = map.addTilesetImage('coin');
    
    coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);
    
    this.physics.world.bounds.width =groundLayer.width;
    this.physics.world.bounds.height =groundLayer.height;
    
    player = this.physics.add.sprite(200, 200, 'player');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);
    
    player.body.setSize(player.width, player.height-8);
    
    this.physics.add.collider(groundLayer, player);
    
    coinLayer.setTileIndexCallback(17, collectcoin, this);
    
    this.physics.add.overlap(player, coinLayer)
    
    this.anims.create({
        key: 'walk',
        frames: this.anims.generateFrameNames('player', [prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2]),
        frameRate: 10,
        repeat: -1
    });
    
    this.anims.create({
        key: 'idle',
        frames: [{key: 'player', frame: 'p1_stand'}],
        frameRate: 10,
    });
    
    cursors = this.input.keyboard.createCursorKeys();
    
    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    
    this.cameras.main.startFollow(player);
    
    this.cameras.setBackgroundColor('#ccccff');
    
    text = this.add.text(20, 570, '0',{
        frontSize: '20px',
        fill: '#fffffff'
    });
    
    text.setScrollFactor(0);
}






































