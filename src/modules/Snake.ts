class Snake {
	// 表示蛇头的元素
	head: HTMLElement;
	// 蛇的身体（包括蛇头）
	bodies: HTMLCollection;
	// 蛇的容器
	element: HTMLElement;

	constructor() {
		this.element = document.querySelector("#snake")!;
		this.head = document.querySelector("#snake>div")!;
		this.bodies = this.element.getElementsByTagName("div");
	}

	// 获取蛇的坐标（蛇头）
	get X() {
		return this.head.offsetLeft;
	}
	get Y() {
		return this.head.offsetTop;
	}

	// 设置蛇头坐标
	set X(value: number) {
		// 新旧值相同，不需要修改
		if (this.X === value) {
			return;
		}
		// 新坐标超出范围，蛇撞墙
		if (value < 0 || value > 290) {
			throw new Error("🐍撞墙了！");
		}

		// 禁止掉头
		if (
			this.bodies[1] &&
			(this.bodies[1] as HTMLElement).offsetLeft === value
		) {
			// 发生掉头，沿反方向继续移动
			if (value > this.X) {
				//向右掉头，继续向左走
				value = this.X - 10;
			} else {
				// 向左掉头，继续向右走
				value = this.X + 10;
			}
		}

		// 移动身体
		this.moveBody();
		this.head.style.left = value + "px";
		// 检查有没有撞到自己
		this.checkHeadBody();
	}
	set Y(value: number) {
		if (this.Y === value) {
			return;
		}
		// 新坐标超出范围，蛇撞墙
		if (value < 0 || value > 290) {
			throw new Error("🐍撞墙了！");
		}

		// 禁止掉头
		if (
			this.bodies[1] &&
			(this.bodies[1] as HTMLElement).offsetTop === value
		) {
			if (value > this.Y) {
				value = this.Y - 10;
			} else {
				value = this.Y + 10;
			}
		}
		// 移动身体
		this.moveBody();
		this.head.style.top = value + "px";
		// 检查有没有撞到自己
		this.checkHeadBody();
	}

	// 设置蛇增加身体的方法
	addBody() {
		this.element.insertAdjacentHTML("beforeend", "<div></div>");
	}

	// 蛇身体移动
	moveBody() {
		for (let i = this.bodies.length - 1; i > 0; i--) {
			// 获取前面一节身体的坐标
			let X = (this.bodies[i - 1] as HTMLElement).offsetLeft;
			let Y = (this.bodies[i - 1] as HTMLElement).offsetTop;
			// 将前一节的值设置到当前节
			(this.bodies[i] as HTMLElement).style.left = X + "px";
			(this.bodies[i] as HTMLElement).style.top = Y + "px";
		}
	}

	// 检查头和身体相撞
	checkHeadBody() {
		for (let i = 4; i < this.bodies.length; i++) {
			let bd = this.bodies[i] as HTMLElement;
			if (this.X === bd.offsetLeft&& this.Y === bd.offsetTop) {
				// 蛇头撞到身体
				throw new Error("撞到自己了！");
			}
		}
	}
}
export default Snake;
