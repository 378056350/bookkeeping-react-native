package com.hzl.pulltorefresh.refresh.view;

import android.support.annotation.Nullable;
import android.view.ViewGroup;
import android.widget.RelativeLayout;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.common.MapBuilder;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.ViewGroupManager;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.hzl.pulltorefresh.refresh.header.RefreshHeader;

import java.util.Map;

/**
 * 作者：请叫我百米冲刺 on 2018/1/2 下午1:20
 * 邮箱：mail@hezhilin.cc
 */

public class RefreshHeadViewManager extends ViewGroupManager<RefreshHeader> {

    @Override
    public String getName() {
        return "RCTRefreshHeader";
    }

    public enum Events { //这里是一些点击事件

        ON_PUSHING_STATE("onPushingState");

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
    protected RefreshHeader createViewInstance(ThemedReactContext reactContext) {
        final RefreshHeader refreshHeader = new RefreshHeader(reactContext);
        final RCTEventEmitter mEventEmitter = reactContext.getJSModule(RCTEventEmitter.class);
        refreshHeader.setPullStateChangeListener(new RefreshHeader.PullStateChangeListener() {
            @Override
            public void onStateChange(boolean isUnderTouch, int state, int moveHeight) {
                //进行下拉触摸的回调
                WritableMap map = Arguments.createMap();
                map.putInt("moveHeight", moveHeight);
                map.putInt("state", state);
                mEventEmitter.receiveEvent(refreshHeader.getId(), Events.ON_PUSHING_STATE.toString(), map);
            }
        });
        return refreshHeader;
    }

    @ReactProp(name = "viewHeight")
    public void setViewHeight(RefreshHeader root, int viewHeight) {
        root.setLayoutParams(new RelativeLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, viewHeight));
    }
}

