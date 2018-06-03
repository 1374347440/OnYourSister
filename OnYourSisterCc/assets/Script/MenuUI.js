var GameTools = require("GameTools");
var GameUiTools = require("GameUiTools");
var GameConfig = require("GameConfig");
var AnimLayerTool = require("AnimLayerTool");
cc.Class({
    extends: cc.Component,

    properties: {
        layerBack: cc.Node,
        mainMenuButtons: [cc.Node],
        sunMenuButtons: [cc.Node],
        musicButton: cc.Node,
        anbotButton: cc.Node,//关于按钮
    },

    onLoad() {
        if (!GameConfig.IS_GAME_MUSIC) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("music2");
        }
        GameUiTools.setButtonClickEvents(this, this.layerBack, "showMainMenuButtonsFunc");
        GameUiTools.setButtonClickEvents(this, this.musicButton, "musicButtonFunc");
        GameUiTools.setButtonClickEvents(this, this.mainMenuButtons, "mainMenuButtonsFunc");
        GameUiTools.setButtonClickEvents(this, this.sunMenuButtons, "sunMenuButtonsFunc");
        GameUiTools.setButtonClickEvents(this, this.anbotButton, "anbotButtonFunc");
    },

    start() {
        if (CC_WECHATGAME) {
            if (GameConfig.GameClubButton != null) {
                GameConfig.GameClubButton.show();
            }
        }
    },

    showMainMenuButtonsFunc: function (event, customEventData) {
        for (let i = 0; i < 3; i++) {
          if(this.mainMenuButtons[i].active){
              GameTools.playSimpleAudioEngine(0);
              AnimLayerTool.ShowMainMenuButton(this.mainMenuButtons,this.sunMenuButtons,i);
          }
        }
    },

    mainMenuButtonsFunc: function (event, customEventData) {
        GameTools.playSimpleAudioEngine(0);
        GameConfig.MAIN_MENU_NUM = customEventData;
        if (this.sunMenuButtons[0].active) {
            AnimLayerTool.ShowMainMenuButton(this.mainMenuButtons,this.sunMenuButtons,customEventData);
        } else {
            AnimLayerTool.ShowSunMenuNumButton(this.mainMenuButtons,this.sunMenuButtons,customEventData);
        }

    },

    sunMenuButtonsFunc: function (event, customEventData) {
        GameTools.playSimpleAudioEngine(0);
        GameConfig.SUN_MENU_NUM = customEventData;
        this.loadingResource();
    },

    musicButtonFunc: function () {
        GameTools.playSimpleAudioEngine(0);
        GameConfig.IS_GAME_MUSIC = !GameConfig.IS_GAME_MUSIC;
        GameTools.setItemByLocalStorage("IS_GAME_MUSIC", GameConfig.IS_GAME_MUSIC);
        if (GameConfig.IS_GAME_MUSIC) {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("music1");
        } else {
            this.musicButton.getComponent(cc.Sprite).spriteFrame = GameTools.love2048FrameCache.getSpriteFrame("music2");
        }
    },

    anbotButtonFunc: function (event) {
        GameTools.playSimpleAudioEngine(0);
        cc.director.loadScene("AboutGame");
    },

    loadingResource: function () {
        cc.director.loadScene('GameScene');
    },

    onDestroy() {
        if (CC_WECHATGAME) {
            if (GameConfig.GameClubButton != null) {
                GameConfig.GameClubButton.hide();
            }
        }
    },
});
