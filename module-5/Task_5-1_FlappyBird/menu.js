"use strict";
import { TSprite, TSpriteButton, TSpriteNumber} from "libSprite";
import { startGame, isSoundOn, highScores, EGameStatus, hero, obstacles, baits } from "./FlappyBird.mjs";
import { TSoundFile } from "libSound";

const fnCountDown = "./Media/countDown.mp3";
const fnRunning = "./Media/running.mp3";

export class TMenu{
  #spTitle;
  #spPlayBtn;
  #spCountDown;
  #sfCountDown;
  #sfRunning;
  #spGameScore;
  #gameOverBoard;
  #medal;
  #scoreBoardResult;
  #scoreBoardBest;
  #getReady;
  constructor(aSpcvs, aSPI){
    this.#spTitle = new TSprite(aSpcvs, aSPI.flappyBird, 200, 100);
    this.#spPlayBtn = new TSpriteButton(aSpcvs, aSPI.buttonPlay, 240, 180);
    this.#spPlayBtn.addEventListener("click", this.spPlayBtnClick.bind(this));
    this.#spCountDown = new TSpriteNumber(aSpcvs, aSPI.numberBig, 280, 190);
    this.#spCountDown.visible = false;
    this.#sfCountDown = null;
    this.#sfRunning = null;
    this.#spGameScore = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 10, 10);
    this.#spGameScore.alpha = 0.5;
    this.#gameOverBoard = new TSprite(aSpcvs, aSPI.gameOver, 180, 250);
    this.#gameOverBoard.visible = false;
    this.#scoreBoardResult = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 356, 285);
    this.#scoreBoardResult.visible = false;
    this.#scoreBoardBest = new TSpriteNumber(aSpcvs, aSPI.numberSmall, 360, 327);
    this.#scoreBoardBest.visible = false;
    this.#medal = new TSprite(aSpcvs, aSPI.medal, 205, 291);
    console.log(this.#medal)
    this.#medal.visible = false;
    this.#getReady = new TSprite(aSpcvs, aSPI.infoText, 193, 100);
    this.#getReady.visible = false;
  }

  incGameScore(aScore){
    this.#spGameScore.value += aScore;
  }

  stopSound(){
    if (this.#sfRunning !== null) {
      this.#sfRunning.stop();
    }
  }

  draw(){
    this.#gameOverBoard.draw();
    this.#scoreBoardResult.draw();
    this.#scoreBoardBest.draw();
    this.#medal.draw();

    this.#spTitle.draw();
    this.#spPlayBtn.draw();
    this.#spCountDown.draw();
    this.#spGameScore.draw();
    this.#getReady.draw();
  }

  countDown(){
    this.#spCountDown.value--;
    if(this.#spCountDown.value > 0){
      setTimeout(this.countDown.bind(this), 1000);  
    }else{
      this.#spCountDown.visible = false;
      this.#getReady.visible = false;
      if (isSoundOn === true) {
        this.#sfRunning = new TSoundFile(fnRunning);
        this.#sfRunning.play();
      }
      startGame();
    }
    
  }

  spPlayBtnClick(){
    console.log("Click!");
    if (EGameStatus.state === EGameStatus.gameOver) {
      this.resetGame()
    }
    this.#spTitle.hidden = true;
    this.#spPlayBtn.hidden = true;
    this.#getReady.visible = true;
    this.#spCountDown.visible = true;
    this.#spCountDown.value = 3;
    if (isSoundOn) {
      this.#sfCountDown = new TSoundFile(fnCountDown);
      this.#sfCountDown.play();
    };
    setTimeout(this.countDown.bind(this), 1000);
  }

  resetGame() {
    // Hide game over UI
    this.#gameOverBoard.visible = false;
    this.#scoreBoardResult.visible = false;
    this.#scoreBoardBest.visible = false;
    this.#medal.visible = false;

    // Reset Score
    this.#spGameScore.visible = true;
    this.#spGameScore.value = 0;

    // Return birb to correct coordinates
    hero.restart()

    // Remove food and obstacle
      obstacles.length = 0;
      baits.length = 0;
  }



  #findCorrectMedal(aScore) {
    const gold = 1, silver = 2, bronze = 3, none = 0

    if (aScore > 3) {
      return gold;
    } else if (aScore === 2) {
      return silver;
    } else if (aScore === 1) {
      return bronze;
    }
    return none;
  }

  showGameOver() {
    if (isSoundOn) {
      this.stopSound()
    }

    this.#spGameScore.visible = false;

    this.#gameOverBoard.visible = true;
    this.#scoreBoardResult.value = this.#spGameScore.value;
    this.#scoreBoardResult.visible = true;

    if (highScores.length === 0 || highScores[highScores.length-1] < this.#scoreBoardResult.value) {
      const newBest = this.#scoreBoardResult.value;
      this.#scoreBoardBest.value = newBest;

      highScores.push(newBest);
    }

    this.#scoreBoardBest.visible = true;

    const medalType = this.#findCorrectMedal(this.#scoreBoardResult.value)
    this.#medal.index = medalType;
    this.#medal.visible = true;

    this.#spPlayBtn.hidden = false;
  }

}