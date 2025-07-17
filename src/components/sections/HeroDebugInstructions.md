## Debug overlay image visibility

1. Open your browser dev-tools (F12), Network tab.
   Refresh page. Look for `img_frame.png`. Status code should be 200; if 404, path incorrect.

2. Elements panel: search for `<img` with alt "Decorative frame". If found, hover to see preview; check computed `width/height`, `z-index`, and if it has 0 `opacity`.

3. Temporarily change its CSS in devtools:
   ```css
   outline: 4px solid red;
   opacity: 1 !important;
   background: rgba(255,0,0,0.2);
   ```
   This will confirm layout.

4. If you still don't see the outline, parent `.relative` element has `overflow-hidden`. Remove that class in code.

5. If image path wrong, change JSX to:
   ```jsx
   import frame from '../../assets/img_frame.png';
   <img src={frame} className="absolute inset-0 w-full h-full object-contain z-50" />
   ```

Follow these steps and report back results.
