package com.hzl.pulltorefresh;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.JavaScriptModule;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;
import com.hzl.pulltorefresh.refresh.view.RefreshHeadViewManager;
import com.hzl.pulltorefresh.refresh.view.RefreshViewManager;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

/**
 * 作者：请叫我百米冲刺 on 2018/1/2 上午11:49
 * 邮箱：mail@hezhilin.cc
 */

public class RefreshReactPackage implements ReactPackage {

    @Override
    public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
        return Collections.emptyList();
    }

    public List<Class<? extends JavaScriptModule>> createJSModules() {
        return Collections.emptyList();
    }

    @Override
    public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
        List<ViewManager> managers = new ArrayList<>();
        managers.add(new RefreshViewManager());
        managers.add(new RefreshHeadViewManager());
        return managers;
    }
}
