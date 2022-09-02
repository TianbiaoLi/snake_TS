// 记分牌
class ScorePanel {
	score = 0;
	level = 1;
	ScoreEle: HTMLElement;
	LevelEle: HTMLElement;

	// 设置最大等级
	maxLevel: number;
	levelUpStep: number;

	constructor(maxLevel: number = 10, levelUpStep: number = 10) {
		this.ScoreEle = document.querySelector("#score")!;
		this.LevelEle = document.querySelector("#level")!;
		this.maxLevel = maxLevel;
		this.levelUpStep = levelUpStep;
	}

	// 分数增加
	addScore() {
		this.ScoreEle.innerHTML = ++this.score + "";
		if (this.score % this.levelUpStep == 0) {
			this.levelUp();
		}
	}
	// 等级提升
	levelUp() {
		if (this.level < this.maxLevel) {
			this.LevelEle.innerHTML = ++this.level + "";
		}
	}
}
export default ScorePanel;
