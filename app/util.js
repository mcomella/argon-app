"use strict";
var platform = require("platform");
var color_1 = require("color");
var file = require('file-system');
var pgpFolder = file.knownFolders.currentApp().getFolder('pgp');
var privateKeyFileName = 'private.key';
var Util = (function () {
    function Util() {
    }
    Util.decrypt = function (encryptedData) {
        var containsPrivateKey = pgpFolder.contains(privateKeyFileName);
        if (!containsPrivateKey)
            return Promise.reject(new Error("This build of Argon is incapable of decrypting messages."));
        var privateKeyFile = pgpFolder.getFile(privateKeyFileName);
        return privateKeyFile.readText().then(function (privateKey) {
            return openpgp.decrypt({
                message: openpgp.key.readArmored(encryptedData),
                privateKey: openpgp.key.readArmored(privateKey).keys[0]
            });
        }).then(function (plaintext) {
            return JSON.parse(plaintext);
        });
    };
    Util.bringToFront = function (view) {
        if (view.android) {
            view.android.bringToFront();
        }
        else if (view.ios) {
            view.ios.superview.bringSubviewToFront(view.ios);
        }
    };
    Util.linearGradient = function (view, colors) {
        var _colors = [];
        var nativeView = view['_nativeView'];
        if (!nativeView) {
            return;
        }
        colors.forEach(function (c, idx) {
            if (!(c instanceof color_1.Color)) {
                colors[idx] = new color_1.Color(c);
            }
        });
        if (platform.device.os === platform.platformNames.android) {
            var backgroundDrawable = nativeView.getBackground(), orientation = android.graphics.drawable.GradientDrawable.Orientation.TOP_BOTTOM, LINEAR_GRADIENT = 0;
            colors.forEach(function (c) {
                _colors.push(c.android);
            });
            if (!(backgroundDrawable instanceof android.graphics.drawable.GradientDrawable)) {
                backgroundDrawable = new android.graphics.drawable.GradientDrawable();
                backgroundDrawable.setColors(_colors);
                backgroundDrawable.setGradientType(LINEAR_GRADIENT);
                nativeView.setBackgroundDrawable(backgroundDrawable);
            }
        }
        else if (platform.device.os === platform.platformNames.ios) {
            var iosView = view.ios;
            var colorsArray = NSMutableArray.alloc().initWithCapacity(2);
            colors.forEach(function (c) {
                colorsArray.addObject(interop.types.id(c.ios.CGColor));
            });
            var gradientLayer = CAGradientLayer.layer();
            gradientLayer.colors = colorsArray;
            gradientLayer.frame = iosView.bounds;
            iosView.layer.insertSublayerAtIndex(gradientLayer, 0);
        }
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=util.js.map