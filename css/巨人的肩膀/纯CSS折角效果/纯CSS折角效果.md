
# 纯CSS折角效果

http://nicolasgallagher.com/pure-css-folded-corner-effect/demo/


Firefox 3.5 +，Chrome 4 +，Safari 4 +，Opera 10 +，IE 8+。

```html
<style>
.note {
          position:relative;
          width:480px;
          padding:1em 1.5em;
          margin:2em auto;
          color:#fff;
          background:#97C02F;
          overflow:hidden;
      }

      .note:before {
          content:"";
          position:absolute;
          top:0;
          right:0;
          border-width:0 16px 16px 0; 
          border-style:solid;
          border-color:#fff #fff #658E15 #658E15; 
          background:#658E15; 
          display:block; 
          width:0; 
          -webkit-box-shadow:0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
          -moz-box-shadow:0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
          box-shadow:0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
      }
</style>
<div class="note">
  
</div>
```