## 表示位置（上下左右）を設定できるようにする

### ターゲットの上に表示（下に▼）

```css
.HintTip:after, .HintTip:before {
    top: 100%;
}
.HintTip:after {
    border-top-color: #e9e9e9;
}
.HintTip:before {
    border-top-color: #999;
}
```

```js
    top:   t.position().top  + parseInt(t.css('marginTop'))  - s.outerHeight() - vspacing,
    left:  t.position().left + parseInt(t.css('marginLeft')) + t.outerWidth()  - s.outerWidth(),
```

### ターゲットの下に表示（上に▲）

```css
.HintTip:after, .HintTip:before {
    bottom: 100%;
}
.HintTip:after {
    border-bottom-color: #fcfcfc;
}
.HintTip:before {
    border-bottom-color: #999;
}
```

```js
    top:   t.position().top  + parseInt(t.css('marginTop'))  + t.outerHeight() + vspacing,
    left:  t.position().left + parseInt(t.css('marginLeft')) + t.outerWidth()  - s.outerWidth(),
```

### 覚書

- topやleftはmargin込みの値なので、marginの値を取得してその分減らす（ターゲットに近づける）必要がある。
- line-heightが大きい場合は余白を計算して近づけたい

## その他

- 画面外にはみ出すときは、上下や左右を逆にする
- イベントアタッチの簡易オプションを用意する
    - over
    - form
