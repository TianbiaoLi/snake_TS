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
		this.head.style.left = value + "px";
	}
	set Y(value: number) {
		this.head.style.top = value + "px";
	}

	// 设置蛇增加身体的方法
	addBody() {
		this.element.insertAdjacentElement("beforeend", "<div></div>");
	}
}
