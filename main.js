var game = new Phaser.Game('100%', '100%', Phaser.AUTO);
game.transparent = true;

var gameState = {};

const VELOCITY_GROUND = 15,
      VELOCITY_BACKGROUND = 0.4,
      VELOCITY_LITTLE_CLOUD = 0.9,
      VELOCITY_AVERAGE_CLOUD = 0.7,
      VELOCITY_BIG_CLOUD = 0.5;

// On crée un objet "load" à notre objet gameState
gameState.load = function() { };
// Cet objet load va contenir des méthodes par défaut de Phaser
// Il va nous permettre de charger nos ressources avant de lancer le jeu
gameState.load.prototype = {
	preload: function() {
		// Méthode qui sera appelée pour charger les ressources
		// Contiendra les ressources à charger (images, sons et JSON)

		// Bout de code qui va permettre au jeu de se redimensionner selon la taille de l'écran
		this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();

		window.addEventListener('resize', function () {
			this.game.scale.refresh();
		});

		this.game.scale.refresh();

    // background
		this.game.load.image('background', 'img/background.png');

    // bin
    this.game.load.image('bin', 'img/poubelle.png');

    // car
    this.game.load.image('car1', 'img/car1.png');
    this.game.load.image('car2', 'img/car2.png');

    // pompe
    this.game.load.image('pompe', 'img/pompe.png');

    // ground
    this.game.load.image('ground', 'img/ground2.png');

    // nuage
    this.game.load.image('little-cloud', 'img/petit-nuages.png');
    this.game.load.image('average-cloud', 'img/moyen-nuages.png');
    this.game.load.image('big-cloud', 'img/gros-nuages.png');

    // bus
    this.game.load.image('bus', 'img/bus.png');

    // roue1
    this.game.load.image('roue1', 'img/roue2.png');

    // roue2
    this.game.load.image('roue2', 'img/roue2.png');

	},

	create: function() {
		// Est appelée après la méthode "preload" afin d'appeler l'état "main" de notre jeu
    game.state.start('main');

	}
};

// va contenir le coeur du jeu
gameState.main = function() { };
gameState.main.prototype = {
	create: function() {

    // GAME PARAMS
    let gameHeight = this.game.height,
        gameWidth = this.game.width;


    // BACKGROUND INIT
    this.background = this.game.add.tileSprite(0, -30,gameWidth, gameHeight, 'background');
		this.background.height = gameHeight;


    // BUS INIT
    this.bus = this.game.add.sprite(gameWidth-600, gameHeight-270, 'bus');

    // CLOUD INIT
    this.bigCloud = this.game.add.tileSprite(0, 0, gameWidth, 353, 'big-cloud');
    this.averageCloud = this.game.add.tileSprite(0, 0, gameWidth, 184, 'average-cloud');
    this.littleCloud = this.game.add.tileSprite(0, 0, gameWidth, 376, 'little-cloud');

    this.roue1 = this.game.add.sprite(gameWidth-465, gameHeight-55, 'roue1');
    this.roue2 = this.game.add.sprite(gameWidth-150, gameHeight-55, 'roue2');
    this.roue1.anchor.setTo(0.5, 0.5);
    this.roue2.anchor.setTo(0.5, 0.5);

    // GROUND INIT
    this.ground = this.game.add.tileSprite(0, gameHeight-15, gameWidth, 30, 'ground');

    // BIN INIT
    this.bin1 = this.game.add.sprite(200, gameHeight-80, 'bin');
    this.bin2 = this.game.add.sprite(1200, gameHeight-80,'bin');

    // POMPE INIT
    this.pompe1 = this.game.add.sprite(400,gameHeight-80, 'pompe' );
    this.pompe2 = this.game.add.sprite(800,gameHeight-80, 'pompe' );

	},

	update: function() {
		// Boucle principale du jeu (détection de collisions, déplacement du personnage...)
    this.littleCloud.tilePosition.x -= VELOCITY_LITTLE_CLOUD;
    this.averageCloud.tilePosition.x -= VELOCITY_AVERAGE_CLOUD;
    this.bigCloud.tilePosition.x -= VELOCITY_BIG_CLOUD;
    this.background.tilePosition.x -= VELOCITY_BACKGROUND;
    this.ground.tilePosition.x -= VELOCITY_GROUND;
    this.bin1.x -= VELOCITY_GROUND;
    this.bin2.x -= VELOCITY_GROUND;
    this.pompe1.x -= VELOCITY_GROUND;
    this.pompe2.x -= VELOCITY_GROUND;

    this.update_bin_position( this.bin1 );
    this.update_bin_position( this.bin2 );
    this.update_bin_position( this.pompe1 );
    this.update_bin_position( this.pompe2 );


    this.roue1.angle += VELOCITY_GROUND;
    this.roue2.angle += VELOCITY_GROUND;
	},

  get_random_int_inclusive :function (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;
  },

  update_bin_position: function( bin ){

    if( bin.x <= ( 0 - bin.width )){

        bin.x += this.game.width + bin.width + this.get_random_int_inclusive(100, 1000);

    }

  }

};

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);

game.state.start('load');
