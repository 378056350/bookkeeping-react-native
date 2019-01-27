package com.hzl.pulltorefresh.refresh.view;

import android.support.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.hzl.pulltorefresh.refresh.PtrDefaultHandler;
import com.hzl.pulltorefresh.refresh.PtrFrameLayout;

import java.util.Map;

/**
 * 作者：请叫我百米冲刺 on 2018/1/2 上午11:49
 * 邮箱：mail@hezhilin.cc
 */
public class RefreshViewManager extends ViewGroupManager<PtrFrameLayout> {

    private static final int START_REFRESH = 1;

    private static final int FINISH_REFRESH = 2;

    @Override
    public String getName() {
        return "RCTRefreshView";
    }


    public enum Events { //这里是一些点击事件

        ON_RELEASE("onPullRelease");

        private final String mName;

        Events(final String name) {
            mName = name;
        }

        @Override
        public String toString() {
            return mName;
        }
    }

    @Override
    @Nullable
    public Map getExportedCustomDirectEventTypeConstants() {
        MapBuilder.Builder builder = MapBuilder.builder();
        for (Events event : Events.values()) {
            builder.put(event.toString(), MapBuilder.of("registrationName", event.toString()));
        }
        return builder.build();
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        return MapBuilder.of("startRefresh", START_REFRESH, "finishRefresh", FINISH_REFRESH);
    }

    @Override
    public void receiveCommand(final PtrFrameLayout root, int commandId, @Nullable final ReadableArray args) {
        switch (commandId) {
            case START_REFRESH:
                root.post(new Runnable() {
                    @Override
                    public void run() {
                        root.autoRefresh();
                    }
                });
                break;
            case FINISH_REFRESH:
                root.refreshComplete();
                break;
        }
    }

    @Override
    protected PtrFrameLayout createViewInstance(ThemedReactContext reactContext) {
        final PtrFrameLayout ptrFrameLayout = new PtrFrameLayout(reactContext);
        final RCTEventEmitter mEventEmitter = reactContext.getJSModule(RCTEventEmitter.class);
        ptrFrameLayout.setRatioOfHeaderHeightToRefresh(1.0f);
        ptrFrameLayout.setPtrHandler(new PtrDefaultHandler() {
            @Override
            public void onRefreshBegin(PtrFrameLayout frame) {
                mEventEmitter.receiveEvent(ptrFrameLayout.getId(), Events.ON_RELEASE.toString(), Arguments.createMap());
            }
        });
        return ptrFrameLayout;
    }

    @ReactProp(name = "isContentScroll")
    public void setContentScroll(PtrFrameLayout root, boolean isContentScroll) {
        root.setPinContent(!isContentScroll);
    }

    @ReactProp(name = "refreshable")
    public void setRefreshable(PtrFrameLayout root, boolean refreshable) {
        root.setEnabled(refreshable);
    }
}
