/*
First time? Check out the tutorial game:
https://sprig.hackclub.com/gallery/getting_started



*/
/*
TODO:

add AI opponent

use random chance to make AI win?

make waiting smarter, give time for the opponent to move

Gold sacks as the winning condnitgion, 

*/



const sack = "s"
const arrow = "a"

const coin = "c"

const n1 = "1"
const n2 = "2"
const n3 = "3"
const n4 = "4"

const cross = "x"

const hl = "h"
const confirm = "f"

const user = "u"
const oppo = "o"

const bgm = tune`
173.41040462427745,
173.41040462427745: D5-173.41040462427745 + C5-173.41040462427745,
173.41040462427745: F4-173.41040462427745,
173.41040462427745: F4-173.41040462427745,
173.41040462427745: C5-173.41040462427745,
173.41040462427745: A4~173.41040462427745 + G5-173.41040462427745 + C5-173.41040462427745,
173.41040462427745: A4~173.41040462427745 + G5-173.41040462427745 + B4-173.41040462427745,
173.41040462427745: A4~173.41040462427745 + G5-173.41040462427745 + B4-173.41040462427745,
173.41040462427745: A4-173.41040462427745 + G5-173.41040462427745,
173.41040462427745: B4~173.41040462427745 + F4-173.41040462427745 + F5-173.41040462427745,
173.41040462427745: B4~173.41040462427745 + C5~173.41040462427745 + F4/173.41040462427745 + F5-173.41040462427745 + G4-173.41040462427745,
173.41040462427745: B4~173.41040462427745 + D5~173.41040462427745 + F4/173.41040462427745 + F5-173.41040462427745 + G4-173.41040462427745,
173.41040462427745: C5~173.41040462427745 + A4~173.41040462427745 + D5~173.41040462427745 + F5-173.41040462427745 + G4-173.41040462427745,
173.41040462427745: C5~173.41040462427745 + D5~173.41040462427745 + A4~173.41040462427745 + F5-173.41040462427745 + G4-173.41040462427745,
173.41040462427745: D5~173.41040462427745 + A4~173.41040462427745 + F4/173.41040462427745,
173.41040462427745: G4-173.41040462427745 + F4~173.41040462427745 + E5-173.41040462427745 + D5~173.41040462427745,
173.41040462427745: D5~173.41040462427745 + E5-173.41040462427745 + F4-173.41040462427745,
173.41040462427745: D5~173.41040462427745 + E5-173.41040462427745 + F4-173.41040462427745,
173.41040462427745: E5-173.41040462427745 + D5~173.41040462427745 + F4-173.41040462427745,
173.41040462427745: C5~173.41040462427745,
173.41040462427745: G4~173.41040462427745,
173.41040462427745: D4^173.41040462427745 + F4^173.41040462427745 + G4~173.41040462427745,
173.41040462427745: G4~173.41040462427745 + A4~173.41040462427745 + F4^173.41040462427745 + E4^173.41040462427745,
173.41040462427745: A4~173.41040462427745 + D5~173.41040462427745,
173.41040462427745: A4~173.41040462427745 + F4-173.41040462427745 + D5-173.41040462427745,
173.41040462427745: B4~173.41040462427745 + A4-173.41040462427745,
173.41040462427745: D4-173.41040462427745 + F4-173.41040462427745,
173.41040462427745: B4~173.41040462427745 + D4-173.41040462427745 + F4-173.41040462427745,
173.41040462427745: F4/173.41040462427745,
173.41040462427745: F4/173.41040462427745 + G4/173.41040462427745,
173.41040462427745: G4~173.41040462427745 + E4~173.41040462427745,
173.41040462427745: A4~173.41040462427745 + F4~173.41040462427745 + B5~173.41040462427745 + A5~173.41040462427745`
const move = tune`
487.5,
37.5: C5-37.5,
37.5: C5-37.5,
37.5: C5/37.5,
37.5: C5^37.5,
562.5`
const win = tune`
393.7007874015748,
78.74015748031496: D5/78.74015748031496 + C5-78.74015748031496,
78.74015748031496: D5/78.74015748031496 + C5-78.74015748031496 + G5-78.74015748031496 + A5-78.74015748031496,
78.74015748031496: D5/78.74015748031496 + C5-78.74015748031496 + G5-78.74015748031496,
78.74015748031496: D5/78.74015748031496 + E5/78.74015748031496 + C5-78.74015748031496 + G5-78.74015748031496,
78.74015748031496: E5/78.74015748031496 + C5-78.74015748031496 + G5-78.74015748031496,
78.74015748031496: E5/78.74015748031496 + C5-78.74015748031496 + G5-78.74015748031496,
78.74015748031496: D5/78.74015748031496 + E5/78.74015748031496,
78.74015748031496: F5/78.74015748031496 + E5~78.74015748031496 + D5~78.74015748031496,
78.74015748031496: G5/78.74015748031496 + F5~78.74015748031496,
78.74015748031496: G5/78.74015748031496 + F5~78.74015748031496,
78.74015748031496: G5/78.74015748031496 + F5~78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + F5~78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + E5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + E5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + E5-78.74015748031496 + B5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + E5-78.74015748031496 + B5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + B5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + B5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + G5~78.74015748031496 + B5-78.74015748031496,
78.74015748031496: A5/78.74015748031496 + F5~78.74015748031496 + G5~78.74015748031496 + F4-78.74015748031496 + D5~78.74015748031496,
78.74015748031496: G5/78.74015748031496 + E5~78.74015748031496 + F5~78.74015748031496 + E4^78.74015748031496 + F4^78.74015748031496,
78.74015748031496: G5/78.74015748031496 + F5/78.74015748031496 + E5~78.74015748031496 + E4^78.74015748031496 + D5~78.74015748031496,
78.74015748031496: E5~78.74015748031496 + E4^78.74015748031496 + B5^78.74015748031496,
78.74015748031496: B5^78.74015748031496,
78.74015748031496: E5^78.74015748031496 + D5^78.74015748031496 + C5^78.74015748031496 + B4^78.74015748031496 + A4^78.74015748031496,
78.74015748031496: B5-78.74015748031496`
const lost = tune `
90.09009009009009,
90.09009009009009: C4~90.09009009009009 + D4~90.09009009009009 + E4~90.09009009009009 + F4~90.09009009009009 + G4~90.09009009009009,
90.09009009009009: D4-90.09009009009009 + E4-90.09009009009009 + F4-90.09009009009009,
90.09009009009009: C5/90.09009009009009 + B4/90.09009009009009,
90.09009009009009: C5~90.09009009009009 + B4/90.09009009009009 + A4/90.09009009009009 + G4/90.09009009009009 + F4/90.09009009009009,
90.09009009009009: C5~90.09009009009009 + A4/90.09009009009009 + G4/90.09009009009009 + F4/90.09009009009009 + E4/90.09009009009009,
90.09009009009009: B4~90.09009009009009 + C4~90.09009009009009 + F4-90.09009009009009,
90.09009009009009: B4~90.09009009009009 + E4~90.09009009009009 + C4~90.09009009009009,
90.09009009009009: A4~90.09009009009009 + E4~90.09009009009009 + C4~90.09009009009009 + F4-90.09009009009009,
90.09009009009009: A4~90.09009009009009 + G4~90.09009009009009 + E4~90.09009009009009 + C4~90.09009009009009 + F4-90.09009009009009,
90.09009009009009: F4~90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + G4/90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + G4/90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + G4/90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + G4/90.09009009009009,
90.09009009009009: G4/90.09009009009009 + D4-90.09009009009009 + E4-90.09009009009009 + F4-90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + G4/90.09009009009009 + D4-90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + D4-90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + D4-90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + C4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + C4/90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + C4/90.09009009009009 + D4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + C4/90.09009009009009 + D4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + A4-90.09009009009009 + C4/90.09009009009009 + D4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + A4-90.09009009009009 + C4/90.09009009009009 + D4~90.09009009009009,
90.09009009009009: F4~90.09009009009009 + E4^90.09009009009009 + A4-90.09009009009009 + C4/90.09009009009009 + D4~90.09009009009009,
90.09009009009009: A4-90.09009009009009 + C4/90.09009009009009,
90.09009009009009: C4/90.09009009009009,
90.09009009009009,
90.09009009009009: G4-90.09009009009009 + F4-90.09009009009009 + E4-90.09009009009009 + D4-90.09009009009009 + C4-90.09009009009009,
90.09009009009009: E4~90.09009009009009 + D4~90.09009009009009 + C4~90.09009009009009`

var pb = null
// ------------------
var randomGen = 15
var remaining = 10 + Math.floor(Math.random() * randomGen);

var impossible = false

var waiting = false
var players = 5

var playerWon = 7
var opponentWon = 8

var otherMap = false
var start = true

setLegend(
  [ sack, bitmap`
....00.00.......
0000.00LF0......
0...00LFF0F.....
..000FLF0FFF....
.0..00006FFFFF..
0...FFFF6F6FFFF.
...FFFF66666FFF.
...FFF6F6F6FFFFF
..FFFF6F6F6FFFFF
..FFFF6666666FFF
..FFFFFF6F6F6FFF
..FFFFFF6F6F6FFF
...FFF666666FFFF
...FFFFF6F6FFFF.
....FFFFFFFFFF..
......FFFFFF....` ],
  [ arrow, bitmap`
....00000000....
...0022222220...
..002222211220..
..02222222L120..
.0022222222120..
.0222222222220..
.0222222222220..
02222022222020..
02200020202020..
0200.020202000..
000..0202020....
.....0202000....
.....02000......
.....020........
.....020........
.....000........`],
  [coin, bitmap`
................
................
................
......0000......
.....066660.....
....06666660....
....06611660....
....06622160....
....06662160....
....06662160....
....06661660....
....06666660....
.....066660.....
......0000......
................
................`],
  [n1, bitmap`
................
................
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
........0.......
................
................`],
  [n2, bitmap`
................
.....0000000....
...........0....
...........0....
...........0....
...........0....
...........0....
.....0000000....
.....0..........
.....0..........
.....0..........
.....0..........
.....0..........
.....0000000....
................
................`],
  [n3, bitmap`
................
.....000000.....
...........0....
...........0....
...........0....
...........0....
...........0....
.....0000000....
...........0....
...........0....
...........0....
...........0....
...........0....
.....000000.....
................
................`],
  [n4, bitmap`
................
................
....0....0......
....0....0......
....0....0......
....0....0......
....0....0......
....0....0......
....000000000...
.........0......
.........0......
.........0......
.........0......
.........0......
................
................`],
    [cross, bitmap`
................
................
................
...00.......00..
...000.....000..
....000...000...
.....000.000....
......00000.....
.......000......
......00000.....
.....000.000....
....000...000...
...000.....000..
...00.......00..
................
................`],
  [hl, bitmap`
6..............6
.6............6.
..66.........6..
...6........6...
................
................
................
6666............
.............666
................
....66..........
....6...........
..66........6...
..6..........6..
.6............6.
...............6`],
  [confirm, bitmap`
6.9.66....669..6
.6.9666...699.69
.969.66..699.69.
..96..6..69.699.
...66...6...69..
....6......66...
.66666....6.....
66666...........
.996.......66666
99........666.9.
....66.........9
....69.........9
..699.......6...
..69........96..
.699........9.6.
..9.........99.6`],
  [user, bitmap`
0000000000000000
0333333333333330
0333300000033330
0330000000000330
0330000000000330
0300222222220030
0300002002000030
0300002002000030
0300002002000030
0300000000000030
0300220000220030
0330022222200330
0330000220000330
0333300000033330
0333333333333330
0000000000000000`],
  [oppo, bitmap`
0000000000000000
0555555555555550
0555500000055550
0550000000000550
0550000000000550
0500022000220050
0500222202222050
0502200202002050
0500000000000050
0500200000020050
0500200000020050
0550222002220550
0550002222000550
0555500000055550
0555555555555550
0000000000000000`]
)

setSolids([arrow, coin, cross])

let level = 9
const levels = [
  map`
.osss
...ss
....s
.....
.....
.....
...u.`,
  map`
.osss
....s
....s
.....
.....
.....
s..u.`,
  map`
.osss
....s
.....
.....
.....
s....
s..u.`,
  map`
.o.ss
....s
.....
.....
.....
s....
ss.u.`,
  map`
.o.ss
.....
.....
.....
s....
s....
ss.u.`,
  map`
.o..s
.....
.....
.....
s....
s....
sssu.`,
  map`
.o...
.....
.....
.....
s....
ss...
sssu.`,

  map`
fffff
f.ccf
f..cf
f.u.f
sc..f
ssc.f
sssff`,
    map`
hhsss
h.css
h..cs
h.o.h
hc..h
hcc.h
hhhhh`,
  map`
o.......
........
sss.....
........
cx.a....
u.1234..`,

  map`
ccccccc
c.....c
c.....c
c.....c
c.....c
cuaaaoc
ccssscc`
]

let intro = 10
setMap(levels[intro])





addText("The Bash Game", { 
    x: 4,
    y: 4,
    color: color`0`
})

addText("Whoever", { 
    x: 5,
    y: 6,
    color: color`1`
})

addText("Takes the ", { 
    x: 5,
    y: 7,
    color: color`1`
})

addText("Last Gold", { 
    x: 5,
    y: 8,
    color: color`1`
})

addText("Wins A Sack", { 
    x: 5,
    y: 10,
    color: color`3`
})

setPushables({
  
})

onInput("s", () => {
    if(start || waiting) return
playTune(move)

  // to confirm
  if(getFirst(hl) != null){
    var amt = getNum()

    if(remaining - amt >= 0)
      remaining += -amt
    else{
      getFirst(hl).remove()
      return
    }
    
    getFirst(hl).type = "f"
    
    addText(" You took " + amt, { 
      x: 7,
      y: 9,
      color: color`0`
    })
    addSprite(7, 3, coin)
    waiting = true

    
    setTimeout(() => {
      getFirst(confirm).remove()

      // Player won this round
      if(remaining == 0){
        setTimeout(() => {
              waiting = true
              clearText()
              players++
              otherMap = true
              setMap(levels[players])    
          
              setTimeout(() => {
                if(players == 6){
                  clearText()
                  setMap(levels[playerWon])
                  playTune(win)
                  addText("You Won!", { 
        x: 6,
        y: 10,
        color: color`3`
      })
                  end()
                } else{
                remaining = 10 + Math.floor(Math.random() * randomGen)
                setMap(levels[level])
                setImpossible()
                addSprite(5, 1, coin)
                waiting = false
                otherMap = false}
                updateLeftText()
              }, 1000)
            
        }, 2000)
      }else{

      // opponent's turn
      clearText()
      // updateLeftText()
      var num = 1 + Math.floor(Math.random() * 3)
      if(impossible && remaining%5 != 0){
        num = remaining%5 
      }
        
      if(remaining <= 4) num = remaining
    
      addText("He then took " + num, { 
        x: 4,
        y: 9,
        color: color`3`
      })
      remaining -= num
      updateLeftText()

      // opponent won this round
      if(remaining == 0){
        setTimeout(() => {
              waiting = true
              clearText()
              players--
              otherMap = true
              setMap(levels[players])
              
              setTimeout(() => {

                if(players == 0){
                  clearText()
                  setMap(levels[opponentWon])
                  playTune(lost)
addText("You Lost!", { 
        x: 6,
        y: 10,
        color: color`3`
      })
                  end()
                } else{                
                remaining = 10 + Math.floor(Math.random() * randomGen)
                setMap(levels[level])
                  setImpossible()
                  addSprite(5, 1, coin)
                waiting = false
                otherMap = false
                updateLeftText()}
                
              }, 1500)
            
        }, 2000)
      }else{
        setTimeout(() => {
          waiting = false
        }, 800)
      }}
    }, 800)
  } else 
    addSprite(getFirst(arrow).x, getFirst(arrow).y+1, hl)
})









onInput("a", () => {
    if(start || waiting) return
  if(getFirst(hl) != null)
    getFirst(hl).remove()
  playTune(move)
  getFirst(arrow).x += -1
  
})

onInput("d", () => {
    if(start || waiting) return
  
  if(getFirst(hl) != null)
    getFirst(hl).remove()
  if(getFirst(arrow).x + 1 < 6)
    getFirst(arrow).x += 1
  playTune(move)
})

afterInput(() => {
  updateLeftText()
  if(start){
    start = false
    pb = playTune(bgm, Infinity)
    setMap(levels[level])
    setImpossible()
    addSprite(5, 1, coin)
    updateLeftText()
  }
  
})









// ====================

function updateLeftText(){
  if(!waiting){
    clearText()
    clearTile(7, 3)
  }
  if(start || otherMap) return
  let str = "" + remaining
  if(remaining < 10)
    str = "0" + str
  addText(str + "  Left", { 
    x: 11,
    y: 4,
    color: color`0`
  })
}


function getNum(){
    let a = getTile(getFirst(hl).x, getFirst(hl).y)[0]
    
    var amt = 0
    if(a.type == "1") amt = 1
    else if(a.type == "2") amt = 2
    else if(a.type == "3") amt = 3
    else amt = 4

  return amt
}

function setImpossible(){
  impossible = Math.floor(Math.random() * 10) < players
}

function end(){
  waiting = true
  otherMap = true
  pb.end()
  
}


