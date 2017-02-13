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

    // trap
    this.game.load.image('trap1', 'img/trap1.png');
    this.game.load.image('trap2', 'img/trap2.png');
    // bus
    this.game.load.image('bus', 'img/bus.png');

    // roue1
    this.game.load.image('roue1', 'img/roue2.png');

    // roue2
    this.game.load.image('roue2', 'img/roue2.png');

    this.game.load.spritesheet('player', 'img/scottpilgrim_multiple.png', 108, 120);

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

    // TRAP INIT
    this.trap1 = this.game.add.sprite(gameWidth-400, gameHeight-250, 'trap1');
    this.trap2 = this.game.add.sprite(gameWidth-200, gameHeight-250, 'trap2');
    this.trap1.anchor.setTo(0, 1);
    this.trap2.anchor.setTo(1, 0);

    // CLOUD INIT
    this.bigCloud = this.game.add.tileSprite(0, 0, gameWidth, 353, 'big-cloud');
    this.averageCloud = this.game.add.tileSprite(0, 0, gameWidth, 184, 'average-cloud');
    this.littleCloud = this.game.add.tileSprite(0, 0, gameWidth, 376, 'little-cloud');

    this.roue1 = this.game.add.sprite(gameWidth-465, gameHeight-55, 'roue1');
    this.roue2 = this.game.add.sprite(gameWidth-150, gameHeight-55, 'roue2');
    this.roue1.anchor.setTo(0.5, 0.5);
    this.roue2.anchor.setTo(0.5, 0.5);


    // CAR INIT
    this.car1 = this.game.add.sprite(0, gameHeight-115, 'car1');
    this.car1.scale.setTo(0.5);
    this.car2 = this.game.add.sprite(600, gameHeight-110, 'car2');
    this.car2.scale.setTo(0.5);

    // GROUND INIT
    this.ground = this.game.add.tileSprite(0, gameHeight-15, gameWidth, 30, 'ground');

    // BIN INIT
    this.bin1 = this.game.add.sprite(200, gameHeight-80, 'bin');
    this.bin2 = this.game.add.sprite(1200, gameHeight-80,'bin');

    // POMPE INIT
    this.pompe1 = this.game.add.sprite(400,gameHeight-80, 'pompe' );
    this.pompe2 = this.game.add.sprite(800,gameHeight-80, 'pompe' );

    this.player = this.game.add.sprite(150, game.world.height -360, 'player', 1);
    this.game.physics.arcade.enable(this.player);

    // var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
    //
    // var text = game.add.text(game.world.centerX, game.world.centerY, "space to start", style);
    //
    // text.anchor.set(0.5);

    let that = this;
    game.time.events.add(Phaser.Timer.SECOND * 4, that.open_trap, this);




        this.player.body.bounce.y = 0.2;
        this.player.body.gravity.y = 1000;
        this.player.body.collideWorldBounds = true;

        //  Our two animations, walking left and right.
        this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);

        this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

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

    this.update_element_position( this.bin1 );
    this.update_element_position( this.bin2 );
    this.update_element_position( this.pompe1 );
    this.update_element_position( this.pompe2 );

    this.roue1.angle += VELOCITY_GROUND;
    this.roue2.angle += VELOCITY_GROUND;

    this.car_control( this.car1, this.car2 );

        this.player.animations.play('run');
    if (this.spaceKey.isDown)
    {
        this.player.body.velocity.y = -400;
        // this.player.animations.play('up');
    }

    if (this.player.body.touching.down)
    {
        this.player.body.velocity.y = -1000;
    }

	},

  open_trap: function(){
    game.add.tween(this.trap1).to( {angle:-100}, 2000, Phaser.Easing.Exponential.Out, true);
    game.add.tween(this.trap2).to( {angle:100}, 2000, Phaser.Easing.Exponential.Out, true);
  },

  get_random_int_inclusive :function ( min, max ) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min +1)) + min;

  },

  update_element_position: function( element ){

    if( element.x <= ( 0 - element.width )){

        element.x += this.game.width + element.width + this.get_random_int_inclusive(100, 10000);

    }

  },

  car_control: function( car1, car2 ){



      if ( car1.x >= ( car2.x - car2.width - 20 )){

          car1.x += 0;

      }else{

          car1.x += 5;

      }

  },

  progressive_scale: function( object ){

    let interval = setInterval(function () {

      let carScale = 0.5;
      if( carScale <= 0.20){

          clearInterval( interval );

      }else{

          object.scale.setTo(carScale - 0.02);
      }



    }, 500);

  }

};

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);

game.state.start('load');
