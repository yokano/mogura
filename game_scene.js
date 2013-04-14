/**
 * ゲームプレイ画面
 * @class
 * @extends Scene
 */
var GameScene = Class.create(Scene, {
	_timer: null,
	
	/**
	 * コンストラクタ
	 * @memberof GameScene
	 * @method
	 */
	initialize: function() {
		Scene.call(this);
		this._timer = new(Timer);
	},
	
	/**
	 * シーン開始時の処理
	 * @method
	 * @memberof GameScene
	 */
	onenter: function() {
		this.addChild(this._timer);
		this._timer.start();
	}
});

/**
 * タイマー
 * @class
 * @extends Group
 */
var Timer = Class.create(Group, {
	_time: 0,
	_base: 0,
	_active: false,
	_label: null,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Timer
	 */
	initialize: function() {
		Group.call(this);
		
		var background = new Sprite();
		background.image = game.assets['img/timer.png'];
		background.width = background.image.width;
		background.height = background.image.height;
		this.addChild(background);
		
		var label = new Label();
		label.font = '50px sans-serif';
		label.text = config.time;
		label.x = 70;
		this._label = label;
		this.addChild(label);
		
		this.x = 20;
		this.y = 170;
		this.width = background.width;
		this.height = background.height;
		
		this._time = config.time;
	},

	/**
	 * タイマーを開始する
	 * @method
	 * @memberof Timer
	 */
	start: function() {
		this._base = game.frame;
		this._active = true;
	},
	
	/**
	 * タイマーを止める
	 * @method
	 * @memberof Timer
	 */
	stop: function() {
		this._active = false;
	},
	
	/**
	 * フレームごとの処理
	 * @method
	 * @memberof Timer
	 */
	onenterframe: function() {
		var interval = game.frame - this._base;
		if(interval >= config.fps) {
			this._time--;
			this._label.text = this._time;
			if(this._time < 0) {
				this._over();
			}
			this._base = game.frame;
		}
	},
	
	/**
	 * 時間切れの割り込み
	 * @method
	 * @memberof Timer
	 */
	_over: function() {
		this.stop();
		alert('ゲームオーバー\nタイトルに戻ります');
		game.changeScene(TitleScene);
	}
});
