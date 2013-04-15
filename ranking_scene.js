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
		var self = this;
		$.ajax('/getranking', {
			data: {
				kind: 'mogura',
				limit: 10
			},
			async: false,
			dataType: 'json',
			error: function() {
				alert('通信エラーが発生したためタイトルへ戻ります');
				game.changeScene(TitleScene);
			},
			success: function(data) {
				self._showRanking(data);
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
	},
	
	/**
	 * ランキングデータを表示する
	 * @method
	 * @memberof RankingBoard
	 */
	_showRanking: function(json) {
		for(var i = 0; i < json.length; i++) {
			var label = new Label();
			label.text = (i + 1) + '位　' + json[i].Name + '　' + json[i].Score + '点';
			label.color = 'white';
			if(i < 5) {
				label.font = '20px sans-serif';
				label.x = 20;
				label.y = 35 + i * 40;
			} else {
				label.font = '15px sans-serif';
				label.x = 30;
				label.y = 100 + i * 30;
			}
			this.addChild(label);
		}
	}
});