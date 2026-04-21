"use strict";
import { TSprite } from "libSprite";
import { EGameStatus, menu, isSoundOn } from "./FlappyBird.mjs";
import { TSineWave } from "lib2d";
import { TSoundFile } from "libSound";

const fnFood = "./Media/food.mp3";
const fnHeroIsDead = "./Media/heroIsDead.mp3";
const fnGameOver = "./Media/gameOver.mp3";

export class THero extends TSprite {
  #gravity;
  #speed;
  #wave;
  #sfFood;
  #sfHeroIsDead;
  #sfGameOver;
  constructor(aSpcvs, aSPI) {
    super(aSpcvs, aSPI, 100, 20);
    this.animationSpeed = 20;
    this.#gravity = 9.81 / 100;
    this.#speed = 0;
    this.#wave = new TSineWave(1, 1);
    this.y += this.#wave.value;
    this.#sfFood = null;
    this.#sfHeroIsDead = null;
    this.#sfGameOver = null;
  }

  eat() {
    if (this.#sfFood === null && isSoundOn) {
      this.#sfFood = new TSoundFile(fnFood);
    } else {
      if (isSoundOn === true) {
        this.#sfFood.stop();
      }
    }

    if(isSoundOn) {
      this.#sfFood.play();
    }
  }

  animate() {
    const hasGravity = EGameStatus.state === EGameStatus.gaming || EGameStatus.state === EGameStatus.heroIsDead;

    if (hasGravity) {
      if (this.y < 400 - this.height) {
        this.#speed += this.#gravity; // increase speed due to gravity
        this.y += this.#speed; // update position based on speed
        if (this.rotation < 90) {
          // limit max rotation
          this.rotation = this.#speed * 25; // tilt down based on speed
        }
      } else {
        EGameStatus.state = EGameStatus.gameOver;
        menu.stopSound();
        this.animationSpeed = 0;
        
        if (isSoundOn) {
          this.#sfGameOver = new TSoundFile(fnGameOver);
          this.#sfGameOver.play();
        }

        menu.showGameOver();
      }
    } else if (EGameStatus.state === EGameStatus.idle) {
      this.y += this.#wave.value;
    }
  } // End of animate

  dead(){
    if (isSoundOn) {
      this.#sfHeroIsDead = new TSoundFile(fnHeroIsDead);
      this.#sfHeroIsDead.play();
    }
  }

  flap() {
    this.#speed = -3.5;
    this.rotation = 0;
  }

  restart() {
    EGameStatus.state = EGameStatus.idle;
    this.y = 40;
    this.y += this.#wave.value;
    this.#speed = 0;
    this.rotation = 0;
    this.animationSpeed = 20;
  }
}
