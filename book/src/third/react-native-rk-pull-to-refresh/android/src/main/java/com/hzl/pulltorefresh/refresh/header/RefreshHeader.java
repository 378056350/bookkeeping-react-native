package com.hzl.pulltorefresh.refresh.header;

import android.content.Context;
import android.support.annotation.NonNull;

import com.facebook.react.views.view.ReactViewGroup;
import com.hzl.pulltorefresh.refresh.PtrFrameLayout;
import com.hzl.pulltorefresh.refresh.PtrUIHandler;
import com.hzl.pulltorefresh.refresh.indicator.PtrIndicator;

/**
 * 作者：请叫我百米冲刺 on 2018/1/2 下午1:21
 * 邮箱：mail@hezhilin.cc
 */

public class RefreshHeader extends ReactViewGroup implements PtrUIHandler {

    private PullStateChangeListener listener;

    public void setPullStateChangeListener(PullStateChangeListener listener) {
        this.listener = listener;
    }

    public RefreshHeader(@NonNull Context context) {
        super(context);
    }

    @Override
    public void onUIReset(PtrFrameLayout frame) {

    }

    @Override
    public void onUIRefreshPrepare(PtrFrameLayout frame) {

    }

    @Override
    public void onUIRefreshBegin(PtrFrameLayout frame) {

    }

    @Override
    public void onUIRefreshComplete(PtrFrameLayout frame) {

    }

    @Override
    public void onUIPositionChange(PtrFrameLayout frame, boolean isUnderTouch, byte status, PtrIndicator ptrIndicator) {
        if (listener != null) {
            listener.onStateChange(isUnderTouch, status, ptrIndicator.getCurrentPosY());
        }
    }


    public interface PullStateChangeListener {
        void onStateChange(boolean isUnderTouch, int state, int moveHeight);
    }
}
