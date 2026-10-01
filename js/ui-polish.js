(()=>{
  'use strict';
  const q=s=>document.querySelector(s), qa=s=>Array.from(document.querySelectorAll(s));
  const motion=()=>!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
  const FLOATING='#foodDrawer,#inventoryDrawer,.home-panels .shortcut-sheet';
  const ANIM_DETAILS='.home-panels .shortcut-sheet,.study-settings,.progress-sheet,.hunt-options,.battle-log-sheet';
  let closing=new WeakSet();

  function isOpen(el){return !!el&&(el.tagName==='DETAILS'?el.open:el.classList.contains('open'));}
  function finishClose(el){
    if(!el)return;
    el.classList.remove('ui-enter','ui-exit');
    if(el.tagName==='DETAILS') el.removeAttribute('open');
    else {el.classList.remove('open');el.setAttribute('aria-hidden','true');}
    closing.delete(el);
  }
  function closePanel(el,instant=false){
    if(!isOpen(el)||closing.has(el))return;
    el.classList.remove('ui-enter');
    if(instant||!motion()){finishClose(el);return;}
    closing.add(el);el.classList.add('ui-exit');
    setTimeout(()=>finishClose(el),155);
  }
  function closeFloating(except=null,instant=false){qa(FLOATING).forEach(el=>{if(el!==except)closePanel(el,instant);});}
  function markEnter(el){
    if(!el)return;
    closing.delete(el);el.classList.remove('ui-exit');el.classList.add('ui-enter');
    setTimeout(()=>el.classList.remove('ui-enter'),235);
  }

  /* Intercept closing clicks on animated <details> so they do not vanish instantly. */
  document.addEventListener('click',e=>{
    const summary=e.target.closest('summary');
    const detail=summary?.parentElement;
    if(detail instanceof HTMLDetailsElement && detail.open && detail.matches(ANIM_DETAILS) && !closing.has(detail)){
      e.preventDefault();e.stopPropagation();closePanel(detail);return;
    }
    const t=e.target.closest('button,summary'); if(!t)return;
    if(t.matches('[data-tab]')) closeFloating(null,true);
    if(t.matches('#inventoryShortcut')){const d=q('#inventoryDrawer');closeFloating(d);setTimeout(()=>markEnter(d),0);}
    if(t.matches('[data-action="feed"]')){const d=q('#foodDrawer');closeFloating(d);setTimeout(()=>markEnter(d),0);}
    if(t.matches('[data-open-shortcut]')){const d=document.getElementById(t.dataset.openShortcut||'');closeFloating(d);setTimeout(()=>markEnter(d),0);}
    if(t.matches('#petProfileBtn')){const d=q('#petInfoDrawer');closeFloating(d);setTimeout(()=>markEnter(d),0);}
    if(t.matches('#settingsBtn,#homeSettingsBtn,#menuSettingsBtn')) closeFloating();
    if(t.matches('.shortcut-close,#foodDrawerClose,#inventoryDrawerClose')){
      const panel=t.closest('details,.food-drawer,.home-tool-drawer');
      if(panel){e.preventDefault();e.stopPropagation();closePanel(panel);}
    }
  },true);

  document.addEventListener('toggle',e=>{
    const d=e.target;
    if(!(d instanceof HTMLDetailsElement)||!d.open)return;
    if(d.matches('.home-panels .shortcut-sheet')){closeFloating(d);markEnter(d);}
    if(d.matches('.study-settings,.progress-sheet')) qa('.study-settings,.progress-sheet').forEach(x=>{if(x!==d&&x.open)closePanel(x);});
    if(d.matches('.hunt-options,.battle-log-sheet')) markEnter(d);
  },true);

  document.addEventListener('keydown',e=>{
    if(e.key!=='Escape')return;
    const opened=qa(FLOATING).filter(isOpen);
    if(opened.length){opened.forEach(el=>closePanel(el));e.preventDefault();}
  });

  const observe=new MutationObserver(muts=>{
    for(const m of muts){
      if(m.type!=='attributes'||m.attributeName!=='class')continue;
      const el=m.target;
      if(!el.matches?.('#foodDrawer,#inventoryDrawer'))continue;
      if(el.classList.contains('open')){
        if(el.dataset.uiSeen!=='1'){el.dataset.uiSeen='1';closeFloating(el);markEnter(el);}
      }else el.dataset.uiSeen='0';
    }
  });

  addEventListener('DOMContentLoaded',()=>{
    qa('#foodDrawer,#inventoryDrawer').forEach(el=>observe.observe(el,{attributes:true,attributeFilter:['class']}));
    document.body.classList.add('ui-polished','ui-audit-verified');
  });
})();
