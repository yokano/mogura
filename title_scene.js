/**
 * タイトル画面
 * @class
 * @extends
 * @property
 */
var TitleScene = Class.create(Scene, {
	_startButton: null,
	_rankingButton: null,
	
	/**
	 * コンストラクタ
	 * @method
	 * @memberof TitleScene
	 */
	initialize: function() {
		Scene.call(this);
		
		var start = new Sprite();
		start.image = game.assets['img/start_button.png'];
		start.width = start.image.width;
		start.height = start.image.height;
		start.x = 10;
		start.y = 240 + 30;
		start.ontouchstart = this.start;
		this._startButton = start;
		
		var ranking = new Sprite();
		ranking.image = game.assets['img/ranking_button.png'];
		ranking.width = ranking.image.width;
		ranking.height = ranking.image.height;
		ranking.x = 170;
		ranking.y = 240 + 30;
		ranking.ontouchstart = this.ranking;
		this._rankingButton = ranking;
	},
	
	/**
	 * シーン開始時の処理
	 * @method
	 * @memberof TitleScene
	 */
	onenter: function() {
		this.addChild(this._startButton);
		this.addChild(this._rankingButton);
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
