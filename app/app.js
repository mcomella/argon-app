"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var application = require("application");
application.mainModule = "main-page";
application.cssFile = "./app.css";
/***
 * Creates a performance.now() function
 */
if (!global.performance) {
    global.performance = {};
}
if (!global.performance.now) {
    if (application.android) {
        global.performance.now = function () {
            return java.lang.System.nanoTime() / 1000000;
        };
    }
    else if (application.ios) {
        global.performance.now = function () {
            return CACurrentMediaTime() * 1000;
        };
    }
}
var AppViewModel_1 = require("./components/common/AppViewModel");
var nativescript_urlhandler_1 = require("nativescript-urlhandler");
nativescript_urlhandler_1.handleOpenURL(function (appURL) {
    console.log('Received url request: ', appURL);
    AppViewModel_1.appViewModel.ready.then(function () {
        var urlValue = appURL.params.get('url');
        if (urlValue) {
            AppViewModel_1.appViewModel.openUrl(decodeURIComponent(urlValue));
        }
        else {
            var url = 'https://' + appURL.path;
            AppViewModel_1.appViewModel.openUrl(url);
        }
    });
});
application.start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEseUNBQTRDO0FBRTVDLFdBQVcsQ0FBQyxVQUFVLEdBQUcsV0FBVyxDQUFBO0FBQ3BDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsV0FBVyxDQUFDO0FBRWxDOztHQUVHO0FBQ0gsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUN0QixNQUFNLENBQUMsV0FBVyxHQUFHLEVBQUUsQ0FBQztBQUM1QixDQUFDO0FBQ0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDMUIsRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7UUFDdEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLEdBQUc7WUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxHQUFHLE9BQU8sQ0FBQztRQUNqRCxDQUFDLENBQUM7SUFDTixDQUFDO0lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ3pCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxHQUFHO1lBQ3JCLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRSxHQUFHLElBQUksQ0FBQztRQUN2QyxDQUFDLENBQUM7SUFDTixDQUFDO0FBQ0wsQ0FBQztBQUVELGlFQUFnRTtBQUNoRSxtRUFBZ0U7QUFFaEUsdUNBQWEsQ0FBQyxVQUFDLE1BQWM7SUFDekIsT0FBTyxDQUFDLEdBQUcsQ0FBQyx3QkFBd0IsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUM5QywyQkFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDcEIsSUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDMUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNYLDJCQUFZLENBQUMsT0FBTyxDQUFDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDdkQsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBTSxHQUFHLEdBQUcsVUFBVSxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDckMsMkJBQVksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsQ0FBQztJQUNMLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQyxDQUFDLENBQUM7QUFFSCxXQUFXLENBQUMsS0FBSyxFQUFFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgYXBwbGljYXRpb24gPSByZXF1aXJlKFwiYXBwbGljYXRpb25cIik7XG5cbmFwcGxpY2F0aW9uLm1haW5Nb2R1bGUgPSBcIm1haW4tcGFnZVwiXG5hcHBsaWNhdGlvbi5jc3NGaWxlID0gXCIuL2FwcC5jc3NcIjtcblxuLyoqKlxuICogQ3JlYXRlcyBhIHBlcmZvcm1hbmNlLm5vdygpIGZ1bmN0aW9uXG4gKi9cbmlmICghZ2xvYmFsLnBlcmZvcm1hbmNlKSB7XG4gICAgZ2xvYmFsLnBlcmZvcm1hbmNlID0ge307XG59XG5pZiAoIWdsb2JhbC5wZXJmb3JtYW5jZS5ub3cpIHtcbiAgICBpZiAoYXBwbGljYXRpb24uYW5kcm9pZCkge1xuICAgICAgICBnbG9iYWwucGVyZm9ybWFuY2Uubm93ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGphdmEubGFuZy5TeXN0ZW0ubmFub1RpbWUoKSAvIDEwMDAwMDA7XG4gICAgICAgIH07XG4gICAgfSBlbHNlIGlmIChhcHBsaWNhdGlvbi5pb3MpIHtcbiAgICAgICAgZ2xvYmFsLnBlcmZvcm1hbmNlLm5vdyA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgcmV0dXJuIENBQ3VycmVudE1lZGlhVGltZSgpICogMTAwMDtcbiAgICAgICAgfTtcbiAgICB9XG59XG5cbmltcG9ydCB7IGFwcFZpZXdNb2RlbCB9IGZyb20gJy4vY29tcG9uZW50cy9jb21tb24vQXBwVmlld01vZGVsJztcbmltcG9ydCB7IGhhbmRsZU9wZW5VUkwsIEFwcFVSTCB9IGZyb20gJ25hdGl2ZXNjcmlwdC11cmxoYW5kbGVyJztcblxuaGFuZGxlT3BlblVSTCgoYXBwVVJMOiBBcHBVUkwpID0+IHtcbiAgICBjb25zb2xlLmxvZygnUmVjZWl2ZWQgdXJsIHJlcXVlc3Q6ICcsIGFwcFVSTCk7XG4gICAgYXBwVmlld01vZGVsLnJlYWR5LnRoZW4oKCk9PntcbiAgICAgICAgY29uc3QgdXJsVmFsdWUgPSBhcHBVUkwucGFyYW1zLmdldCgndXJsJyk7XG4gICAgICAgIGlmICh1cmxWYWx1ZSkge1xuICAgICAgICAgICAgYXBwVmlld01vZGVsLm9wZW5VcmwoZGVjb2RlVVJJQ29tcG9uZW50KHVybFZhbHVlKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCB1cmwgPSAnaHR0cHM6Ly8nICsgYXBwVVJMLnBhdGg7XG4gICAgICAgICAgICBhcHBWaWV3TW9kZWwub3BlblVybCh1cmwpO1xuICAgICAgICB9XG4gICAgfSk7XG59KTtcblxuYXBwbGljYXRpb24uc3RhcnQoKTtcbiJdfQ==