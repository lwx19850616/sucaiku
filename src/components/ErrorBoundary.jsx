import { Component } from 'react';

// 防止单个组件运行时报错拖垮整页：捕获渲染期异常并显示降级提示
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, message: '' };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, message: error?.message || '未知错误' };
  }

  componentDidCatch(error, info) {
    // 仅记录到控制台，不阻断其余页面
    console.error('[组件演示出错]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[160px] flex-col items-center justify-center rounded-xl border border-rose-400/20 bg-rose-400/5 p-6 text-center">
          <div className="mb-2 text-4xl">⚠️</div>
          <p className="text-base font-semibold text-rose-200">该组件演示暂时无法显示</p>
          <p className="mt-1 max-w-md text-xs text-rose-200/50">{this.state.message}</p>
        </div>
      );
    }
    return this.props.children;
  }
}
