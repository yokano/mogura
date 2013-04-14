/**
 * ゲームプレイ画面
 * @class
 * @extends Scene
 */
var GameScene = Class.create(Scene, {
	/**
	 * コンストラクタ
	 * @memberof GameScene
	 * @method
	 */
	initialize: function() {
		Scene.call(this);
	},
	
	/**
	 * シーン開始時の処理
	 * @method
	 * @memberof GameScene
	 */
	onenter: function() {
	}
});

/**
 * タイマー
 * @class
 * @extends Group
 */
var Timer = Class.create(Group, {
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Timer
	 */
	initialize: function() {
		var background = new Sprite();
		background.image = game.assets['img/timer.png'];
		background.width = background.image.width;
		background.height = background.image.height;
		background.x = 20;
		background.y = 100;
		this.addChild(background);
	},

	/**
	 * タイマーを開始する
	 * @method
	 * @memberof Timer
	 */
	start: function() {
		
	},
	
	/**
	 * タイマーを止める
	 * @method
	 * @memberof Timer
	 */
	stop: function() {
	
	}
});

/**
 * もぐらを表すクラス
 * @class
 * @extends Sprite
 */
var Mole = Class.create(Sprite, {
	initialize: function() {
		
	}
});