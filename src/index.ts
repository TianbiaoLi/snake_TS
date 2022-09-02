import "./style/index.less";
import Food from './modules/Food'
import ScorePanel from "./modules/ScorePanel";


// 测试代码
const food = new Food();
console.log(food.X, food.Y);
food.change();
console.log(food.X, food.Y);

const scorePanel = new ScorePanel(100,3);
for (let i = 0; i < 200; i++) {
    scorePanel.addScore()
}