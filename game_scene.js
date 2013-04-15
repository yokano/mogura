/**
 * ゲームプレイ画面
 * @class
 * @extends Scene
 */
var GameScene = Class.create(Scene, {
	timer: null,
	popTimer: null,
	lairs: null,
	counter: null,
	
	/**
	 * コンストラクタ
	 * @memberof GameScene
	 * @method
	 */
	initialize: function() {
		Scene.call(this);
		this.timer = new(Timer);
		this.popTimer = new(PopTimer);
		
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
		this.addChild(this.timer);
		this.addChild(this.popTimer);
		this.addChild(this.counter);
		this.timer.start();
		this.popTimer.start();
	},
	
	/**
	 * 空いている巣穴をランダムに取得する
	 * @method
	 * @memberof GameScene
	 * @returns {Lair} 空いている巣穴
	 */
	_getEmptyLair: function() {
		var emptyLairs = [];
		for(var x = 0; x < 3; x++) {
			for(var y = 0; y < 3; y++) {
				if(game.currentScene.lairs[x][y].full == false) {
					emptyLairs.push(game.currentScene.lairs[x][y]);
				}
			}
		}
		
		var result;
		if(emptyLairs.length == 0) {
			result = null;
		} else {
			var r = Math.floor(Math.random() * emptyLairs.length);
			result = emptyLairs[r];
		}
		return result;
	},
	
	/**
	 * もぐらをランダムな穴に出現させる
	 * @method
	 * @memberof GameScene
	 */
	pop: function() {
		var lair = this._getEmptyLair();
		if(lair != null) {
			var mole = new Mole(lair.pos_x, lair.pos_y);
			this.addChild(mole);
		}
	},
	
	/**
	 * ゲームオーバー時の処理
	 * @method
	 * @memberof GameScene
	 */
	over: function() {
		if(confirm(this.counter.get() + '点です。\nランキングに登録しますか？')) {
			do {
				var name = prompt('名前を入力してください', '名無し');
			} while(name == '');
			
			$.ajax('/putranking', {
				data: {
					name: name,
					score: this.counter.get(),
					kind: 'mogura'
				},
				async: false,
				error: function() {
					alert('通信エラーが発生したため保存を中止しました');
				},
				success: function() {
					alert('ランキングに登録しました');
				}
			});
		}
		game.changeScene(TitleScene);
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
		background.image = game.assets[img('timer.png')];
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
			} else if(this._time == 1) {
				this.scene.popTimer.stop();
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
		this.scene.over();
	},
	
	/**
	 * 残り時間を取得
	 * @method
	 * @memberof Timer
	 */
	getTime: function() {
		return this._time;
	}
});

/**
 * もぐら
 * @class
 * @extends Sprite
 */
var Mole = Class.create(Sprite, {
	_lair_x: 0,
	_lair_y: 0,
	_FRAME_NUM: 5,
	_direction: 1,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Mole
	 * @param {Number} x 出現させる穴の横位置(0~2)
	 * @param {Number} y 出現させる穴の縦位置(0~2)
	 */
	initialize: function(x, y) {
		Sprite.call(this);
		
		if(game.currentScene.lairs[x][y].full) {
			console.log('the lair is full!');
			return;
		}
		
		this._lair_x = x;
		this._lair_y = y;
		
		this.image = game.assets[img('mole.png')];
		this.width = this.image.width / this._FRAME_NUM;
		this.height = this.image.height;
		this.x = game.currentScene.lairs[x][y].x;
		this.y = game.currentScene.lairs[x][y].y - this.height + 20;
		this.frame = 0;
		
		game.currentScene.lairs[x][y].full = true;
	},
	
	onenterframe: function() {
		this.frame += this._direction;
		if(this.frame >= this._FRAME_NUM - 1) {
			this._direction = -1;
		} else if(this.frame <= 0) {
			this._remove();
		}
	},
	
	/**
	 * タッチされた時の処理
	 * @method
	 * @memberof Mole
	 */
	ontouchstart: function() {
		this._star();
		game.currentScene.counter.increment();
		this._remove();
	},
	
	/**
	 * もぐらを削除する
	 * @method
	 * @memberof Mole
	 */
	_remove: function() {
		this.scene.removeChild(this);
		game.currentScene.lairs[this._lair_x][this._lair_y].full = false;
	},
	
	/**
	 * 叩かれた時のアニメーションを再生
	 * @method
	 * @memberof Mole
	 */
	_star: function() {
		var star = new Star(this.x, this.y);
	}
});

var Star = Class.create(Sprite, {
	initialize: function(x, y) {
		Sprite.call(this);
		this.image = game.assets[img('star.png')];
		this.width = this.image.width / 2;
		this.height = this.image.height;
		this.x = x;
		this.y = y;
		this.frame = 0;
		game.currentScene.addChild(this);
	},
	onenterframe: function() {
		this.frame++;
		if(this.frame >= 2) {
			this.scene.removeChild(this);
		}
	}
	
});

/**
 * もぐらの巣
 * @class
 * @extends Sprite
 * @property {bool} full もぐらで塞がっていたらtrue
 * @property {Number} pos_x X座標(0~2)
 * @property {Number} pos_y Y座標(0~2)
 */
var Lair = Class.create(Sprite, {
	full: false,
	pos_x: 0,
	pos_y: 0,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof Lair
	 * @param {Number} x 0~2
	 * @param {Number} y 0~2
	 */
	initialize: function(x, y) {
		Sprite.call(this);
		
		this.pos_x = x;
		this.pos_y = y;
		this.image = game.assets[img('lair.png')];
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
		background.image = game.assets[img('counter.png')];
		background.width = background.image.width;
		background.height = background.image.height;
		this.addChild(background);
		
		var label = new Label();
		label.font = '50px sans-serif';
		label.text = 0;
		label.x = 70;
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
	},
	
	/**
	 * カウントを取得する
	 * @method
	 * @memberof Counter
	 */
	get: function() {
		return this._count;
	}
});

/**
 * もぐらをぽっぷさせるタイマー
 * @class
 */
var PopTimer = Class.create(Node, {
	_base: 0,
	_active: false,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof PopTimer
	 */ 
	initialize: function() {
		Node.call(this);
		this._base = game.frame;
	},
	
	/**
	 * フレームごとの処理
	 * @method
	 * @memberof PopTimer
	 */
	onenterframe: function() {
		if(this._active) {
			if(game.frame - this._base > config.fps / 2) {
				var time = this.scene.timer.getTime();
				var molenum = 0;
				if(time < 5) {
					molenum = 4;
				} else if(time < 10) {
					molenum = 3;
				} else if(time < 20) {
					molenum = 2;
				} else {
					molenum = 1;
				}
				
				for(var i = 0; i < molenum; i++) {
					this.scene.pop();
				}
				this._base = game.frame;
			}
		}
	},
	
	/**
	 * タイマー開始
	 * @method
	 * @memberof PopTimer
	 */
	start: function() {
		this._active = true;
	},
	
	/**
	 * タイマー停止
	 * @method
	 * @memberof PopTimer
	 */
	stop: function() {
		this._active = false;
	}
});