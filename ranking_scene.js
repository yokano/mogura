/**
 * ランキング画面
 * @class
 * @extends Scene
 */
var RankingScene = Class.create(Scene, {
	_rankingBoard: null,
	
	/**
	 * 初期化
	 * @memberof RankingScene
	 * @method
	 */
	initialize: function() {
		Scene.call(this);
		this._rankingBoard = new RankingBoard();
	},
	
	/**
	 * シーン開始時の処理
	 * @memberof RankingScene
	 * @method
	 */
	onenter: function() {
		this.addChild(this._rankingBoard);
		this._rankingBoard.load();
	}
});

/**
 * ランキング表示板
 * @class
 * @extends Group
 */
var RankingBoard = Class.create(Group, {
	/**
	 * コンストラクタ
	 * @method
	 * @memberof RankingBoard
	 */
	initialize: function() {
		Group.call(this);
		var background = new Sprite();
		background.image = game.assets[img('ranking_background.png')];
		background.width = background.image.width;
		background.height = background.image.height;
		this.addChild(background);
		
		this.x = 17;
		this.y = 12;
		this.width = background.width;
		this.height = background.height;
	},
	
	/**
	 * ランキングデータのロード
	 * @method
	 * @memberof RankingBoard
	 */
	load: function() {
		$.ajax('/getranking', {
			data: {
				kind: 'mogura',
				limit: 10
			},
			async: false,
			error: function() {
				alert('通信エラーが発生したためタイトルへ戻ります');
				game.changeScene(TitleScene);
			},
			success: function(data) {
				console.log(data);
			}
		});
	},
	
	/**
	 * タッチされたときの処理
	 * @method
	 * @memberof RankingBoard
	 */
	ontouchstart: function() {
		game.changeScene(TitleScene);
	}
});