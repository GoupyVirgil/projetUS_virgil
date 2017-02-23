let game = new Phaser.Game('100%', '100%', Phaser.AUTO);

let gameState = {};
let score = 0;

let previousScore;

if( window.location.href.split('?').length > 1 ){

    previousScore = parseInt(window.location.href.split('?')[1].split('=')[1])

}else{

    previousScore = 500;
    
}

const VELOCITY_GROUND = 15,
      VELOCITY_BACKGROUND = 0.4,
      VELOCITY_LITTLE_CLOUD = 0.9,
      VELOCITY_AVERAGE_CLOUD = 0.7,
      VELOCITY_BIG_CLOUD = 0.5;


gameState.load = function() { };

gameState.load.prototype = {
	preload: function() {

    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio('song', ['sounds/song_level_3.mp3', 'sounds/song_level_3.ogg']);
		// Bout de code qui va permettre au jeu de se redimensionner selon la taille de l'écran
		this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();
		window.addEventListener('resize', function () {

			this.game.scale.refresh();

		});
		this.game.scale.refresh();


    // BACKGROUND
		this.game.load.image('background', 'dest/img/level3/background.png');


    // BIN
    this.game.load.image('bin', 'dest/img/level3/poubelle.png');


    // CARS
    // this.game.load.image('car1', 'dest/img/level3/car1.png');
    // this.game.load.image('car2', 'dest/img/level3/car2.png');


    // POMPE
    this.game.load.image('pompe', 'dest/img/level3/pompe.png');


    // GROUND
    this.game.load.image('ground', 'dest/img/level3/ground2.png');


    // CLOUDS
    this.game.load.image('little-cloud', 'dest/img/level3/petit-nuages.png');
    this.game.load.image('average-cloud', 'dest/img/level3/moyen-nuages.png');
    this.game.load.image('big-cloud', 'dest/img/level3/gros-nuages.png');


    // TRAPS
    this.game.load.image('trap1', 'dest/img/level3/trap1.png');
    this.game.load.image('trap2', 'dest/img/level3/trap2.png');

    // BUS
    this.game.load.image('bus', 'dest/img/level3/bus.png');


    // WHEELS
    this.game.load.image('roue1', 'dest/img/level3/roue2.png');
    this.game.load.image('roue2', 'dest/img/level3/roue2.png');


    // PLAYER
    this.game.load.spritesheet('player', 'dest/img/level3/sprint.png', 250, 280);


    // BOX
    this.game.load.image('box', 'dest/img/level3/black_box.png', 20,20);


    // POPUP
    this.game.load.image('popup', 'dest/img/level3/popup.png');

    // TRUMP
    this.game.load.spritesheet('trump', 'dest/img/level3/trump.png', 1398 ,1759);

    // OVERLAY
    this.game.load.image('overlay', 'dest/img/overlay.png');
	},

	create: function() {

    game.state.start('main');

	}
};

// va contenir le coeur du jeu
gameState.main = function() { };
gameState.main.prototype = {
	create: function() {

    this.game = game;
    // GAME PARAMS
    let gameHeight = this.game.height,
        gameWidth = this.game.width;

    // SCORE INIT
    this.score = 0;

    // BACKGROUND INIT
    this.background = this.game.add.tileSprite(0, -30,gameWidth, gameHeight, 'background');
    // this.background.height = gameHeight;


    // BUS INIT
    this.bus = this.game.add.sprite(gameWidth-600, gameHeight-280, 'bus');


    // TRAP INIT
    this.trap1 = this.game.add.sprite(gameWidth-400, gameHeight-263, 'trap1');
    this.trap2 = this.game.add.sprite(gameWidth-200, gameHeight-263, 'trap2');
    this.trap1.anchor.setTo(0, 1);
    this.trap2.anchor.setTo(1, 0);


    // CLOUD INIT
    this.bigCloud = this.game.add.tileSprite(0, 0, gameWidth, 353, 'big-cloud');
    this.averageCloud = this.game.add.tileSprite(0, 0, gameWidth, 184, 'average-cloud');
    this.littleCloud = this.game.add.tileSprite(0, 0, gameWidth, 376, 'little-cloud');


    // WHEELS INIT
    this.roue1 = this.game.add.sprite(gameWidth-460, gameHeight-68, 'roue1');
    this.roue2 = this.game.add.sprite(gameWidth-150, gameHeight-68, 'roue2');
    this.roue1.anchor.setTo(0.5, 0.5);
    this.roue2.anchor.setTo(0.5, 0.5);


    // CAR INIT
    // this.car1 = this.game.add.sprite(0, gameHeight-130, 'car1');
    // this.car1.scale.setTo(0.5);
    // this.car2 = this.game.add.sprite(600, gameHeight-125, 'car2');
    // this.car2.scale.setTo(0.5);


    // GROUND INIT
    this.ground = this.game.add.tileSprite(0, gameHeight-15, gameWidth, 30, 'ground',1);


    // BIN INIT
    // this.bin1 = this.game.add.sprite(200, gameHeight-93, 'bin');
    // this.bin2 = this.game.add.sprite(1200, gameHeight-93,'bin');


    // // POMPE INIT
    // this.pompe1 = this.game.add.sprite(400,gameHeight-93, 'pompe' );
    // this.pompe2 = this.game.add.sprite(800,gameHeight-93, 'pompe' );


    // PLAYER INIT
    this.player = this.game.add.sprite(200, game.world.height -160, 'player');


    // BOX INIT
    this.box = this.game.add.sprite(gameWidth, gameHeight-500, 'box');

    // PHYSICS ARCADE
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.arcade.gravity.y = 4000;
    this.game.physics.enable([ this.player, this.box, this.ground ], Phaser.Physics.ARCADE);


    // PLAYER PARAMS
    // this.player.body.setRectangle (75, 160, 0, 0); 
    this.player.body.allowGravity = true;
    this.player.body.bounce.y = 0;
    this.player.scale.setTo(0.5);
    this.player.body.collideWorldBounds = true;
    this.player.body.setSize(100, 200, 70, 80);
    this.player.animations.add('run', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
    this.player.animations.add('jump', [11], 8, true);

    // BOX PARAMS
    this.box.scale.setTo(1);
    this.box.enableBody = true;

    // GROUND PARAMS
    this.ground.enableBody = true;
    this.ground.body.collideWorldBounds = true;
    this.ground.body.immovable = true;
    this.ground.body.allowGravity = true;


    // EVENT TO OPEN TRAPS
    // let that = this;
    // this.game.time.events.add(Phaser.Timer.SECOND * 4, that.open_trap, this);

    // PLAYER CONTROL
    this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);


    // EMITTER INIT
    this.emitter = this.game.add.emitter(gameWidth-340, gameHeight-280, null);
    this.emitter.makeParticles('box', 1, 500, true, false);

    this.emitter.enableBody = true;
    // this.emitter.minParticleScale = 1;
    // this.emitter.maxParticleScale = 1;
    // this.emitter.setXSpeed(-1000,-1000)
    this.emitter.setRotation(0, 0);
    this.emitter.minParticleSpeed.set(-900, -900);
    this.emitter.maxParticleSpeed.set(-900, -900);
    this.emitter.angularDrag = 0;
    this.emitter.enableBodyDebug = true;
    this.emitter.gravity = 4000;

    // start(?, tempsjusqu'à descruction, temps apparition, nb de particle);
    // SCORE
    
    this.dialog = this.game.add.graphics(this.game.world.centerX-120, 30);
    this.dialog.beginFill(0xFFFFFF, 1);
    this.dialog.drawRoundedRect(0, 0, 240, 50, 30);
    this.scoreText = this.game.add.text(this.game.world.centerX -30, 45, 'Score: '+ this.score, {
        fontSize: '20px',
        fill: '#3c68f7',
        background: '#000'
    });

    // CLICK TO START
    var style = { font: "65px Montserrat", fill: "white", align: "center" };

    

    this.firstTape = true;

    this.music = game.add.audio('song');

    this.overlay = this.game.add.sprite(0, 0, 'overlay');
    this.overlay.width = this.game.width;
    this.overlay.height = this.game.height;
    this.overlay.visible = true;

    this.text = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'P R E S S   S P A C E   T O   S T A R T', {
                font: '40px Arial',
                fill: '#fff',
                align: 'center',
                fontWeight : 'bold'
            });

    // this.text.fontWeight = 'bold';
    this.text.anchor.set(0.5);
    this.text.padding = 100;
	},

	update: function() {


    let that = this;
    //VELOCITY PARAMS FOR EACH SPRITE
    this.littleCloud.tilePosition.x -= VELOCITY_LITTLE_CLOUD;
    this.averageCloud.tilePosition.x -= VELOCITY_AVERAGE_CLOUD;
    this.bigCloud.tilePosition.x -= VELOCITY_BIG_CLOUD;
    this.background.tilePosition.x -= VELOCITY_BACKGROUND;
    this.ground.tilePosition.x -= VELOCITY_GROUND;
    // this.car1 += 5 ;
    // this.car2 += 5; 
    // this.bin1.x -= VELOCITY_GROUND;
    // this.bin2.x -= VELOCITY_GROUND;
    // this.pompe1.x -= VELOCITY_GROUND;
    // this.pompe2.x -= VELOCITY_GROUND;

    // this.update_element_position( this.car1 );
    // this.update_element_position( this.car1 );
    // this.update_element_position( this.pompe1 );
    // this.update_element_position( this.pompe2 );

    this.roue1.angle += VELOCITY_GROUND;
    this.roue2.angle += VELOCITY_GROUND;

    // this.car_control( this.car1, this.car2 );

    // COLLIDES
    this.game.physics.arcade.collide(this.player,this.ground);
    this.game.physics.arcade.collide(this.box, this.ground);
    this.game.physics.arcade.collide(this.emitter, this.ground);

    this.game.physics.arcade.overlap(this.emitter, this.player,function(){}, function(){
      that.stop_game();
    }, this);

    if( this.spaceKey.isDown && this.firstTape){
      this.music.play();
      this.open_trap();
      this.emitter.start(false, 8000, 1000);
      this.text.destroy();
      this.overlay.destroy();
      this.firstTape = false;

    }

    if (this.spaceKey.isDown && this.player.body.touching.down){


        this.player.body.velocity.y = -900;

    }
    else if(!this.player.body.touching.down){

        this.player.animations.play('jump');

    }
    else{

        this.player.animations.play('run');

    }

    this.emitter.forEachExists(
        function( p ){
            // p.x -= 15;

          	if(p.position.x <= that.player.position.x){
              that.score += 100;
              score += 100
              that.scoreText.text = 'Score: ' + that.score;
              p.destroy();
            }
        }
    );

    this.update_emitter(this.emitter);
	},

  stop_game: function(){

    var that = this;
    this.popup = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'popup', 1);

    this.trump = this.game.add.sprite(this.game.world.centerX-350 , this.game.world.centerY-200, 'trump', 1);
    this.trump.scale.setTo(0.2);
    this.trump.animations.add('talk', [0, 1], 10, false);
    this.trump.animations.play('talk');
    // this.button = this.game.add.button(game.world.centerX, this.game.world.centerY, 'hil', that.action(), this);
    // this.button.backgroundColor = 'black';
    this.popup.anchor.set(0.5);

    // SNIPPET PERSIST


    this.game._paused = true;

    this.game.destroy();

    game_over();


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
          // car2.x += 5;

      }else{

          car1.x += 5;

      }

      // if( car2.x == this.game.width ){

      //     car2.x -= 5;
      //     car1.x -
      // }

  },

  update_emitter: function (emitter){

    if( this.score <= 1000){

      this.emitter.frequency = 1000;

    }else if ( this.score <= 2000){

      this.emitter.frequency = 900;

    }else if ( this.score <= 3000){

      this.emitter.frequency = 800;

    }else if ( this.score <= 4000){

      this.emitter.frequency = 700;

    }else if ( this.score <= 5000){

      this.emitter.frequency = 600;

    }else if ( this.score <= 6000){

      this.emitter.frequency = 500;

    }else if ( this.score <= 7000){

      this.emitter.frequency = 400;

    }

  },

  render: function(){

  }

};

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);

game.state.start('load');


function game_over(){


  window.location.href = "gameover.html?score="+(score+previousScore)


}

