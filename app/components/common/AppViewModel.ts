import {Observable, PropertyChangeData, EventData} from 'data/observable'
import * as bookmarks from './bookmarks'
import * as Argon from 'argon';
import {NativescriptDeviceService} from './argon-device-service';
import {NativescriptRealityService} from './argon-reality-service';
import {NativescriptVuforiaServiceDelegate} from './argon-vuforia-service';
import {Util} from './util'

export interface LoadUrlEventData extends EventData {
    eventName: 'loadUrl',
    url: string
}

export class LayerDetails extends Observable {
    uri = '';
    title = '';
    supportedInteractionModes:Array<InteractionMode> = [];
}

export type InteractionMode = 'immersive'|'page';

export class AppViewModel extends Observable {
    menuOpen = false;
    cancelButtonShown = false;
    realityChooserOpen = false;
    overviewOpen = false;
    bookmarksOpen = false;
    debugEnabled = false;
    viewerEnabled = false;
    interactionMode:InteractionMode = 'immersive';
    interactionModeButtonEnabled = false;
    layerDetails:LayerDetails = new LayerDetails()
    currentUri = '';
    isFavorite = false;

    private _resolveReady:Function;
    ready:Promise<void>;
    
    static loadUrlEvent:'loadUrl' = 'loadUrl'
    
    constructor() {
        super();
        bookmarks.favoriteList.on('change',()=>{
            setTimeout(()=>{
                this.updateFavoriteStatus();
            })
        })

        this.ready = new Promise((resolve) => {
            this._resolveReady = resolve;
        })
    }

    setReady() {
        this._resolveReady();
    }
    
    toggleMenu() {
        this.set('menuOpen', !this.menuOpen);
    }
    
    hideMenu() {
        this.set('menuOpen', false);
    }
    
    toggleInteractionMode() {
        this.set('interactionMode', this.interactionMode === 'page' ? 'immersive' : 'page')
    }
    
    setInteractionMode(mode:InteractionMode) {
        this.set('interactionMode', mode);
    }
    
    showOverview() {
        this.set('overviewOpen', true);
    }
    
    hideOverview() {
        this.set('overviewOpen', false);
    }
    
    toggleOverview() {
        this.set('overviewOpen', !this.overviewOpen);
    }
    
    showBookmarks() {
        this.set('bookmarksOpen', true);
    }
    
    hideBookmarks() {
        this.set('bookmarksOpen', false);
    }
    
    showRealityChooser() {
        this.set('realityChooserOpen', true);
    }
    
    hideRealityChooser() {
        this.set('realityChooserOpen', false);
    }
    
    showCancelButton() {
        this.set('cancelButtonShown', true);
    }
    
    hideCancelButton() {
        this.set('cancelButtonShown', false);
    }
    
    toggleDebug() {
        this.set('debugEnabled', !this.debugEnabled);
    }
    
    setDebugEnabled(enabled:boolean) {
        this.set('debugEnabled', enabled);
    }
    
    toggleViewer() {
        this.set('viewerEnabled', !this.viewerEnabled);
    }
    
    setViewerEnabled(enabled:boolean) {
        this.set('viewerEnabled', enabled);
    }

    _onLayerDetailsChange(data:PropertyChangeData) {
        if (data.propertyName === 'uri') {
            this.set('currentUri', data.value);
            this.updateFavoriteStatus();
        }
    }
    
    setLayerDetails(details:LayerDetails) {
        this.layerDetails.off('propertyChange', this._onLayerDetailsChange, this);
        this.set('layerDetails', details);
        this.set('bookmarksOpen', !details.uri);
        this.set('currentUri', details.uri);
        this.updateFavoriteStatus();
        details.on('propertyChange', this._onLayerDetailsChange, this);
    }
    
    updateFavoriteStatus() {
        this.set('isFavorite', !!bookmarks.favoriteMap.get(this.currentUri));
    }
    
    loadUrl(url:string) {
        this.notify(<LoadUrlEventData>{
            eventName: AppViewModel.loadUrlEvent,
            object: this,
            url
        })
        this.layerDetails.set('uri', url);
        this.set('bookmarksOpen', !url);
    }
}

export const appViewModel = new AppViewModel;


const container = new Argon.DI.Container;
container.registerSingleton(Argon.DeviceService, NativescriptDeviceService);
container.registerSingleton(Argon.RealityService, NativescriptRealityService);
container.registerSingleton(Argon.VuforiaServiceDelegate, NativescriptVuforiaServiceDelegate);

export const manager = Argon.init({
    container, 
    configuration: {
        role: Argon.Role.MANAGER,
        name: 'ArgonApp'
    }
});

export const vuforiaDelegate:NativescriptVuforiaServiceDelegate = container.get(Argon.VuforiaServiceDelegate);

manager.reality.setDefault(bookmarks.LIVE_VIDEO_REALITY);

appViewModel.ready.then(()=>{
    manager.vuforia.isAvailable().then((available)=>{
        if (available) {
            const primaryVuforiaLicenseKey = Util.getInternalVuforiaKey();
            if (!primaryVuforiaLicenseKey) {
                alert("Unable to locate Vuforia License Key");
                return;
            }
            manager.vuforia.initWithUnencryptedKey({key:primaryVuforiaLicenseKey}).catch((err)=>{
                alert(err.message);
            });
        }
    })
})

manager.reality.sessionDesiredRealityChangeEvent.addEventListener(({previous, current, session})=>{
    if (session === manager.session.manager) return;
    
    if (previous) {
        const previousRealityItem = bookmarks.realityMap.get(previous.uri);
        if (previousRealityItem && !previousRealityItem.builtin) {
            var i = bookmarks.realityList.indexOf(previousRealityItem);
            bookmarks.realityList.splice(i, 1);
        }
    } 
    if (current) {        
        const currentRealityItem = bookmarks.realityMap.get(current.uri)
        if (!currentRealityItem) bookmarks.realityList.push(new bookmarks.RealityBookmarkItem(current));
    }
    session.closeEvent.addEventListener(()=>{
        const sessionDesiredReality = manager.reality.desiredRealityMap.get(session);
        if (sessionDesiredReality) {
            const sessionDesiredRealityItem = bookmarks.realityMap.get(sessionDesiredReality.uri);
            if (sessionDesiredRealityItem && !sessionDesiredRealityItem.builtin) {
                    var i = bookmarks.realityList.indexOf(sessionDesiredRealityItem);
                    bookmarks.realityList.splice(i, 1);
            }
        }
    });
})

manager.focus.sessionFocusEvent.addEventListener(()=>{
    const focussedSession = manager.focus.getSession();    
    console.log("Argon focus changed: " + (focussedSession ? focussedSession.uri : undefined));
})
