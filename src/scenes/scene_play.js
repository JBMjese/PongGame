import Palas from "../gameobjects/Palas.js";
class Scene_play extends Phaser.Scene {
    constructor() {
      super({key: "Scene_play"});
      //Variables 
      this.graphics = null;
      this.izquierda = null;
      this.derecha = null;
      this.ball = null;  
    }
    create() {

      // Separador
      this.graphics = this.add.graphics();

      // Cantidad de puntos y espaciado entre ellos
      const pointsCount = 20;
      const pointSpacing = this.sys.game.config.height / pointsCount;

      // Colores para los círculos
      const centerColor = 0xffffff; 
      const outerColor = 0xffff00; 

      // Tamaño del círculo
      const outerRadius = 2; 
      const innerRadius = 1; 

      //puntos a lo largo de la línea vertical
      for (let i = 0; i < pointsCount; i++) {
          const x = this.sys.game.config.width / 2;
          const y = i * pointSpacing;

          // Círculo exterior 
          this.graphics.fillStyle(outerColor, 1);
          this.graphics.fillCircle(x, y, outerRadius);

          // Círculo interior 
          this.graphics.fillStyle(centerColor, 1);
          this.graphics.fillCircle(x, y, innerRadius);
      } 

      // Posición central de la pantalla
      const centerHeight = this.sys.game.config.height / 2;

      // Pala izquierda
      this.izquierda = new Palas(this, 30, centerHeight, "izquierda");

      // Pala derecha
      this.derecha = new Palas(this, this.sys.game.config.width - 30, centerHeight, "derecha");
       

      // Ball
      this.physics.world.setBoundsCollision(false, false, true, true);
      const centerWidth = this.sys.game.config.width / 2;
      this.ball = this.physics.add.image(centerWidth, centerHeight, "ball");
      this.ball.setCollideWorldBounds(true);
      this.ball.setBounce(1);

      const BALL_SPEED = -180;
      this.ball.setVelocityX(BALL_SPEED);

      // Colisión entre la bola y la pala izquierda
      this.physics.add.collider(this.ball, this.izquierda, this.chocaPala, null, this);
      this.physics.add.collider(this.ball, this.derecha, this.chocaPala, null, this);
   
      // Controles
      //Pala derecha
      this.cursor = this.input.keyboard.createCursorKeys();


      //Pala izquierda
      this.cursor_W = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
      this.cursor_S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    }  
    update() {

      if(this.ball.x < 0 || this.ball.x > this.sys.game.config.width) {
        this.ball.setPosition(this.sys.game.config.width/2, this.sys.game.config.height/2);
      }
      //Control de las palas
      //Pala derecha
      if (this.cursor.down.isDown) {
        this.derecha.body.setVelocityY(300);
      } else if(this.cursor.up.isDown) {
        this.derecha.body.setVelocityY(-300);
      } else {
        this.derecha.body.setVelocityY(0);
      }
      //Pala izquierda
      if (this.cursor_S.isDown) {
        this.izquierda.body.setVelocityY(300);
      } else if(this.cursor_W.isDown) {
        this.izquierda.body.setVelocityY(-300);
      } else {
        this.izquierda.body.setVelocityY(0);
      } 
    } 
  
  chocaPala() {
    this.ball.setVelocityY(Phaser.Math.Between(-120,120));
  }
} 
export default Scene_play;