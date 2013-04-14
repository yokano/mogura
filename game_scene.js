/**
 * ゲームプレイ画面
 * @class
 * @extends Scene
 */
var GameScene = Class.create(Scene, {
	_timer: null,
	lairs: null,
	counter: null,
	
	/**
	 * コンストラクタ
	 * @memberof GameScene
	 * @method
	 */
	initialize: function() {
		Scene.call(this);
		this._timer = new(Timer);
		
		this.lairs = [];
		for(var x = 0; x < 3; x++) {
			this.lairs[x] = [];
			for(var y = 0; y < 3; y++) {
				var lair = new Lair(x, y);
				this.addChild(lair);
				this.lairs[x][y] = lair;
			}
		}
		
		this.counter = new(Counter)
	},
	
	/**
	 * シーン開始時の処理
	 * @method
	 * @memberof GameScene
	 */
	onenter: function() {
		this.addChild(this._timer);
		this._timer.start();
		
		var mole = new Mole(0, 0);
		this.addChild(mole);
		
		this.addChild(this.counter);
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
		
		this.x = 10;
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

/**
 * もぐら
 * @class
 * @extends Sprite
 */
var Mole = Class.create(Sprite, {
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Mole
	 * @param {Number} x 出現させる穴の横位置(0~2)
	 * @param {Number} y 出現させる穴の縦位置(0~2)
	 */
	initialize: function(x, y) {
		Sprite.call(this);
		this.image = game.assets['img/mole.png'];
		this.width = this.image.width;
		this.height = this.image.height;
		this.x = game.currentScene.lairs[x][y].x;
		this.y = game.currentScene.lairs[x][y].y - this.height + 20;
	},
	
	/**
	 * タッチされた時の処理
	 * @method
	 * @memberof Mole
	 */
	ontouchstart: function() {
		game.currentScene.removeChild(this);
		game.currentScene.counter.increment();
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
	 * @param {Number} x 0~2
	 * @param {Number} y 0~2
	 */
	initialize: function(x, y) {
		Sprite.call(this);
		this.image = game.assets['img/lair.png'];
		this.width = this.image.width;
		this.height = this.image.height;
		this.x = 20 + x * 100;
		this.y = 290 + y * 60;
	}
});

/**
 * 叩いたもぐらのカウンタ
 * @class
 * @extends Group
 */
var Counter = Class.create(Group, {
	_count: 0,
	_label: null,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Group
	 */
	initialize: function() {
		Group.call(this);
		
		var background = new Sprite();
		background.image = game.assets['img/counter.png'];
		background.width = background.image.width;
		background.height = background.image.height;
		this.addChild(background);
		
		var label = new Label();
		label.font = '50px sans-serif';
		label.text = 0;
		label.x = 100;
		this.addChild(label);
		this._label = label;
		
		this.width = background.width;
		this.height = background.height;
		this.x = 170;
		this.y = 170;
		
		this._count = 0;
	},
	
	/**
	 * カウントを増やす
	 * @method
	 * @memberof Counter
	 */
	increment: function() {
		this._count++;
		this._label.text = this._count;
	},
	
	/**
	 * カウントをリセットする
	 * @method
	 * @memberof Counter
	 */
	reset: function() {
		this._count = 0;
		this._label.text = 0;
	}
});