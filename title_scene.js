/**
 * タイトル画面
 * @class
 * @extends
 * @property
 */
var TitleScene = Class.create(Scene, {
	_startButton: null,
	_rankingButton: null,
	_message: null,
	_title: null,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof TitleScene
	 */
	initialize: function() {
		Scene.call(this);
		
		var start = new Sprite();
		start.image = game.assets[img('start_button.png')];
		start.width = start.image.width;
		start.height = start.image.height;
		start.x = 10;
		start.y = 240 + 30;
		start.ontouchstart = this.start;
		this._startButton = start;
		
		var ranking = new Sprite();
		ranking.image = game.assets[img('ranking_button.png')];
		ranking.width = ranking.image.width;
		ranking.height = ranking.image.height;
		ranking.x = 170;
		ranking.y = 240 + 30;
		ranking.ontouchstart = this.ranking;
		this._rankingButton = ranking;
		
		var message = new Sprite();
		message.image = game.assets[img('down_arrow.png')];
		message.width = message.image.width;
		message.height = message.image.height;
		message.x = 30;
		message.y = 380;
		this._message = message;
		
		var title = new Sprite();
		title.image = game.assets[img('title.png')];
		title.width = title.image.width;
		title.height = title.image.height;
		title.x = 10;
		title.y = 5;
		this._title = title;
	},
	
	/**
	 * シーン開始時の処理
	 * @method
	 * @memberof TitleScene
	 */
	onenter: function() {
		this.addChild(this._startButton);
		this.addChild(this._rankingButton);
		this.addChild(this._message);
		this.addChild(this._title);
	},
	
	/**
	 * スタートボタンが押された時の処理
	 * @method
	 * @memberof TitleScene
	 */
	start: function() {
		game.changeScene(GameScene);
	},
	
	/**
	 * ランキングボタンが押された時の処理
	 * @method
	 * @memberof TitleScene
	 */
	ranking: function() {
		game.changeScene(RankingScene);
	}
});
