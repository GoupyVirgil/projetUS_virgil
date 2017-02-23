var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });
// var game = new Phaser.Game(1680, 926, Phaser.AUTO, '', { preload: preload, create: create, update: update, render: render });

let previousScore;

if( window.location.href.split('?').length > 1 ){

    previousScore = parseInt(window.location.href.split('?')[1].split('=')[1])

}else{

    previousScore = 500;
    
}

function preload() {
	// Load des images
    game.load.image('bg', 'dest/img/level1/Background.png');
    game.load.image('ground', 'dest/img/level1/Plateforme.png');
    game.load.image('platformeBig', 'dest/img/level1/PlateformeBig.png');
    game.load.spritesheet('dude', 'dest/img/level1/hillary_sprite.png', 250, 280);
    game.load.image('little-cloud', 'dest/img/level1/Nuages.png');
    game.load.image('voiture', 'dest/img/level1/Voitures.png');
    game.load.spritesheet('hubert', 'dest/img/level1/Hubert.png', 282, 513);
    game.load.spritesheet('mecBlinde', 'dest/img/level1/MecBlinde.png', 470, 456);

    game.load.audio('mainSongLvl1', 'sounds/main_song_lvl1.mp3');
    game.load.audio('yes', 'sounds/yes.mp3');
    game.load.image('degat', 'dest/img/level1/dgt.png');
    game.load.audio('crie', 'sounds/crie.mp3');

}

var player;
var platforms;
var cursors;
var pos = 0;

var stars;
var scorePlayer = 0;
var score = 0;
var counter = 45;
var mainSong;
var mute;
var musicIsPlaying = true;
var Counterz;
var goText;
var spaceBar;

VELOCITY_LITTLE_CLOUD = 0.9
VELOCITY_VOITURE = 10

function create() {

    
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.world.setBounds(0, 0, 4000, game.height);

    var bg = game.add.sprite(0, 0, 'bg');
    bg.height = game.height;
    bg.width = 4000;

    // MUSIQUE
    mainSong = game.add.audio('mainSongLvl1');
    mainSong.play();
    yes = game.add.audio('yes');
    crie = game.add.audio('crie');
    mute = game.input.keyboard.addKey(Phaser.Keyboard.M);

    // Nuages
    littleCloud = game.add.tileSprite(0, 0, 12000, 500, 'little-cloud');
    littleCloud.scale.setTo(0.5);

    // Ajout sprite voitures
    CarsSprite = game.add.tileSprite(0, game.height-250, 12000, 80, 'voiture');
    CarsSprite.scale.setTo(1);
    
    platforms = game.add.group();
    platformsBig = game.add.group();

    platforms.enableBody = true;
    platformsBig.enableBody = true;

    // Grande plateformes
    var ground = platforms.create(0, game.height - 1, 'ground');
    ground.scale.setTo(25, 2);
    ground.body.immovable = true;

    var bigPlateforme = platformsBig.create(300, game.height - 356, 'platformeBig');
    bigPlateforme.body.immovable = true;

    bigPlateforme = platformsBig.create(1150, game.height - 256, 'platformeBig');
    bigPlateforme.body.immovable = true; 

    bigPlateforme = platformsBig.create(2050, game.height - 226, 'platformeBig');
    bigPlateforme.body.immovable = true;

    bigPlateforme = platformsBig.create(3000, game.height - 456, 'platformeBig');
    bigPlateforme.body.immovable = true;
    // Grande plateformes -- FIN

    // Petite plateformes
    var ledge = platforms.create(-90, game.height - 316, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(750, game.height - 456, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(950, game.height - 556, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(1250, game.height - 656, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(1650, game.height - 526, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(1850, game.height - 626, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(2375, game.height - 56, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(2675, game.height - 156, 'ground');
    ledge.body.immovable = true;  

    ledge = platforms.create(2975, game.height - 256, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(3500, game.height - 156, 'ground'); 
    ledge.body.immovable = true; 

    ledge = platforms.create(3850, game.height - 236, 'ground');
    ledge.body.immovable = true; 

    ledge = platforms.create(3900, game.height - 336, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(3950, game.height - 436, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(3650, game.height - 526, 'ground');
    ledge.body.immovable = true; 

    ledge = platforms.create(3350, game.height - 626, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(3050, game.height - 726, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(2560, game.height - 626, 'ground');
    ledge.body.immovable = true;    

    ledge = platforms.create(2675, game.height - 356, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(2275, game.height - 356, 'ground'); 
    ledge.body.immovable = true;        

    ledge = platforms.create(1650, game.height - 346, 'ground'); 
    ledge.body.immovable = true; 

    ledge = platforms.create(1300, game.height - 446, 'ground');
    ledge.body.immovable = true;  

    ledge = platforms.create(950, game.height - 156, 'ground');
    ledge.body.immovable = true;  

    ledge = platforms.create(575, game.height - 636, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(250, game.height - 696, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(-50, game.height - 776, 'ground'); 
    ledge.body.immovable = true;

    ledge = platforms.create(-15, game.height - 236, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(320, game.height - 155, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(150, game.height - 76, 'ground');
    ledge.body.immovable = true;
    // Petite plateforme -- FIN

    // Clochard
    hobo = game.add.group();
    hobo.enableBody = true;
    hobo.hasTouch = false;
    
    var hobo_item = hobo.create(450, game.height - 280, 'hubert');
    hobo_item.scale.setTo(0.25);
    hobo_item.body.immovable = true;
    hobo_item.body.setSize(100, 1, 70, 280);

    hobo_item = hobo.create(1780, game.height - 473, 'hubert');
    hobo_item.scale.setTo(0.25);
    hobo_item.body.immovable = true;
    hobo_item.body.setSize(100, 1, 70, 280);

    hobo_item = hobo.create(2675, game.height - 483, 'hubert');
    hobo_item.scale.setTo(0.25);
    hobo_item.body.immovable = true;
    hobo_item.body.setSize(100, 1, 70, 280);

    hobo_item = hobo.create(3500, game.height - 283, 'hubert');
    hobo_item.scale.setTo(0.25);
    hobo_item.body.immovable = true;
    hobo_item.body.setSize(100, 1, 70, 280);

    hobo.callAll('animations.add', 'animations', 'loop', [0,1], 1, true);
    hobo.callAll('play', null, 'loop');
    game.physics.arcade.enable(hobo);

    // Homme d'affaire
    blinde = game.add.group();
    blinde.enableBody = true;
    blinde.hasRacketer = false;

    var blinde_item = blinde.create(600, game.height - 468, 'mecBlinde');
    blinde_item.scale.setTo(0.25);
    blinde_item.body.immovable = true;

    blinde_item = blinde.create(20, game.height - 891, 'mecBlinde');
    blinde_item.scale.setTo(0.25);
    blinde_item.body.immovable = true;  

    blinde_item = blinde.create(925, game.height - 268, 'mecBlinde');
    blinde_item.scale.setTo(0.25);
    blinde_item.body.immovable = true;

    blinde_item = blinde.create(1300, game.height - 560, 'mecBlinde');
    blinde_item.scale.setTo(0.25);
    blinde_item.body.immovable = true;

    blinde_item = blinde.create(2375, game.height - 168, 'mecBlinde');
    blinde_item.scale.setTo(0.25);
    blinde_item.body.immovable = true;

    blinde_item = blinde.create(2560, game.height - 738, 'mecBlinde');
    blinde_item.scale.setTo(0.25);
    blinde_item.body.immovable = true;

    // Loop d'animations
	blinde.callAll('animations.add', 'animations', 'looper', [0,1], 3, true);
	blinde.callAll('play', null, 'looper');
    game.physics.arcade.enable(blinde);

    // Hillary
    player = game.add.sprite(32, game.world.height - 150, 'dude');
    game.camera.follow(player);
    game.physics.arcade.enable(player);
    player.body.gravity.y = 600;
    player.body.collideWorldBounds = true;
    player.scale.setTo(0.4);

    player.animations.add('left', [8, 7, 6, 5, 4, 3, 2, 1], 10, true);
    player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 10, true);
    player.animations.add('jump', [17], 8, true);
    player.animations.add('jumpLeft', [19], 8, true);
    player.animations.add('static',[0],10, true);

    player.body.setSize(100, 200, 70, 80);

    // Les controles
    cursors = game.input.keyboard.createCursorKeys();
    spaceBar = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

    // Box score
    box = game.add.graphics(600, 30);
    box.beginFill(0xFFFFFF, 1);
    box.drawRoundedRect(0, 0, 500, 50, 30);
    box.fixedToCamera = true;	

    // Score 
    scorePlayer = game.add.text(635, 40, 'Score: 0', {
        fontSize: '25px',
        fill: '#3c68f7',
        background: '#000'
    });
    scorePlayer.fixedToCamera = true;

    // Timer
    Counterz = game.add.text(950, 40, 'Timer : 45', {
        fontSize: "25px",
        fill: "#9296e7",
        align: "center"
    });
    Counterz.fixedToCamera = true;
    // Counterz.anchor.setTo(0.5, 0.5);
    game.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    degats = game.add.image(0, 0, 'degat');
    degats.fixedToCamera = true;
    degats.width = game.width;
    degats.height = game.height;
    degats.visible = false;
    alphaSprite = 1;
    
}

function update() {

    // Création des collisions
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(player, platformsBig);
    game.physics.arcade.collide(hobo, platforms);
    game.physics.arcade.collide(blinde, platforms);

    // Création des interactions entre items
    game.physics.arcade.overlap(player, hobo, hoboCollision, null, this);
    game.physics.arcade.overlap(player, blinde, blindeCollision, null, this);

    // Vitesse du personnage en fonction de la touche
    player.body.velocity.x = 0;
	
    if( degats.visible && alphaSprite > 0){


        degats.alpha = alphaSprite;
        alphaSprite -= 0.01;

    }else{
        alphaSprite = 1;
    }

    if (cursors.isDown) {
		console.log(cursors);
	}

    if (spaceBar.isDown){
    	game.camera.y -= 4;
	}
	// else if (cursors.down.isDown){
 //    	game.camera.y += 4;
	// }

    if (cursors.left.isDown)
    {
        game.camera.x -= 4;
    }
    else if (cursors.right.isDown)
    {
        game.camera.x += 4;
    }


    if (cursors.left.isDown){
        //  Movuvement gauche
        player.body.velocity.x = -200;
        player.animations.play('left');
    }
    else if (cursors.right.isDown){
        //  Mouvement droite
        player.body.velocity.x = 200;
        player.animations.play('right');
    }
    else{
        //  Statique
        player.animations.play('static');
        player.frame = 0;
    }
    
    // Saut du joueur si il touche la sol (Double saut impossible)
    if (spaceBar.isDown && (player.body.onFloor() || player.body.touching.down)){
        player.body.velocity.y = -350;  
    }  

    if (!(player.body.touching.down)){
    	if (cursors.right.isDown) {	
	        player.animations.play('jump');
    	}
    }  


    if (!(player.body.touching.down)) {
    	if (cursors.left.isDown) {	
        	player.animations.play('jumpLeft');
    	}
    }

    // Position des nuages & des voitures
    littleCloud.tilePosition.x -= VELOCITY_LITTLE_CLOUD;
    CarsSprite.tilePosition.x += VELOCITY_VOITURE;

    // Music
	function stopMusic() {
	    musicIsPlaying = false;
	    mainSong.stop();
	}

	function playMusic() {
	    musicIsPlaying = true;
	    mainSong.play();
	}

	// Play & Stop music
	if (mute.isDown && musicIsPlaying === true) {
	    console.log(musicIsPlaying)
	    stopMusic();

	} else if (mute.isDown && musicIsPlaying === false) {
	    console.log(musicIsPlaying)
	    playMusic();
	} 

    if (score >= 300) {
        goText = game.add.text(950, 200, 'Congratulation ', {
            font: '40px Arial',
            fill: '#ff0000',
            align: 'center'
        });
        Counterz.destroy();
        setTimeout(lockGame, 500);
        setTimeout(win, 2000);
    }
}

function hoboCollision (player, hobo_item) {
	if (!hobo_item.hasTouch) {
		console.log('touching');
		score -= 10;
		scorePlayer.text = 'Score: ' + score;
		hobo_item.animations.add('static', [2, 0, 1], 1, true);
		hobo_item.animations.play('static', 0.5, true);
		hobo_item.frame = 2;
		hobo_item.hasTouch = true;
        degats.visible = true;
        setTimeout(invisible, 800);
        crie.play();
	};
}


function blindeCollision (player, blinde_item) {

	if (!blinde_item.hasRacketer) {
		console.log('score');
		score += 50;
        // score += 50;
		scorePlayer.text = 'Score: ' + score;
		blinde_item.animations.add('static', [2], 1, true);
	    blinde_item.play('static', 0.5, true);
		blinde_item.frame = 2;
		blinde_item.hasRacketer = true;
        yes.play();
	};
}

function invisible() {
    degats.visible = false;
}

//Stop game at the end of counter
function updateCounter() {
    
    counter--;
    Counterz.setText('Timer: ' + counter);

    if (counter == 0) {
        if (score >= 150) {
            goText = game.add.text(950, 200, 'Congratulation ', {
            font: '40px Arial',
            fill: '#ff0000',
            align: 'center'
        });
        Counterz.destroy();
        setTimeout(lockGame, 500);
        setTimeout(win, 2000);
        } else {
            goText = game.add.text(950, 200, 'Game Over ', {
                font: '40px Arial',
                fill: '#ff0022',
                align: 'center'
            });
            Counterz.destroy();
            setTimeout(lockGame, 500);
            setTimeout(loose, 2000);
        }
    }
}




function endOfTimer() {

	game.lockRender = true;

}

function win() {
    window.location.href = "story2.html?score=" + score;
}

function lockGame() {
	game.lockRender = true;
}

function loose() {
    window.location.href = "gameover.html?score=" + score;
}

function render(hobo_item) {

    // game.debug.bodyInfo(hobo_item, 32, 32);

    // game.debug.body(hobo_item);
    // game.debug.body(player);

}

