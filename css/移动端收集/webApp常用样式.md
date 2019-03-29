-webkit-overflow-scrolling : touch;  DIV滚动仿浏览回弹

设置滚动条宽度

::-webkit-scrollbar {
    width: 5px;
    height: 5px;
}

清除最小字体为12px 选中高亮透明

body {
    -webkit-text-size-adjust: none;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

隐藏滚动条

::-webkit-scrollbar{display:none;}

禁止用户选中

user-select:none