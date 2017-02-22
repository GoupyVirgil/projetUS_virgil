let game = new Phaser.Game('100%', '100%', Phaser.AUTO);

let gameState = {};
let score = 0;

const VELOCITY_GROUND = 15,
      VELOCITY_BACKGROUND = 0.4,
      VELOCITY_LITTLE_CLOUD = 0.9,
      VELOCITY_AVERAGE_CLOUD = 0.7,
      VELOCITY_BIG_CLOUD = 0.5;


gameState.load = function() { };

gameState.load.prototype = {
	preload: function() {

    game.load.image('disk', 'assets/sprites/ra_dont_crack_under_pressure.png');

    //  Firefox doesn't support mp3 files, so use ogg
    game.load.audio('song', ['audio/song_level_3.mp3', 'audio/song_level_3.ogg']);
		// Bout de code qui va permettre au jeu de se redimensionner selon la taille de l'écran
		this.game.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.setShowAll();
		window.addEventListener('resize', function () {
			this.game.scale.refresh();
		});
		this.game.scale.refresh();


    // BACKGROUND
		this.game.load.image('background', 'img/background.png');


    // BIN
    this.game.load.image('bin', 'img/poubelle.png');


    // CARS
    this.game.load.image('car1', 'img/car1.png');
    this.game.load.image('car2', 'img/car2.png');


    // POMPE
    this.game.load.image('pompe', 'img/pompe.png');


    // GROUND
    this.game.load.image('ground', 'img/ground2.png');


    // CLOUDS
    this.game.load.image('little-cloud', 'img/petit-nuages.png');
    this.game.load.image('average-cloud', 'img/moyen-nuages.png');
    this.game.load.image('big-cloud', 'img/gros-nuages.png');


    // TRAPS
    this.game.load.image('trap1', 'img/trap1.png');
    this.game.load.image('trap2', 'img/trap2.png');

    // BUS
    this.game.load.image('bus', 'img/bus.png');


    // WHEELS
    this.game.load.image('roue1', 'img/roue2.png');
    this.game.load.image('roue2', 'img/roue2.png');


    // PLAYER
    this.game.load.spritesheet('player', 'img/sprint.png', 250, 280);


    // BOX
    this.game.load.image('box', 'img/box.jpg', 20,20);


    // POPUP
    this.game.load.image('popup', 'img/popup.png');

    // TRUMP
    this.game.load.spritesheet('trump', 'img/trump.png', 1398 ,1759);
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
    this.car1 = this.game.add.sprite(0, gameHeight-130, 'car1');
    this.car1.scale.setTo(0.5);
    this.car2 = this.game.add.sprite(600, gameHeight-125, 'car2');
    this.car2.scale.setTo(0.5);


    // GROUND INIT
    this.ground = this.game.add.tileSprite(0, gameHeight-15, gameWidth, 30, 'ground',1);


    // BIN INIT
    this.bin1 = this.game.add.sprite(200, gameHeight-93, 'bin');
    this.bin2 = this.game.add.sprite(1200, gameHeight-93,'bin');


    // POMPE INIT
    this.pompe1 = this.game.add.sprite(400,gameHeight-93, 'pompe' );
    this.pompe2 = this.game.add.sprite(800,gameHeight-93, 'pompe' );


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
    
    this.dialog = this.game.add.graphics(this.game.world.centerX - 400, 30);
    this.dialog.beginFill(0xFFFFFF, 1);
    this.dialog.drawRoundedRect(0, 0, 740, 50, 30);
    this.scoreText = this.game.add.text(this.game.world.centerX - 400, 30, 'Score: '+ this.score, { fontSize: '32px', fill: '#000' });

    // CLICK TO START
    var style = { font: "65px Montserrat uppercase", fill: "blue", align: "center", backgroundColor: "white" };
    this.text = this.game.add.text(game.world.centerX, game.world.centerY, "space to start", style);
    this.text.anchor.set(0.5);
    this.text.padding = 100;

    this.firstTape = true;

    this.music = game.add.audio('song');


	},

	update: function() {


    let that = this;
    //VELOCITY PARAMS FOR EACH SPRITE
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

      }else{

          car1.x += 5;

      }

  },

  update_emitter: function (emitter){

    if( this.score <= 1000){

      this.emitter.frequency = 900;

    }else if ( this.score <= 2000){

      this.emitter.frequency = 900;

    }else if ( this.score <= 3000){

      this.emitter.frequency = 700;

    }else if ( this.score <= 4000){

      this.emitter.frequency = 600;

    }

  },

  render: function(){

    this.game.debug.body(this.player);
    this.game.debug.body(this.emitter);

  }

};

game.state.add('load', gameState.load);
game.state.add('main', gameState.main);

game.state.start('load');


function game_over(){

  window.document.getElementsByTagName('body')[0].innerHTML +='<div>toto</div>';

  let stringToPersist = "name=virgil&score="+score;
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("POST", "score.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(stringToPersist);

  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            console.log(this.responseText);
       
       }
  };

}

function get_highscore(){

  

  let stringToPersist = "score=true";
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {

            let data = JSON.parse(this.responseText);


            window.onload = function() { 
                let body = window.document.getElementsByTagName('body')[0];
                for ( row in data){


                  body.innerHTML += "<h1>row</h1>";


                }

            }
            
       
       }
  };
  xmlhttp.open("GET", "score.php");
  xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xmlhttp.send(stringToPersist);

}


get_highscore();
