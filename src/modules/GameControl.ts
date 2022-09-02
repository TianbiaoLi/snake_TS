import Snake from "./Snake";
import Food from "./Food";
import ScorePanel from "./ScorePanel";

// 游戏控制器
class GameControl {
	// 定义三个属性
	snake: Snake;
	food: Food;
	scorePanel: ScorePanel;
	// 存储按键，表示移动方向
	direction: string = "";
	// 记录游戏是否结束
	isLive = true;

	constructor() {
		this.snake = new Snake();
		this.food = new Food();
		this.scorePanel = new ScorePanel();

		this.init();
	}

	// 游戏初始化，调用后游戏开始
	init() {
		// 绑定键盘按下事件
		document.addEventListener("keydown", this.keyDownHandler.bind(this));
		this.run();
	}

	// 键盘按下的响应函数
	keyDownHandler(event: KeyboardEvent) {
		// 修改direction属性
		this.direction = event.key;
	}

	// 控制蛇移动的方法
	run() {
		// 获取当前位置
		let X = this.snake.X;
		let Y = this.snake.Y;

        // 根据方向设置蛇更新后的位置
		switch (this.direction) {
			case "ArrowUp":
			case "w":
				Y -= 10;
				break;
			case "ArrowDown":
			case "s":
				Y += 10;
				break;
			case "ArrowLeft":
			case "a":
				X -= 10;
				break;
			case "ArrowRight":
			case "d":
				X += 10;
				break;
			default:
				break;
		}

        // 检查是否吃到食物（放到准备更新之后，实际更新之前，在实际更新前调用，增加流畅度）
        this.checkEat(X, Y)

		// 更新蛇的位置
		try {
			this.snake.X = X;
			this.snake.Y = Y;
		} catch (error: any) {
			// 出现异常，游戏结束
			alert(error.message + "，游戏结束");
			this.isLive = false;
		}

		// 开启定时调用
		this.isLive &&
			setTimeout(
				this.run.bind(this),
				300 - (this.scorePanel.level - 1) * 30
			);
	}

	// 检查是否吃到食物
	checkEat(X: number, Y: number) {
        if(X === this.food.X && Y === this.food.Y){
            // 刷新食物位置
			this.food.change();
			// 分数增加
			this.scorePanel.addScore();
			// 蛇增加一节
			this.snake.addBody();
        }
	}
}
export default GameControl;
