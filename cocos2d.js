/****************************************************************************
 Copyright (c) 2010-2012 cocos2d-x.org
 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011      Zynga Inc.

 http://www.cocos2d-x.org

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in
 all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/

 var cc = cc = cc || {};
//Cocos2d directory
cc.Dir = '';//in relate to the html file or use absolute
cc.loadQue = [];//the load que which js files are loaded
cc.COCOS2D_DEBUG = 2;
cc._DEBUG = 1;
cc._IS_RETINA_DISPLAY_SUPPORTED = 0;
//html5 selector method
cc.$ = function (x) {
    return document.querySelector(x);
};
cc.$new = function (x) {
    return document.createElement(x);
};

cc.loadjs = function (filename) {
    //add the file to the que
    var script = cc.$new('script');
    script.src = cc.Dir + filename;
    script.order = cc.loadQue.length;
    cc.loadQue.push(script);

    script.onload = function () {
        //file have finished loading,
        //if there is more file to load, we should put the next file on the head
        if (this.order + 1 < cc.loadQue.length) {
            cc.$('head').appendChild(cc.loadQue[this.order + 1]);
            //console.log(this.order);
        }
        else {
            cc.setup("gameCanvas");
            cc.Loader.shareLoader().onload = function () {
                cc.AppController.shareAppController().didFinishLaunchingWithOptions();
            };
            //preload ressources
            cc.Loader.shareLoader().preload(G_RESOURCES);
        }
    };
    if (script.order === 0)//if the first file to load, then we put it on the head
    {
        cc.$('head').appendChild(script);
    }
};

cc.loadjs('cocos2d-html5-canvasmenu-min.js');
cc.loadjs('Resource.js');

cc.loadjs('Classes/AppDelegate.js');

cc.loadjs('Classes/Auxiliary/Array.js');
cc.loadjs('Classes/Auxiliary/Utils.js');

cc.loadjs('Classes/Config/Global.js');
cc.loadjs('Classes/Config/Location.js');
cc.loadjs('Classes/Config/Themes.js');

cc.loadjs('Classes/Controllers/LevelController.js');

cc.loadjs('Classes/Information/TilesInformation/IsBounded.js');
cc.loadjs('Classes/Information/TilesInformation/IsValid.js');
cc.loadjs('Classes/Information/TilesInformation/GenerateTrophies.js');
cc.loadjs('Classes/Information/TilesInformation/BasicTile.js');
cc.loadjs('Classes/Information/TilesInformation/Tiles.js');
cc.loadjs('Classes/Information/TilesInformation/TileInformation.js');

cc.loadjs('Classes/Information/BackgroundInformation/Backgrounds.js');
cc.loadjs('Classes/Information/BackgroundInformation/BackgroundInformation.js');
cc.loadjs('Classes/Controllers/BackgroundController.js');

cc.loadjs('Classes/Information/TrophiesInformation/Coin.js');
cc.loadjs('Classes/Information/TrophiesInformation/TrophiesInformation.js');
cc.loadjs('Classes/Controllers/TrophiesController.js');
cc.loadjs('Classes/Controllers/TrophiesActionsController.js');

cc.loadjs('Classes/Information/Environments/Footprints.js');
cc.loadjs('Classes/Information/Environments/JumpShadow.js');
cc.loadjs('Classes/Information/Environments/LightCircle.js');
cc.loadjs('Classes/Information/Environments/Cloud.js');
cc.loadjs('Classes/Controllers/EnvironmentsController.js');

cc.loadjs('Classes/Information/PropertiesInformation/Double.js');
cc.loadjs('Classes/Information/PropertiesInformation/Triple.js');
cc.loadjs('Classes/Information/PropertiesInformation/Magnet.js');
cc.loadjs('Classes/Information/PropertiesInformation/Hp.js');
cc.loadjs('Classes/Information/PropertiesInformation/PropertiesInformation.js');
cc.loadjs('Classes/Controllers/PropertiesController.js');

cc.loadjs('Classes/Scenes/MainMenu.js');
cc.loadjs('Classes/Scenes/GameOver.js');
cc.loadjs('Classes/Scenes/About.js');

cc.loadjs('Classes/Models/Tile.js');
cc.loadjs('Classes/Models/Trophy.js');
cc.loadjs('Classes/Models/Trophies.js');
cc.loadjs('Classes/Models/Property.js');
cc.loadjs('Classes/Models/Character.js');
cc.loadjs('Classes/Models/BackgroundTile.js');
cc.loadjs('Classes/Models/Background.js');

cc.loadjs('Classes/Panels/ScoreItem.js');
cc.loadjs('Classes/Panels/ScoreLayer.js');
cc.loadjs('Classes/Panels/PauseLayer.js');

cc.loadjs('Classes/Information/TrackInformation.js');
cc.loadjs('Classes/Models/Track.js');


