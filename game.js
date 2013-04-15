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
 * 画像のファイルパスを返す
 * @function
 * @param {String} filename ファイル名
 */
var img = function(filename) {
	return config.img + filename;
}

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
		this.fps = config.fps;
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
			img('background.jpg'),
			img('mole.jpg'),
			img('start_button.jpg'),
			img('ranking_button.jpg'),
			img('timer.jpg'),
			img('down_arrow.jpg'),
			img('title.jpg'),
			img('lair.jpg'),
			img('counter.jpg')
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
		background.image = this.assets[img('background.jpg')];
		background.width = background.image.width;
		background.height = background.image.height;
		this.rootScene.addChild(background);
	}
});

/**
 * もぐらの巣
 * @class
 * @extends Sprite
 */
var Lair = Class.create(Sprite, {
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Lair
	 */
	initialize: function(x, y) {
		Sprite.call(this, x, y);
		this.image = game.assets[img('lair.jpg')];
	}
});
