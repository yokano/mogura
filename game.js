/**
 * 3DSブラウザ用もぐらたたき
 * @author yuta.okano@gmail.com
 */
enchant();

var game;

window.onload = function() {
	game = new Game();
	game.start();
};

/**
 * ゲームクラス
 * @class
 * @extends Core
 */
var Game = Class.create(Core, {
	
	/**
	 * ゲームの初期化
	 * @memberof Game
	 * @method
	 */
	initialize: function() {
		Core.call(this, 320, 450);
		this._preload();
	},
	
	/**
	 * ファイルのプリロード完了時の処理
	 * @memberof Game
	 * @method
	 */
	onload: function() {
		this._setBackground();
		var scene = new TitleScene();
		this.pushScene(scene);
	},
	
	/**
	 * シーンを切り替える
	 * @memberof Game
	 * @method
	 * @param {Sceneクラス} 新しいシーンクラス
	 */
	changeScene: function(scene) {
		this.popScene();
		this.pushScene(new scene);
	},
	
	/**
	 * 画像のプリロード
	 * @memberof Game
	 * @method
	 */
	_preload: function() {
		var files = [
			'img/background.png',
			'img/mole.png',
			'img/start_button.png',
			'img/ranking_button.png'
		];
		for(var i = 0; i < files.length; i++) {
			this.preload(files[i]);
		}
	},
	
	/**
	 * 背景画像の表示
	 * @memberof Game
	 * @method
	 */
	_setBackground: function() {
		var background = new Sprite();
		background.image = this.assets['img/background.png'];
		background.width = background.image.width;
		background.height = background.image.height;
		this.rootScene.addChild(background);
	}
});
