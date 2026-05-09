/** @format */

function setup() {
  createCanvas(646, 840);
  noStroke();

  PLAYER_START_X = width / 2 - (imgs.ship.f[0].length * pix_size) / 2;
  PLAYER_START_Y = height - 60;

  setupStars(60); //60 is the number of stars
  setupAliens();
  setupSqad();

  player = new Player();
}
// images \/
let imgs = {
  explo: {
    plyr: {
      1: [
        "................................",
        "................................",
        "....................w...........",
        ".............cc....c.cc.........",
        "...........cc..cc.ccww.c........",
        ".........cc..ww..c.c....c.......",
        "........c..r...........wwc......",
        "........cr............r..c......",
        ".......cr.c.....r.....ccc.......",
        ".......c..c.....r......c..c.....",
        "......cw.w......r.....r..cc.....",
        "......c.cw.....rrr.........w....",
        "........w......rrr.......r..c...",
        "......cc....r..rrr..r.....c..c..",
        ".....w......r..rrr..r.....c.w.c.",
        ".....c.r....r.rrrrr.r.....rc..c.",
        "....c.c..r..r.rrrrr.r..r...c.c..",
        "....c.c..r..rrrrrrrrr..r.....c..",
        "...wwww..r..rrrrrrrrr..r....w...",
        "..c......r.rrrrrrrrrrr.r..cc....",
        "..c...c..rrrrrrrrrrrrrrr....w...",
        "...wwwc..rrr.rrrrrrr.rrr..w.w...",
        "....cccr.rr..rr.r.rr..rr..w..c..",
        ".....cc.cr......r......r.r.c.c..",
        ".......ww................r..c...",
        ".........cc...cc..c.....c..c....",
        "........c..r....r..c..rr..w.....",
        ".........cc..w...c..wwcccc......",
        "...........cc.....ccccww........",
        "....................ww..........",
        "................................",
        "................................",
      ],
      2: [
        "................................",
        "................................",
        ".cc.........................cc..",
        "...c.......cc.ccc...c......cc...",
        "....cc....cccccccc...r...ccc....",
        ".....c.r..cccc.r.cc...cc.c......",
        "......c..cc.r.c.ccc.....w.......",
        "....cc...ccw.ccccccccc..www.....",
        "........c.ccccc.cc.cccc.........",
        "...r...ccc.cccwcccccccccc.......",
        ".cc..cccccwwwwww.wwwrc.cc..ccc..",
        "....ccc.c.ww..wwww.wcrc.cc..c...",
        "...ccc.ccw.w.w.w..wwccc.cc..cc..",
        "...cc.cccwwww.w.w.wwwc.ccc.w....",
        "...cc.ccc.wwc..rw...wcccc.......",
        "....cc.ccc....wwwwww..ccc.......",
        "...cc.ccrwwww.wrw....wcccc......",
        "...ccc.crwww...wwr.wwwc.ccc.....",
        "...cccccww.ww.w.w.wwwwcc.cc.....",
        "....cccc.cww.w.....wwrw.ccc.....",
        "....cccc.cw...ww.ww.wwwc.cc.r...",
        "..c..cc.ccw.wwww.wwwwc.cc.......",
        "...c...cccccwrwcccwrwc.ccc.c....",
        "........ccccccccccccc.cc........",
        "....cc..cc.cc.cccc.ccc..ww......",
        "...c..w..cc..cc.ccc.cc..w.......",
        ".....r.w..wwwwww.wwwww...w......",
        "....r..c...cc.cc...cc.....w.....",
        "...c..................c....c....",
        "..c........cccc......c......cc..",
        "...........c.c..................",
        "..........c.....................",
      ],
      3: [
        "...........cc..ccccc.cccc......c",
        ".c......cccccc.ccccccccccc....c.",
        "..c....ccccccc.ccccc.c.wwcc.cc..",
        "..ccc.ccww..cccccww.w.w.wwc...r.",
        "...r..ccw.ww.cwwww.wwwww.wcc.r..",
        ".......wrwwww.wwcwwwwcwww.cc....",
        "....ccwwwwwcwwwrrwwwwwcwww.c....",
        "...cww.wcwwwccccw.wwwwwrww.ccc..",
        "..ccw.wwcwwwwwwww.wcwwrcw.wwwcc.",
        ".ccw.wwcwwwww.www.wwwwwcwwww.cc.",
        ".cc.wwwcww.www.ww.www.wwwwcwc.cc",
        ".cc.wwwwwww.wrww.www.ww.wwcw.cc.",
        ".ccw.wrww..w.w...w...wcw.wcww.cc",
        "..cwwcwwcw..w..w..w.wwww.wwww.cc",
        "..ccwcwwcww..w.w.w..www.wwww.ccc",
        "...c.wcwcwc...wwww...wwwwww.ccc.",
        "..c.cwwwww.wrwwwwrww.wwwrw.ccc..",
        "..ccwrwww...w..ww.....wwwwccc...",
        "..ccwwcwwwww.w..ww..wwwwwwcc.c..",
        "..cc.wwcwww..w...w.wwwcwwrcc.cc.",
        "...ccwwwwww.w.......wwwwwwcc.c.r",
        "....c.wwcw...ww.www..wwwwc...c..",
        "...ccwww.wwwwww.w.ww.ww..cc...cc",
        "...ccwwww.wwrwwwww.wwwww.cccc...",
        "....ccccc.wwwwrwwwwwwrww.wccc...",
        "..r..ccccc.w.ww.wwwwwww.wwwcc...",
        ".c.....ccc.ww..wwww.wccccccc....",
        "....r..cc.cccwwwwwwwcc.cccc..ww.",
        "...ccc....ccccccw.wwc.......w...",
        "..rr.......cc...cwwwcc.....r.r..",
        ".cc............ccccccc........c.",
        "cc...............cccc...........c",
      ],
      4: [
        "................................",
        "................................",
        ".cc.........................ww..",
        "...r.......ww.rwc...c......cc...",
        "....ww....wccwwwww...c...rww....",
        ".....w.w..wwwc.w.ww...ww.r......",
        "......w..ww.w.w.ccw.....w.......",
        "....ww...www.wrccccwww..www.....",
        "........w.wwwww.ww.cwww.........",
        "...w...cww.wrwwwwwwwcwcwc.......",
        ".cc..wwwwwwwwwww.wwwrw.wc..www..",
        "....www.w.ww..wwww.wrww.wc..w...",
        "...cww.www.w.w.w..wwwww.ww..rw..",
        "...cw.wwwwwww.w.w.wwww.www.r....",
        "...wc.www.www..wr...wwwwc.......",
        "....rw.www....wwwwww..wwc.......",
        "...cr.wwwwwww.www....wwwww......",
        "...cww.wwwww...www.wwww.c.c.....",
        "...cwcwwww.ww.r.w.wwwwww.wc.....",
        "....wwww.www.w.....wwww.wwc.....",
        "....wcww.ww...ww.ww.wrww.cw.r...",
        "..w..cw.www.wwww.wwwww.ww.......",
        "...w...cwwwwwccwwwwwww.cwc.c....",
        "........cwwwwwwrwwwww.ww........",
        "....ww..cc.ww.wwww.www..ww......",
        "...w..w..cw..cc.www.wc..w.......",
        ".....w.w..wcccww.ccwwc...w......",
        "....w..w...ww.ww...wc.....c.....",
        "...r..................c....r....",
        "..r........wwww......c......ww..",
        "...........w.w..................",
        "..........w.....................",
      ],
    },
    aln: {
      1: [
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................w...............",
        "............w...................",
        ".............wrw................",
        "...........w.rwr.w..............",
        ".............wrww...............",
        "...........w.wrr.w..............",
        "............w.ww................",
        "................w...............",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
      ],
      2: [
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        ".................w..............",
        ".............w..................",
        "...........yy.w.w..y............",
        "............y..w.w.y............",
        "...........w.w.rr...............",
        "..........w..yyy.wrw.r..........",
        "............rrryrrr.............",
        ".............yrwyr..w...........",
        "..........r.wrrrr..w............",
        ".............yywrrw.y...........",
        "...........wyyyy.w..yy..........",
        ".............yyw..w.............",
        ".............r..w...............",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
      ],
      3: [
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "........w.....w...r.............",
        "...........w..y.w..w...r........",
        "............r.r..yy..w..........",
        ".........w..rry...y.r...........",
        "..............y.w..w..w.........",
        "...........w..y..w...w..........",
        "........rr..w..w...r.y..........",
        "..........y........r.y.w........",
        "...........y.....w..w...........",
        "........w..yrr.w................",
        "..........w.y.....w..w.w........",
        ".............w.w...rr.y.........",
        ".........w...w...y.rr.y.........",
        "...........wyy...y..............",
        "...........y.yyy.......y........",
        "........r..r.r.y..w.............",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
        "................................",
      ],
      4: [
        "................................",
        "................................",
        "..........r.....................",
        "................................",
        ".............yy....w.....r......",
        "..................w...r.........",
        ".........w......w....w..........",
        "...........w........w...........",
        "......yy......r..w..............",
        "...w.......y..r.......r..w......",
        "........w.yy...wyy..y...........",
        "...................w...w.....w..",
        ".....................yy..w......",
        "....r...rw............y....r....",
        ".....w..r........r..w.....w.....",
        ".......y....w........r..........",
        ".......y.w.............w.yy.....",
        "....w......................r....",
        ".......r......w.....ww....w.....",
        "......................w.........",
        ".......y..w.........y...w.......",
        "......y..w...r..wr..y....yy.....",
        "............y.w.......r.........",
        "........r...yw....y....w........",
        "....r..w.......w...w....w.......",
        "................w....y..........",
        "...........w.........y..........",
        ".............w....r.............",
        "................................",
        "....................w...........",
        "................................",
        "................................",
      ],
      5: [
        "................r...............",
        "...........y..........w.......w.",
        "...w.......y....................",
        "....y.........w.............w...",
        "................................",
        "........rw........y.............",
        "...............................y",
        "........................w.......",
        "...w.........w..................",
        "...........................y....",
        "................................",
        "......................r.........",
        ".......r........................",
        "..........y....................r",
        "................................",
        ".yy.....................w.......",
        ".....r......................yw..",
        "............................y...",
        "................................",
        "................................",
        "......w.........................",
        "..............................y.",
        ".w..............................",
        ".........................w......",
        "..............y.................",
        "................................",
        "......w...w.....................",
        ".............w.......w...r...y..",
        "..r......y...................y..",
        "..................r.............",
        "...y.......................w....",
        "..y.............................",
      ],
    },
  },
  bullets: {
    plyrb: [
      "................",
      "................",
      "................",
      "................",
      ".......b........",
      ".......b........",
      "......bbb.......",
      "......bwb.......",
      ".......r........",
      ".......r........",
      ".......r........",
      ".......r........",
      "................",
      "................",
      "................",
      "................",
    ],
    alnb: [
      "................",
      "................",
      "................",
      "................",
      ".......w........",
      ".......w........",
      ".......w........",
      ".......w........",
      "......rcr.......",
      "......rrr.......",
      ".......r........",
      ".......r........",
      "................",
      "................",
      "................",
      "................",
    ],
  },
  scores: {
    150: [
      ".w..wwwww..ww.",
      "ww..w.....w.ww",
      ".w..wwww..w..w",
      ".w......w.w..w",
      ".w......w.w..w",
      ".w..w...w.ww.w",
      "www..www...ww.",
    ],
    400: [
      "...r...rr...rr.",
      "..rr..r..r.r..r",
      ".r.r..r..r.r..r",
      "r..r..r..r.r..r",
      "rrrrr.r..r.r..r",
      "...r..r..r.r..r",
      "...r...rr...rr.",
    ],
    800: [
      ".ooo...oo...oo.",
      "o...o.o..o.o..o",
      "o...o.o..o.o..o",
      ".ooo..o..o.o..o",
      "o...o.o..o.o..o",
      "o...o.o..o.o..o",
      ".ooo...oo...oo.",
    ],
    1000: [
      "b..bb...bb...bb.",
      "b.b..b.b..b.b..b",
      "b.b..b.b..b.b..b",
      "b.b..b.b..b.b..b",
      "b.b..b.b..b.b..b",
      "b.b..b.b..b.b..b",
      "b..bb...bb...bb.",
    ],
  },
  aliens: {
    bee: {
      o: [
        "................",
        "................",
        "................",
        "...b....y....b..",
        "....b.yryry.b...",
        ".....brryrrb....",
        "......yyyyy.....",
        ".....bbyyybb....",
        "....bbbrrrbbb...",
        "...bbb.rrr.bbb..",
        "..bbbb.yyy.bbbb.",
        "..bbb..rrr..bbb.",
        "..bbb...r...bbb.",
        "................",
        "................",
        "................",
      ],
      c: [
        "................",
        "................",
        "................",
        "....b...y...b...",
        "....b.yryry.b...",
        ".....brryrrb....",
        "......yyyyy.....",
        ".....bbyyybb....",
        ".....bbrrrbb....",
        "....bb.rrr.bb...",
        "....bb.yyy.bb...",
        "....bb.rrr.bb...",
        "....bb..r..bb...",
        "................",
        "................",
        "................",
      ],
    },
    butfly: {
      o: [
        "................",
        "................",
        "................",
        "....r..b.b..r...",
        "..rrr..b.b..rrr.",
        "..rrr.wrwrw.rrr.",
        "..rrr.wwwww.rrr.",
        "...rrrrwwwrrrr..",
        "....rrrbbbrrr...",
        "...rrrrbbbrrrr..",
        "..rrrrrwwwrrrrr.",
        "...rrr.bbb.rrr..",
        ".....r.....r....",
        "................",
        "................",
        "................",
      ],
      c: [
        "................",
        "................",
        "................",
        "....r.......r...",
        "....r..b.b..r...",
        "....r.wrwrw.r...",
        "....rrrwwwrrr...",
        "......rbbbr.....",
        "....rrrbbbrrr...",
        "....rrrwwwrrr...",
        "....rr.bbb.rr...",
        "....rr..b..rr...",
        "................",
        "................",
        "................",
      ],
    },
    boss_g: {
      o: [
        ".......g.g......",
        ".......g.g......",
        "....ggoogoogg...",
        ".....googoog....",
        "......ggggg.....",
        ".....gyygyyg....",
        "...gggyyyyyggg..",
        ".gggggyyyyyggggg",
        "..ggggyyyyygggg.",
        "..gogg.o.o.ggog.",
        ".ggog..o.o..gogg",
        ".gogg.......ggog",
        ".goog.......goog",
        ".goog.......goog",
        ".gggg.......gggg",
        "..gg.........gg.",
      ],
      c: [
        "................",
        ".......g.g......",
        "....ggoogoogg...",
        ".....googoog....",
        "......ggggg.....",
        "....ggyygyygg...",
        "...gggyyyyyggg..",
        ".gggggyyyyyggggg",
        "..ggg.yyyyy.ggg.",
        "...gg..o.o..gg..",
        "...gg..o.o..gg..",
        "...ggg.....ggg..",
        "....gg.....gg...",
        ".....gg...gg....",
        "......gg.gg.....",
        ".......g.g......",
      ],
    },
    boss_p: {
      o: [
        ".......b.b......",
        ".......b.b......",
        "....bbppbppbb...",
        ".....bppbppb....",
        "......bbbbb.....",
        ".....bvvbvvb....",
        "...bbbvvvvvbbb..",
        ".bbbbbvvvvvbbbbb",
        "..bbbbvvvvvbbbb.",
        "..bobb.p.p.bbob.",
        ".bbob..p.p..bobb",
        ".bobb.......bbob",
        ".boob.......boob",
        ".boob.......boob",
        ".bbbb.......bbbb",
        "..bb.........bb.",
      ],
      c: [
        "................",
        ".......b.b......",
        "....bbppbppbb...",
        ".....bppbppb....",
        "......bbbbb.....",
        "....bbvvbvvbb...",
        "...bbbvvvvvbbb..",
        ".bbbbbvvvvvbbbbb",
        "..bbb.vvvvv.bbb.",
        "...bb..p.p..bb..",
        "...bb..p.p..bb..",
        "...bbb.....bbb..",
        "....bb.....bb...",
        ".....bb...bb....",
        "......bb.bb.....",
        ".......b.b......",
      ],
    },
  },
  ship: {
    s: [
      ".......w........",
      ".......w........",
      ".......w........",
      "......www.......",
      "......www.......",
      "...r..www..r....",
      "...r..www..r....",
      "...w.wwwww.w....",
      "r..wbwwrwwbw..r.",
      "r..bwwrrrwwb..r.",
      "w..wwwrwrwww..w.",
      "w.wwwwwwwwwww.w.",
      "wwwwwrwwwrwwwww.",
      "www.rrwwwrr.www.",
      "ww..rr.w.rr..ww.",
      "w......w......w.",
    ],
    f: [
      ".......1........",
      ".......1........",
      ".......1........",
      "......111.......",
      "......111.......",
      "...3..111..3....",
      "...3..111..3....",
      "...1.11111.1....",
      "3..121131121..3.",
      "3..211333112..3.",
      "1..111313111..1.",
      "1.11111111111.1.",
      "111113111311111.",
      "111.3311133.111.",
      "11..33.1.33..11.",
      "1......1......1.",
    ],
  },
  squadron: {
    phases: {
      1: [
        "........ww........",
        "........ww........",
        ".......wwww.......",
        ".......wwww.......",
        ".......wwww.......",
        ".......wwww.......",
        ".......wsbw.......",
        "......wssbbw......",
        "......wsbbbw......",
        "......wbbbbw......",
        "r....wwbbbbww....r",
        "r....wwwbbwww....r",
        "r...rwwwwwwwwr...r",
        "r..rrwwwwwwwwrr..r",
        "r.rrrwwwwwwwwrrr.r",
        "rrrrrw.wrrw.wrrrrr",
        "rrrr...wrrw...rrrr",
        "rr.....wrrw.....rr",
        "r.......rr.......r",
        "........rr........",
        "........rr........",
        "........oo........",
      ],
      2: [
        "........ww........",
        "........ww........",
        ".......wwww.......",
        ".......wwww.......",
        ".......wwww.......",
        ".......wwww.......",
        ".......wsbw.......",
        "......wssbbw......",
        "......wsbbbw......",
        "......wbbbbw......",
        "r....wwbbbbww.....",
        "r....wwwbbww......",
        "r...rwwwwwwr......",
        "r..rrwwwwwwrr.....",
        "r.rrrwwwwwwrrr....",
        "rrrrrw.wrrw.orrrr.",
        "rrrr...wrrw.oorrr.",
        "rr.....wrrw..orr..",
        "r.......rr....o...",
        "........rr........",
        "........rr........",
        "........oo........",
      ],
      3: [
        "........w.........",
        "........w.........",
        ".......w.w........",
        ".......wwo........",
        ".......woo........",
        ".......woow.......",
        ".......wsbw.......",
        "......wssbbw......",
        "......wsbbbw......",
        "......wbbbbw......",
        "r....wwbbbbw......",
        "r....wwwbbb.......",
        "r...rwwwwwr.......",
        "r..rrwwwwwrr......",
        "r.rrrwwwwwrrr.....",
        "rrrrrw.wrrw.orrrr.",
        "rrrr...wrrw.oorrr.",
        "rr.....wrrw..orr..",
        "ro.....orro...o...",
        ".......orro.......",
        ".......orro.......",
        "......oooo........",
      ],
    },
  },
};
//colors \/
const colors = {
  //fire colors🔥that look cooler on the spaceship that the original galaga ship
  1: [38, 38, 38],
  2: [77, 71, 71],
  3: [250, 123, 95],
  //regular colors
  w: [222, 222, 222], //white
  r: [225, 0, 0], //red
  b: [0, 104, 222], //blue
  g: [0, 151, 151], //green
  y: [255, 255, 0], //yellow
  o: [222, 71, 0], //orange
  c: [0, 225, 222], //cyan
  v: [151, 0, 222], //violet/purple
  p: [255, 0, 222], //pink
  s: [0, 184, 222], //sky blue
  n: [0, 225, 0], //neon green
};
// draw images \/
function imgdrw(imgs, x, y) {
  for (let i = 0; i < imgs.length; i++) {
    for (let j = 0; j < imgs[i].length; j++) {
      let char = imgs[i][j];

      if (char === ".") continue; // skip transparent

      let col = colors[char];
      fill(col[0], col[1], col[2]);

      rect(x + j * pix_size, y + i * pix_size, pix_size, pix_size);
    }
  }
}
// player barier spaceship draw because I want the pix_size to be smaller that the normal size of 2 that is used in hte imgdrw function and instead make it a size of 1 pixel
function imgDrawSQAUDRON(imgs, x, y) {
  for (let i = 0; i < imgs.length; i++) {
    for (let j = 0; j < imgs[i].length; j++) {
      let char = imgs[i][j];

      if (char === ".") continue; // skip transparent

      let col = colors[char];
      fill(col[0], col[1], col[2]);

      rect(x + j, y + i, 1, 1);
    }
  }
}
// classes \/
class Player {
  constructor() {
    this.x = PLAYER_START_X;
    this.y = PLAYER_START_Y;
    this.speed = 540;
    this.alive = true;
    this.lives = 3;
    this.invulnerable = false;
    this.respawnTimer = 0;

    //code for the hitbox
    this.w = imgs.ship.f[0].length * pix_size;
    this.h = imgs.ship.f.length * pix_size;
  }

  move() {
    if (keyIsDown(65) || keyIsDown(37)) {
      this.x -= this.speed * (deltaTime / 1000);
    }
    if (keyIsDown(68) || keyIsDown(39)) {
      this.x += this.speed * (deltaTime / 1000);
    }
    this.x = constrain(this.x, 0, width - this.w);
  }

  draw() {
    imgdrw(imgs.ship.f, this.x, this.y);
  }

  shoot() {
    let playerBullets = bullets.filter((b) => b.type === "plyrb");

    if (playerBullets.length < 2) {
      bullets.push(new Bullet(this.x + this.w / 2 - 8, this.y, "plyrb"));
    }
  }
}
class Bullet {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.speed =
      type === "plyrb"
        ? difficulty.playerBulletSpeed
        : difficulty.alienBulletSpeed;

    this.w = imgs.bullets[type][0].length * pix_size;
    this.h = imgs.bullets[type].length * pix_size;
  }
  draw() {
    let sprite = imgs.bullets[this.type];
    imgdrw(sprite, this.x, this.y);
  }
  move() {
    let direction = this.type === "plyrb" ? -1 : 1;
    this.y += direction * this.speed * (deltaTime / 1000);
  }
}
class Alien {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.alive = true;
    this.sprites = imgs.aliens[type];
    this.baseX = x;
    this.baseY = y;

    // code for hitbox\/
    this.w = this.sprites.o[0].length * pix_size;
    this.h = this.sprites.o.length * pix_size;
  }

  draw(frame) {
    let sprite = this.sprites[frame === "open" ? "o" : "c"];

    this.x = this.baseX + alienOffsetX;
    this.y = this.baseY;

    imgdrw(sprite, this.x, this.y);
  }
  shoot() {
    bullets.push(new Bullet(this.x + this.w / 2 - 8, this.y + this.h, "alnb"));
  }
}
class Explosion {
  constructor(x, y, type) {
    this.x = x;
    this.y = y;
    this.phase = 1;
    this.type = imgs.explo[type];
  }
  draw() {
    if (frameCount % 10 === 0) {
      this.phase++;
    }

    if (this.phase > 4) return;

    let sprite = this.type[this.phase];
    imgdrw(sprite, this.x - 8 * pix_size, this.y - 8 * pix_size);
  }
}
class Squadron {
  constructor(x, y, speed) {
    this.x = x;
    this.y = y;
    this.phase = 1;
    this.speed = speed;
    this.sprite = imgs.squadron.phases[this.phase];
    // code for hitbox\/
    this.w = this.sprite[0].length;
    this.h = this.sprite.length;
  }
  draw() {
    this.sprite = imgs.squadron.phases[this.phase];
    if (this.x <= 0 || this.x >= width - this.w) {
      this.speed *= -1;
    }
    this.x += this.speed;
    if (this.phase <= 3) {
      imgDrawSQAUDRON(this.sprite, this.x, this.y);
    }
  }
}
//squadron functions
function drawSqad() {
  for (let squadron of squad) {
    squadron.draw();
  }
}
function setupSqad() {
  for (let i = 440; i < 710; i += 30) {
    let x = random(width - 22);
    let y = i;
    let posnegnum = random(-1, 1); //this and the if statement bloew determines if the speed will be positive ir negative. there is probably a better way to do it though😭
    if (posnegnum < 0) {
      posnegnum = -1;
    } else {
      posnegnum = 1;
    }
    let speedNum = random(1, 3);
    let speed = speedNum * posnegnum;
    squad.push(new Squadron(x, y, speed));
  }
}
// aliens functions \/
function setupAliens() {
  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 10; col++) {
      let x = ALIEN_START_X + col * spacingX;
      let y = ALIEN_START_Y + row * spacingY;
      if (shouldSkipAlien(row, col)) continue;
      if (row === 0) {
        aliens.push(new Alien(x, y, "boss_g"));
      } else if (row === 1 || row === 2) {
        aliens.push(new Alien(x, y, "butfly"));
      } else {
        aliens.push(new Alien(x, y, "bee"));
      }
    }
  }
}
function getAlienOC() {
  // switch every 30 frames (~0.5 seconds)
  if (Math.floor(frameCount / 30) % 2 === 0) {
    return "open";
  } else {
    return "closed";
  }
}
function shouldSkipAlien(row, col) {
  if (row === 0) return col <= 2 || col >= 7;
  if (row === 1 || row === 2) return col === 0 || col === 9;
  return false;
}
function drawAliens() {
  let frame = getAlienOC();
  for (let alien of aliens) {
    alien.draw(frame);
  }
}
function alienShoot() {
  if (aliens.length === 0) {
    level++;
    if (level === 6) {
      // 5 levels
      gameState = "win";
    } else {
      gameState = "level complete";
    }
    nextLevel();

    return;
  }

  // small random chance each frame
  if (random() < difficulty.alienShootChance) {
    let shooter = random(aliens);
    shooter.shoot();
  }
}
function alienBounce() {
  alienOffsetX += alienDir * 1.5;

  // bounce back
  if (alienOffsetX > 100 || alienOffsetX < -100) {
    alienDir *= -1;
  }
}
// stars functions \/
function setupStars(num) {
  for (let i = 0; i < num; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      color: random(150, 255),
      speed: random(1, 2),
      size: random(1, 3),
    });
  }
}
function drawStars() {
  for (let s of stars) {
    fill(s.color);
    rect(s.x, s.y, s.size, s.size);
    s.y += s.speed;
    if (s.y > height) s.y = 0;
  }
}
// bullets functions
function drawBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    let bullet = bullets[i];
    bullet.move();
    bullet.draw();

    let removed = false;

    for (let j = aliens.length - 1; j >= 0; j--) {
      let alien = aliens[j];
      if (!alien.alive) continue;

      if (bullet.type === "plyrb" && hit(bullet, alien)) {
        if (alien.type === "boss_g") {
          alien.type = "boss_p";
          alien.sprites = imgs.aliens["boss_p"];
        } else {
          explosions.push(new Explosion(alien.x, alien.y, "aln"));
          updateScore(alien.type);
          aliens.splice(j, 1);
        }

        bullets.splice(i, 1);
        removed = true;
        break;
      }
    }

    if (removed) continue;

    if (
      bullet.type === "alnb" &&
      hit(bullet, player) &&
      player.alive &&
      !player.invulnerable
    ) {
      explosions.push(new Explosion(player.x, player.y, "plyr"));

      player.lives--;
      player.alive = false;
      player.invulnerable = true;
      player.respawnTimer = 120;

      bullets.splice(i, 1);
      continue;
    }

    if (bullet.type === "alnb") {
      for (let k = squad.length - 1; k >= 0; k--) {
        let s = squad[k];

        if (hit(bullet, s)) {
          s.phase++;

          if (s.phase > 3) {
            squad.splice(k, 1);
          }

          bullets.splice(i, 1);
          removed = true;
          break;
        }
      }
    }

    if (removed) continue;

    if (bullet.y < BULLET_CUT_Y || bullet.y > height) {
      bullets.splice(i, 1);
    }
  }
}
function hit(a, b) {
  return (
    a.x < b.x + b.w && a.x + a.w > b.x && a.y < b.y + b.h && a.y + a.h > b.y
  );
}
function isThePlayerHit() {
  if (!player.alive) {
    player.respawnTimer--;

    if (player.respawnTimer <= 0) {
      if (player.lives > 0) {
        player.x = PLAYER_START_X;
        player.y = PLAYER_START_Y;
        player.alive = true;
        player.invulnerable = false;
      } else {
        gameState = "gameover";
      }
    }
  }
}
// explosion functions \/
function drawExplo() {
  for (let i = explosions.length - 1; i >= 0; i--) {
    explosions[i].draw();

    if (explosions[i].phase > 4) {
      explosions.splice(i, 1);
    }
  }
}
// the different screens functions \/
function drawMenu() {
  background(0);

  fill(255);
  textAlign(CENTER);
  textSize(40);
  text("GALAGA ... mostly😆", width / 2, 200);

  textSize(20);
  text("Press ENTER to Start", width / 2, 300);
  textAlign(LEFT);
}
function drawGameOver() {
  background(0);

  fill(255, 0, 0);
  textAlign(CENTER);
  textSize(40);
  text("GAME OVER", width / 2, 250);

  fill(255);
  textSize(20);
  text("Score: " + score, width / 2, 320);
  text("Press ENTER", width / 2, 360);
  textAlign(LEFT);
}
function drawWin() {
  background(0);

  fill(0, 255, 0);
  textAlign(CENTER);
  textSize(40);
  text("YOU WIN", width / 2, 250);

  fill(255);
  textSize(20);
  text("Score: " + score, width / 2, 320);
  text("Press ENTER", width / 2, 360);
  textAlign(LEFT);
}
function drawScoreboard() {
  background(0);

  fill(255);
  textAlign(CENTER);

  textSize(35);
  text("SCOREBOARD", width / 2, 200);

  textSize(20);
  text("Your Score: " + score, width / 2, 280);
  text("High Score: " + hscore, width / 2, 320);

  text("Press ENTER for Menu", width / 2, 400);
  textAlign(LEFT);
}
function drawLives() {
  fill("red");
  textSize(25);
  text("Lives", width - 65, 20);
  fill("white");
  let ls = player.lives;
  text(ls, width - 20, 45);
}
function drawLevelScreen() {
  background(0);

  fill(255);
  textAlign(CENTER);
  let l = level - 1;
  textSize(35);
  text("Level " + l + " of 5 complete", width / 2, 200);

  text("Press ENTER for next level", width / 2, 400);
  textAlign(LEFT);
}
// score functions
function drawscore() {
  fill(255);
  textSize(20);
  text(scoreZeros(hscore), 290, 40);
  text(scoreZeros(score), 0, 40);
  fill(255, 0, 0);
  textSize(25);
  text("HIGH SCORE", 245, 20);
  text("Score", 0, 20);
}
function updateHighScore() {
  if (score > hscore) {
    hscore = score;
  }
}
/* the whole point of this \/ function is to make it so that when the score is displayed the amount of digits always equals 6 */
function scoreZeros(type) {
  let scoreLength = type.toString().length;
  let amountOfZeros = 6 - scoreLength;
  let zs = "000000";
  if (amountOfZeros === 5) {
    zs = "00000";
  } else if (amountOfZeros === 4) {
    zs = "0000";
  } else if (amountOfZeros === 3) {
    zs = "000";
  } else if (amountOfZeros === 2) {
    zs = "00";
  } else if (amountOfZeros === 1) {
    zs = "0";
  } else if (amountOfZeros === 0) {
    zs = "";
  }

  let tscore = zs + type;

  return tscore;
}
function updateScore(type) {
  if (type === "bee") {
    score += 50;
  } else if (type === "butfly") {
    score += 80;
  } else if (type === "boss_g" || type === "boss_p") {
    score += 150;
  }
}
//difficulty functions
function updateDifficulty() {
  difficulty.alienBulletSpeed += 50;
  difficulty.alienShootChance += 0.01;
  difficulty.playerBulletSpeed -= 50;
}
function nextLevel() {
  updateDifficulty();
  aliens = [];
  bullets = [];
  explosions = [];
  stars = [];

  setupStars(60);
  setupAliens();
}
//self explanitory \/
function resetGame() {
  aliens = [];
  bullets = [];
  explosions = [];
  squad = [];
  stars = [];
  score = 0;
  difficulty = {
    playerBulletSpeed: 900,
    alienBulletSpeed: 300,
    alienShootChance: 0.02,
  };
  setupStars(60);
  setupAliens();
  setupSqad();

  player = new Player();
}
// draw function functions \/
function update() {
  player.move();
  alienBounce();
  isThePlayerHit();
}
function render() {
  background(0);
  drawStars();
  drawAliens();
  if (player.alive) {
    if (!player.invulnerable || frameCount % 10 < 5) {
      player.draw();
    }
  }
  drawBullets();
  updateHighScore();
  drawExplo();
  drawscore();
  alienShoot();

  drawLives();
  drawSqad();
}
// global vars that are important to the different functions \/
//#region
//spacing for aliens but for the swaying that they do
let alienOffsetX = 0;
let alienDir = 1;
//self explanitory
let pix_size = 2;

// spacing apart of aliens for the draw aliens
let spacingX = 40;
let spacingY = 36;

//starting place for player and alien
const ALIEN_START_X = 130;
const ALIEN_START_Y = 120;
let PLAYER_START_X;
let PLAYER_START_Y;

// bullet cutoff
const BULLET_CUT_Y = 0;

//dificulty
let difficulty = {
  playerBulletSpeed: 900,
  alienBulletSpeed: 300,
  alienShootChance: 0.02,
};

let stars = [];
let aliens = [];
let bullets = [];
let explosions = [];
let player;
let score = 0;
let hscore = 0;
let squad = [];
let level = 1;

// game phase \/
let gameState = "menu";

// fullscreen vars\/
let numberOfBoxClicks = 0;
let isItFullScreen = false;

// #endregion

//the actual draw function \/
function draw() {
  if (gameState === "playing") {
    update();
    render();
  } else if (gameState === "menu") {
    drawMenu();
  } else if (gameState === "win") {
    drawWin();
  } else if (gameState === "gameover") {
    drawGameOver();
  } else if (gameState === "scoreboard") {
    drawScoreboard();
  } else if (gameState === "level complete") {
    drawLevelScreen();
  }
}
function keyPressed() {
  //Enter key presses for different screens
  if (gameState === "menu" && keyCode === ENTER) {
    resetGame();
    gameState = "playing";
  } else if (gameState === "gameover" || gameState === "win") {
    if (keyCode === ENTER) {
      gameState = "scoreboard";
    }
  } else if (gameState === "scoreboard" && keyCode === ENTER) {
    gameState = "menu";
  } else if (gameState === "level complete" && keyCode === ENTER) {
    gameState = "playing";
  }

  if (keyCode === 88) {
    //shooting code with current key being x
    player.shoot();
  }

  if (keyCode === 192) {
    // 192 = ` tilda key
    let fs = fullscreen();
    fullscreen(!fs);
    numberOfBoxClicks++;
    if (numberOfBoxClicks % 2 === 0) {
      isItFullScreen = false;
    } else {
      isItFullScreen = true;
    }
  }
}
