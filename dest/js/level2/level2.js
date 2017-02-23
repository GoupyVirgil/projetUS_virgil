console.log('in level 2 - play');

var level2 = new Phaser.Game(window.innerWidth * window.devicePixelRatio, window.innerHeight * window.devicePixelRatio, Phaser.AUTO, '', {
    preload: preload,
    create: create,
    update: update,
    render: render
});

let previousScore;

if( window.location.href.split('?').length > 1 ){

    previousScore = parseInt(window.location.href.split('?')[1].split('=')[1])

}else{

    previousScore = 500;
    
}


function preload() {

    // level2.load.baseURL = '../../';
    // level2.load.crossOrigin = 'anonymous';

    level2.load.image('bkg', 'dest/img/level2/bkg_level2.jpg');
    level2.load.image('blockLeft', 'dest/img/level2/block_left.jpg');
    level2.load.image('blockRight', 'dest/img/level2/block_right.png');
    level2.load.image('email', 'dest/img/level2/mail.png');
    level2.load.image('ground', 'dest/img/level2/ground.png');
    level2.load.image('ground2', 'dest/img/level2/ground2.png');
    level2.load.image('fbi', 'dest/img/level2/fbi.png');
    level2.load.image('overlay', 'dest/img/overlay.png');

    level2.load.spritesheet('hil', 'dest/img/level2/sprite_complete.png', 353, 295);

    level2.load.audio('emailKilled', 'sounds/emailKilled.mp3');
    level2.load.audio('copsSound', 'sounds/copsSound.mp3');
    // level2.load.audio('explo', 'sounds/explo.wav');
    level2.load.audio('mainSong', ['sounds/song_level_2.mp3','sounds/song_level_2.ogg']);

}


var player;
var cursors;
var bulletTime = 0;
var emails;
var scorePlayer;
var scoreFbi
var score = 0;
var scoreEnemy = 0;
var platforms;
var blockLeft;
var blockRight;
var bkg;
var copsSound;
var emailKilled;
var mainSong;
var timer;
var total = 0;
var counter = 50;
var text;
var mute;
random = Math.random();
var musicIsPlaying = true;
var textEnd;
var trump;
var box;



// -------------------------------------------------
// -------------------------------------------------
// -----------------    CREATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------

function create() {

    level2.physics.startSystem(Phaser.Physics.ARCADE);

    //Add bkg
    var bkg = level2.add.sprite(0, 0, 'bkg');
    bkg.height = level2.height;
    bkg.width = level2.width;
    bkg.enableBody = true;
    bkg.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(bkg, Phaser.Physics.ARCADE);
    bkg.body.collideWorldBounds = true;
    bkg.body.checkCollision.left = true;
    bkg.body.checkCollision.right = true;
    bkg.body.immovable = true;

    //Add ground
    var ground = level2.add.sprite(0, level2.height - 20, 'ground');
    ground.width = level2.width;
    ground.enableBody = true;
    ground.physicsBodyType = Phaser.Physics.ARCADE;
    ground.name = 'ground';
    level2.physics.enable(ground, Phaser.Physics.ARCADE);
    ground.body.collideWorldBounds = true;
    ground.checkWorldBounds = true; //To test
    ground.outOfBoundsKill = true; ////To test
    ground.body.checkCollision.up = true;
    ground.body.checkCollision.down = true;
    ground.body.immovable = true;

    //Add fbi
    fbi = level2.add.group();
    fbi.enableBody = true;
    createFbi();

    //Add ground 2
    var ground2 = level2.add.sprite(0, level2.height - 300, 'ground2');
    ground2.width = level2.width;
    ground2.enableBody = true;
    ground2.physicsBodyType = Phaser.Physics.ARCADE;
    ground2.name = 'ground2';
    level2.physics.enable(ground2, Phaser.Physics.ARCADE);
    ground2.body.collideWorldBounds = true;
    ground2.checkWorldBounds = true; //To test
    ground2.outOfBoundsKill = true; ////To test
    ground2.body.immovable = true;


    //Add Hillary;
    player = level2.add.sprite(level2.world.centerX, level2.height - 430, 'hil', 1);
    player.frame = 0;
    player.enableBody = true;
    player.scale.setTo(0.5);
    player.physicsBodyType = Phaser.Physics.ARCADE;
    level2.physics.enable(player, Phaser.Physics.ARCADE);
    player.body.collideWorldBounds = true;
    level2.physics.arcade.enable(player);
    player.animations.add('left', [8, 7, 6, 5, 4, 3, 2, 1, 0], 10, true);
    player.animations.add('right', [9, 10, 11, 12, 13, 14, 15, 16], 10, true);
    player.body.setSize(230, 110, 110, 100); 


    //Add game over text
    textEnd = level2.add.text(level2.world.centerX, level2.world.centerY - 200, ' ', {
        font: '40px Arial',
        fill: '#D80000',
        align: 'center'
    });
    textEnd.anchor.setTo(0.5, 0.5);
    textEnd.font = 'Arial';
    textEnd.visible = false;
    textEnd.fixedToCamera = true;


    //Add Emails
    emails = level2.add.group();
    emails.enableBody = true;
    setTimeout(createEmails, 2500);

    //Add blocks left
    blockLeft = level2.add.sprite(-100, 0, 'blockLeft');
    blockLeft.height = level2.height;
    blockLeft.width = 400;
    blockLeft.enableBody = true;
    blockLeft.name = 'blockLeft';
    level2.physics.enable(blockLeft, Phaser.Physics.ARCADE);
    blockLeft.body.collideWorldBounds = true;
    blockLeft.checkWorldBounds = true; //To test
    blockLeft.body.checkCollision.left = true;
    blockLeft.body.checkCollision.right = true;
    blockLeft.body.immovable = true;

    // //Add blocks Right
    blockRight = level2.add.sprite(window.innerWidth, 0, 'blockRight');
    blockRight.height = level2.height;
    blockRight.width = 400;
    blockRight.enableBody = true;
    blockRight.physicsBodyType = Phaser.Physics.ARCADE;
    blockRight.name = 'blockRight';
    level2.physics.enable(blockRight, Phaser.Physics.ARCADE);
    blockRight.body.collideWorldBounds = true;
    blockRight.body.checkCollision.left = true;
    blockRight.body.checkCollision.right = true;
    blockRight.body.immovable = true;


    //Add sounds
    // fireSound = level2.add.audio('fireSound');
    emailKilled = level2.add.audio('emailKilled');
    copsSound = level2.add.audio('copsSound');
    // explo = level2.add.audio('explo');
    mainSong = level2.add.audio('mainSong');


    //Add score box 
    //var box = level2.add.RoundedRectangle(level2.world.centerX, 30, 300, 50, 30);
    box = level2.add.graphics(level2.world.centerX - 400, 30);
    box.beginFill(0xFFFFFF, 1);
    box.drawRoundedRect(0, 0, 740, 50, 30);


    //Add Scores
    scorePlayer = level2.add.text(level2.world.centerX - 380, 45, 'Score: 0', {
        fontSize: '20px',
        fill: '#3c68f7',
        background: '#000'
    });

    scoreFbi = level2.add.text(level2.world.centerX + 175, 45, 'FBI: 0', {
        fontSize: '20px',
        fill: '#f43d3d',
        background: '#000'
    });


    //Timer
    text = level2.add.text(level2.world.centerX - 80, 40, 'Timer : 50', {
        fontSize: "25px",
        fill: "#9296e7",
        align: "center"
    });
    // text.anchor.setTo(0.5, 0.5);
    level2.time.events.loop(Phaser.Timer.SECOND, updateCounter, this);

    overlay = level2.add.sprite(0, 0, 'overlay');
    overlay.width = level2.width;
    overlay.height = level2.height;
    overlay.visible = false;

    //Add music 
    music = level2.add.audio('mainSong');
    music.play();

    mute = level2.input.keyboard.addKey(Phaser.Keyboard.M);
    cursors = level2.input.keyboard.createCursorKeys();
}


function updateCounter() {
    counter--;
    text.setText('Timer: ' + counter);

    if (counter == 0) {
        if (score > scoreEnemy) {

            overlay.visible = true;
            textEnd = level2.add.text(level2.world.centerX, level2.world.centerY, 'C O N G R A T U L A T I O N ', {
                font: '40px Arial',
                fill: '#fff',
                align: 'center'
            });
            textEnd.fontWeight = 'bold';
            textEnd.anchor.set(0.5);
            text.destroy();
            setTimeout(endOfTimer, 500);
            setTimeout(win, 2000);
            win();
        } else if (scoreEnemy > score) {

            overlay.visible = true;
            textEnd = level2.add.text(level2.world.centerX, level2.world.centerY, 'G A M E  O V E R', {
                font: '40px Arial',
                fill: '#fff',
                align: 'center'
            });
            textEnd.fontWeight = 'bold';
            textEnd.anchor.set(0.5);
            text.destroy();
            setTimeout(endOfTimer, 500);
            setTimeout(loose, 2000);
        }
    }
}


function endOfTimer() {
    level2.lockRender = true;
}

function win() {
    window.location.href = "story3.html?score="+ (score+previousScore);
}

function loose() {
    window.location.href = "gameover.html?score="+ (score+previousScore);
}

//Create emails
function createEmails(mail) {
    var mail = emails.create(level2.world.randomX, 0, 'email');
    mail.width = 50;
    mail.checkWorldBounds = true;
    mail.events.onOutOfBounds.add(mailOut, this);
    //var numY = Math.random() */* 900*/ + 1000;
    mail.body.velocity.y = 700;
    var numX = Math.floor(Math.random() * 99) + 1;;
    numX *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    mail.body.velocity.x = numX;
    setTimeout(createEmails, 100);
}


//Generate emails when out of the game
function mailOut(mail) {
    mail.reset(level2.world.randomX, 0);
    mail.body.velocity.y = 700;
    var num = Math.floor(Math.random() * 99) + 1;
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1;
    mail.body.velocity.x = num;
}

//Create FBI
function createFbi() {
    var fbiCar = fbi.create(random, level2.height - 115, 'fbi');
    fbiCar.width = 285;
    fbiCar.height = 100;
    fbiCar.body.velocity.x = 550 + Math.random() * 200;
    level2.physics.enable(fbiCar, Phaser.Physics.ARCADE);
    fbiCar.body.collideWorldBounds = false;
    fbiCar.checkWorldBounds = true;
    fbiCar.events.onOutOfBounds.add(fbiOut, this);
    setTimeout(createFbi, 20000);
}

//Generate fbi car when out of the ground
function fbiOut(fbiCar) {
    fbiCar.kill();
    fbiCar.reset(0, level2.height - 115);
    fbiCar.body.velocity.x = 550 + Math.random() * 1200 + 700;
}



// -------------------------------------------------
// -------------------------------------------------
// -----------------    UPDATE   ----------------------
// -------------------------------------------------
// -------------------------------------------------

function update() {

    //Event on collision between items
    level2.physics.arcade.overlap(emails, player, collectMail, null, this);
    level2.physics.arcade.overlap(fbi, emails, fbiCollect, null, this);
    level2.physics.arcade.overlap(blockLeft, emails, mailOnWall, null, this);
    level2.physics.arcade.overlap(blockRight, emails, mailOnWall, null, this);

    //Hillary collect emails
    function collectMail(player, mail) {
        mail.kill();
        emailKilled.play();
        score += 9;
        scorePlayer.text = 'Score: ' + score;
    }

    //FBI collect 
    function fbiCollect(fbiCar, mail) {
        mail.kill();
        copsSound.play();
        scoreEnemy += 9;
        scoreFbi.text = 'Score FBI : ' + scoreEnemy;
    }

    //Kill mail if touch wall
    function mailOnWall(blockLeft, mail) {
        mail.kill();
    }

    //Hillary's move
    if (cursors.left.isDown) {
        player.body.velocity.x = -750;
        player.animations.play('left');

    } else if (cursors.right.isDown) {
        player.body.velocity.x = 750;
        player.animations.play('right');
    }

    //Music
    function stopMusic() {
        musicIsPlaying = false;
        music.stop();
    }

    //Play music
    function playMusic() {
        musicIsPlaying = true;
        music.play();
    }

    //Play / Stop music
    if (mute.isDown && musicIsPlaying === true) {
        console.log(musicIsPlaying)
        stopMusic();

    } else if (mute.isDown && musicIsPlaying === false) {
        console.log(musicIsPlaying)
        playMusic();
    }

    // startGame();
    level2.physics.arcade.collide(blockLeft, player);
    level2.physics.arcade.collide(blockRight, player);
    level2.physics.arcade.collide(blockLeft, emails);
    level2.physics.arcade.collide(blockRight, emails);

}


function render() {}
