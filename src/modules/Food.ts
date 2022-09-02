// 定义食物类
class Food {
	// 定义属性，表示食物的对应的元素
	element: HTMLElement;

	constructor() {
		// 获取页面中的food元素并将其赋值给element
		this.element = document.querySelector("#food")!;
	}

	// 定义获取食物坐标方法
	get X() {
		return this.element.offsetLeft;
	}
	get Y() {
		return this.element.offsetTop;
	}

	// 食物的位置刷新
	change() {
		// 生成随机位置(0-290px)且为整10
		const top = Math.floor(Math.random() * 30) * 10 + "px";
		const left = Math.floor(Math.random() * 30) * 10 + "px";
		this.element.style.left = left;
		this.element.style.top = top;
		// 食物位置不能与蛇重叠？
	}
}

export default Food;
