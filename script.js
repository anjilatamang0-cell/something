:root{
  --wine-darkest: #250510;
  --wine-dark:    #3D0B1B;
  --wine:         #5C1230;
  --rose:         #C6597A;
  --blush:        #F2C9D2;
  --gold:         #D9A94A;
  --font-display: 'Cormorant Garamond', serif;
}

*{ box-sizing: border-box; margin: 0; padding: 0; }

html, body{
  height: 100%;
  overflow: hidden;
  background: var(--wine-darkest);
}

.bg{
  position: fixed;
  inset: 0;
  background: radial-gradient(ellipse at 50% 30%, var(--wine) 0%, var(--wine-dark) 45%, var(--wine-darkest) 100%);
}

.pop-layer{
  position: fixed;
  inset: 0;
  overflow: hidden;
}

.pop-word{
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(-50%, -50%) scale(0.3);
  font-family: var(--font-display);
  font-style: italic;
  font-weight: 600;
  white-space: nowrap;
  color: var(--rose);
  opacity: 0;
  animation-name: pop;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
  pointer-events: none;
}

.pop-word.gold{ color: var(--gold); }
.pop-word.blush{ color: var(--blush); }

@keyframes pop{
  0%, 100%{
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.25);
  }
  50%{
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@media (prefers-reduced-motion: reduce){
  .pop-word{
    animation: none !important;
    opacity: 0.8;
    transform: translate(-50%, -50%) scale(1);
  }
}
