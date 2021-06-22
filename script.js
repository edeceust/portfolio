var move_count = 0;
var target_pocket = 0;
var player_turn = 1;
var check_no_move1 = 1;
var check_no_move2 = 2;
var move_count_hover = 0;
var target_pocket_hover = 0;

function highlight(id) {
  //lock opponent's side
  if (player_turn == 1 && document.getElementById(id).id > 7) {

  }
    else if (player_turn == 2 && document.getElementById(id).id < 7) {
    }
    else {
  //set values
move_count_hover = document.getElementById(id).value;
target_pocket_hover = document.getElementById(id).id;
while (move_count_hover > 0) {
//make the pocket reset to the start
  if (target_pocket_hover == 14) {
    target_pocket_hover = 0;
  }

//add and move and highlight
if (player_turn == 1 && target_pocket_hover == 13) {
  target_pocket_hover = 1;
  document.getElementById(target_pocket_hover).style.backgroundColor = "yellow";
  move_count_hover--;
}
else if (player_turn == 2 && target_pocket_hover == 6) {
  target_pocket_hover += 2;
  document.getElementById(target_pocket_hover).style.backgroundColor = "yellow";
  move_count_hover--;
}
else {
  target_pocket_hover++;
  document.getElementById(target_pocket_hover).style.backgroundColor = "yellow";
  move_count_hover--;
}
}
//don't highlight opponent's mancala area

}
}

function removeHighlight() {
  var x = document.getElementsByClassName("pocket_value");
var i;
for (i = 0; i < x.length; i++) {
  x[i].style.backgroundColor = "white";
}
document.getElementById("7").style.backgroundColor = "white";
document.getElementById("14").style.backgroundColor = "white";
}

function move(id) {
//lock opponent's side
if (player_turn == 1 && document.getElementById(id).id > 7) {

}
  else if (player_turn == 2 && document.getElementById(id).id < 7) {
  }
//lock zero pockets
  else if (document.getElementById(id).value == 0) {

  }
  //do the action now
  else {


    //set values
  move_count = document.getElementById(id).value;
  target_pocket = document.getElementById(id).id;
//toggle player turns
  if (player_turn == 1) {
    player_turn = 2;
      }
      else if (player_turn == 2) {
        player_turn = 1;
      }
//populate player turn text
  document.getElementById("player_turn").innerHTML = player_turn;

  document.getElementById(id).value = 0;
  document.getElementById(id).innerHTML = 0;

  while (move_count > 0) {
//make the pocket reset to the start
    if (target_pocket == 14) {
      target_pocket = 0;
    }
//don't let score increase on opponent's mancala area
      else if (player_turn == 2 && target_pocket == 13) {
        target_pocket = 0;
      }
      else if (player_turn == 1 && target_pocket == 6) {
        target_pocket = 7;
      }
//add and move
    target_pocket++;
    document.getElementById(target_pocket).value++;
    move_count--;
  }

//clear update text
document.getElementById("update").innerHTML = "&nbsp;";
//check if they landed in mancala area
repeatTurn();
//check if they landed in an empty pocket
checkBonus();
  //check for end of game
checkNoMove();
//color player turn
if (player_turn == 1) {
  document.getElementById("player_text").style.color = "red";
}
else if (player_turn == 2) {
  document.getElementById("player_text").style.color = "blue";
}

}
}

function checkNoMove() {
//check to see if either side has 0
  check_no_move1 = parseFloat(document.getElementById(1).value) + parseFloat(document.getElementById(2).value) + parseFloat(document.getElementById(3).value) + parseFloat(document.getElementById(4).value) + parseFloat(document.getElementById(5).value) + parseFloat(document.getElementById(6).value);
  check_no_move2 = parseFloat(document.getElementById(8).value) + parseFloat(document.getElementById(9).value) + parseFloat(document.getElementById(10).value) + parseFloat(document.getElementById(11).value) + parseFloat(document.getElementById(12).value) + parseFloat(document.getElementById(13).value);

  if (check_no_move1 == 0){
    document.getElementById(14).value = parseFloat(document.getElementById(14).value) + check_no_move2;
    document.getElementById(8).value = 0;
    document.getElementById(9).value = 0;
    document.getElementById(10).value = 0;
    document.getElementById(11).value = 0;
    document.getElementById(12).value = 0;
    document.getElementById(13).value = 0;
    document.getElementById("update").innerHTML = "Game Over!  Player 1 has no more stones.  Player 2 collects all the remaining stones.";
  }
  else if (check_no_move2 == 0){
    document.getElementById(7).value = parseFloat(document.getElementById(7).value) + check_no_move1;
    document.getElementById(1).value = 0;
    document.getElementById(2).value = 0;
    document.getElementById(3).value = 0;
    document.getElementById(4).value = 0;
    document.getElementById(5).value = 0;
    document.getElementById(6).value = 0;
    document.getElementById("update").innerHTML = "Game Over!  Player 2 has no more stones.  Player 1 collects all the remaining stones.";
  }

}
//player repeats if it ends in mancala area
function repeatTurn() {
  if (player_turn == 2 && target_pocket == 7) {
    player_turn = 1;
    document.getElementById("update").innerHTML = "Player 1 gets another turn for ending in mancala area.";
  }
  else if (player_turn == 1 && target_pocket == 14) {
    player_turn = 2;
    document.getElementById("update").innerHTML = "Player 2 gets another turn for ending in mancala area.";
  }
document.getElementById("player_turn").innerHTML = player_turn;
}

function checkBonus() {
  if (move_count == 0 && document.getElementById(target_pocket).value == 1) {
//player 1 bonus
    if (player_turn == 2 && target_pocket == 1) {
      bonus = parseFloat(document.getElementById(1).value) + parseFloat(document.getElementById(13).value);
      document.getElementById(7).value = parseFloat(document.getElementById(7).value) + bonus;
      document.getElementById(1).value = 0;
      document.getElementById(13).value = 0;
      document.getElementById("update").innerHTML = "Player 1 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 2 && target_pocket == 2) {
      bonus = parseFloat(document.getElementById(2).value) + parseFloat(document.getElementById(12).value);
      document.getElementById(7).value = parseFloat(document.getElementById(7).value) + bonus;
      document.getElementById(2).value = 0;
      document.getElementById(12).value = 0;
      document.getElementById("update").innerHTML = "Player 1 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 2 && target_pocket == 3) {
      bonus = parseFloat(document.getElementById(3).value) + parseFloat(document.getElementById(11).value);
      document.getElementById(7).value = parseFloat(document.getElementById(7).value) + bonus;
      document.getElementById(3).value = 0;
      document.getElementById(11).value = 0;
      document.getElementById("update").innerHTML = "Player 1 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 2 && target_pocket == 4) {
      bonus = parseFloat(document.getElementById(4).value) + parseFloat(document.getElementById(10).value);
      document.getElementById(7).value = parseFloat(document.getElementById(7).value) + bonus;
      document.getElementById(4).value = 0;
      document.getElementById(10).value = 0;
      document.getElementById("update").innerHTML = "Player 1 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 2 && target_pocket == 5) {
      bonus = parseFloat(document.getElementById(5).value) + parseFloat(document.getElementById(9).value);
      document.getElementById(7).value = parseFloat(document.getElementById(7).value) + bonus;
      document.getElementById(5).value = 0;
      document.getElementById(9).value = 0;
      document.getElementById("update").innerHTML = "Player 1 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 2 && target_pocket == 6) {
      bonus = parseFloat(document.getElementById(6).value) + parseFloat(document.getElementById(8).value);
      document.getElementById(7).value = parseFloat(document.getElementById(7).value) + bonus;
      document.getElementById(6).value = 0;
      document.getElementById(8).value = 0;
      document.getElementById("update").innerHTML = "Player 1 captures bonus for ending in empty pocket.";
    }
//player 2 bonus
    else if (player_turn == 1 && target_pocket == 8) {
      bonus = parseFloat(document.getElementById(6).value) + parseFloat(document.getElementById(8).value);
      document.getElementById(14).value = parseFloat(document.getElementById(14).value) + bonus;
      document.getElementById(6).value = 0;
      document.getElementById(8).value = 0;
      document.getElementById("update").innerHTML = "Player 2 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 1 && target_pocket == 9) {
      bonus = parseFloat(document.getElementById(5).value) + parseFloat(document.getElementById(9).value);
      document.getElementById(14).value = parseFloat(document.getElementById(14).value) + bonus;
      document.getElementById(5).value = 0;
      document.getElementById(9).value = 0;
      document.getElementById("update").innerHTML = "Player 2 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 1 && target_pocket == 10) {
      bonus = parseFloat(document.getElementById(4).value) + parseFloat(document.getElementById(10).value);
      document.getElementById(14).value = parseFloat(document.getElementById(14).value) + bonus;
      document.getElementById(4).value = 0;
      document.getElementById(10).value = 0;
      document.getElementById("update").innerHTML = "Player 2 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 1 && target_pocket == 11) {
      bonus = parseFloat(document.getElementById(3).value) + parseFloat(document.getElementById(11).value);
      document.getElementById(14).value = parseFloat(document.getElementById(14).value) + bonus;
      document.getElementById(3).value = 0;
      document.getElementById(11).value = 0;
      document.getElementById("update").innerHTML = "Player 2 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 1 && target_pocket == 12) {
      bonus = parseFloat(document.getElementById(2).value) + parseFloat(document.getElementById(12).value);
      document.getElementById(14).value = parseFloat(document.getElementById(14).value) + bonus;
      document.getElementById(2).value = 0;
      document.getElementById(12).value = 0;
      document.getElementById("update").innerHTML = "Player 2 captures bonus for ending in empty pocket.";
    }
    else if (player_turn == 1 && target_pocket == 13) {
      bonus = parseFloat(document.getElementById(1).value) + parseFloat(document.getElementById(13).value);
      document.getElementById(14).value = parseFloat(document.getElementById(14).value) + bonus;
      document.getElementById(1).value = 0;
      document.getElementById(13).value = 0;
      document.getElementById("update").innerHTML = "Player 2 captures bonus for ending in empty pocket.";
    }
  }
  else {}
}
function testing() {

//don't let computer button select a 0 value
var valid = 0;
while (valid == 0) {
var random = Math.floor(Math.random() * 6) + 8;
var selection = document.getElementById(random).value;
  if (selection > 0) {
    document.getElementById(random).click();
    valid = 1;
}
  else if (selection == 0) {
    valid = 0;
  }
 }
}
