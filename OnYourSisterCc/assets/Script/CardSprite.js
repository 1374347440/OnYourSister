var GameConfig = require("GameConfig");
var GameTools = require("GameTools");
var CardSprite = cc.Class({
    extends: cc.Node,
    name: "CardSprite",
    properties: {
        cardSprite: null,
        number: 0,// 显示数字
    },
    ctor: function (numbers, CardSpriteX, CardSpriteY) {
        this.cardSprite = this.addComponent(cc.Sprite);
        // 自定义初始化
        this.initCard(numbers, CardSpriteX, CardSpriteY);
    },
    initCard: function (numbers, CardSpriteX, CardSpriteY)// 初始化
    {
        // 初始化数字
        this.number = numbers;
        this.CardShow();
        this.setPosition(CardSpriteX, CardSpriteY);
        // this.width = GameConfig.CARD_WIDTH;
        // this.height = GameConfig.CARD_WIDTH;
    },
    CardShow: function () {
        // 判断数字的大小来调整颜色
        if (this.number == 0) {
            this.cardSprite.spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("blackCard");
        } else if (this.number == 1) {
            this.cardSprite.spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("whiteCard");
        } else if (this.number == 2) {
            this.cardSprite.spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("startGame");
        }
    },
    setNumber: function (number) {
        this.number = number;
        this.CardShow();
    },
    getNumber: function () {
        return this.number;
    },
    isVisible() {
        return this.opacity == 255;
    },
    setVisible(isTrue) {
        this.opacity = isTrue ? 255 : 0;
    }
});

module.exports = CardSprite;