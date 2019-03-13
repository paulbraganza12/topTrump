import { Component, OnInit } from '@angular/core';
import { StarshipsService } from '../shared/services/starships.service';
import { StarShip } from '../shared/model/StarShip.model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {


  public computerCardsData = []
  public computersTopCard = {};
  public userCardsData = [];
  public usersTopCard = {};
  selected = 'cost_in_credits';
  msg=''
  cardsCountComputer=0
  cardsCountUser=0
  public turn;

  constructor(private service: StarshipsService) { }

  ngOnInit() {
    this.assignCardsPlayers();
    this.turn = 0;
    this.msg="User always stars first"
    this.cardsCountComputer=0
    this.cardsCountUser=0
    //0 means user has to play 
    //1 means computer has to play
  }

  newGame(){
    this.computerCardsData=[]
    this.computersTopCard={}
    this.userCardsData=[]
    this.usersTopCard={}
    this.cardsCountComputer=0
    this.cardsCountUser=0
    this.msg="User always stars first"
    this.assignCardsPlayers();
  }

  assignCardsPlayers() {
    var id = '15';
    var randomNumber = 0;
    var computerIDs = [], userIDS = [];// to make sure they dont get same cards
    var starShipsAvilable = ['15', '5', '9', '10', '11', '12', '13', '21', '22', '23', '27', '28', '29']
    // Assign cards to computer
    for (var i = 0; i < 5; i++) {
      randomNumber = Math.floor(Math.random() * 12) + 1;
      while (computerIDs.includes(randomNumber)) {
        randomNumber = Math.floor(Math.random() * 12) + 1;
      }
      computerIDs.push(randomNumber);
      id = starShipsAvilable[randomNumber]
      this.service.getStarShips(id).subscribe(data => {
        this.computerCardsData.push(data)
      },
        error => {
        })
    }

    //Assign players to user
    for (var i = 0; i < 5; i++) {
      randomNumber = Math.floor(Math.random() * 12) + 1;
      while ((computerIDs.includes(randomNumber)) || (userIDS.includes(randomNumber))) {
        randomNumber = Math.floor(Math.random() * 12) + 1;
      }
      userIDS.push(randomNumber);
      id = starShipsAvilable[randomNumber]
      this.service.getStarShips(id).subscribe(data => {
        this.userCardsData.push(data)
      },
        error => {
        })

    }
  }

  onStartNewGame() {
    this.usersTopCard = this.userCardsData[0];
    this.cardsCountComputer=this.computerCardsData.length
    this.cardsCountUser=this.userCardsData.length
  }

  newCards(){
    this.usersTopCard=this.userCardsData[0];
    this.msg=''
    if(this.turn==1){
      this.computersTopCard = this.computerCardsData[0]
      this.computerPlay()
    }
  }

  userPlay() {
    if (this.turn == 0) {
      this.computersTopCard = this.computerCardsData[0]
      this.commonCheck(this.selected)
    }
    else {
      window.alert("It's computers turn..")
    }
  }

  commonCheck(selected:string){
    var category=''
    switch (selected) {
      case 'cost_in_credits': {
        category="Highest Win"
        if (parseFloat(this.usersTopCard['cost_in_credits']) >= parseFloat(this.computersTopCard['cost_in_credits'])) {
          this.msg="User wins the round as your "+category+" is greater than computers "
          this.turn=0;
          this.userCardsData.push(this.computerCardsData[0])
          this.userCardsData.push(this.userCardsData[0])
          this.userCardsData.shift();
          this.computerCardsData.shift();
        }else{
          this.msg="Computer wins the round as computers "+category+" is greater than users "
          this.turn=1;
          this.computerCardsData.push(this.userCardsData[0])
          this.computerCardsData.push(this.computerCardsData[0])
          this.computerCardsData.shift();
          this.userCardsData.shift();
        }
      }; break;
      case 'hyperdrive_rating': {
        category="HyperDrive"
        if (parseFloat(this.usersTopCard['hyperdrive_rating']) >= parseFloat(this.computersTopCard['hyperdrive_rating'])) {
          this.msg="User wins the round as your "+category+" is greater than computers "
          this.turn=0;
          this.userCardsData.push(this.computerCardsData[0])
          this.userCardsData.push(this.userCardsData[0])
          this.userCardsData.shift();
          this.computerCardsData.shift();
        }else{
          this.msg="Computer wins the round as computers "+category+" is greater than users "
          this.turn=1;
          this.computerCardsData.push(this.userCardsData[0])
          this.computerCardsData.push(this.computerCardsData[0])
          this.computerCardsData.shift();
          this.userCardsData.shift();
        }
      }; break;
      case 'max_atmosphering_speed': {
        category="Top Speed"
        if (parseFloat(this.usersTopCard['max_atmosphering_speed']) >= parseFloat(this.computersTopCard['max_atmosphering_speed'])) {
          this.msg="User wins the round as your "+category+" is greater than computers "
          this.turn=0;
          this.userCardsData.push(this.computerCardsData[0])
          this.userCardsData.push(this.userCardsData[0])
          this.userCardsData.shift();
          this.computerCardsData.shift();
        }else{
          this.msg="Computer wins the round as computers "+category+" is greater than users "
          this.turn=1;
          this.computerCardsData.push(this.userCardsData[0])
          this.computerCardsData.push(this.computerCardsData[0])
          this.computerCardsData.shift();
          this.userCardsData.shift();
        }
      }; break;
    }
    this.check();
  }

  computerPlay() {
    var randomNumber = 0;
    randomNumber = Math.floor(Math.random() * 3) + 1;
    switch(randomNumber){
      case 1:{
        this.commonCheck("cost_in_credits")
      }break;
      case 2:{
        this.commonCheck("hyperdrive_rating")
      }break;
      case 3:{
        this.commonCheck("max_atmosphering_speed")
      }break;
    }
  }

  check(){
    this.cardsCountComputer=this.computerCardsData.length
    this.cardsCountUser=this.userCardsData.length
    if(this.computerCardsData.length==0){
      window.alert("Congratulations you win..")
      this.newGame()
    }
    if(this.userCardsData.length==0){
      window.alert("Better Luck Next Time")
      this.newGame()
    }
  }

}
