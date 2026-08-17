(function(){
  var el = document.getElementById('viewCounter');
  if(!el) return;
  var key = location.pathname.split('/').pop().replace('.html','') || 'index';
  fetch('https://abacus.jasoncameron.dev/hit/zanacudi-portfolio/' + encodeURIComponent(key))
    .then(function(r){ return r.json(); })
    .then(function(d){
      var n = d && typeof d.value === 'number' ? d.value : null;
      if(n===null){ el.style.display = 'none'; return; }
      el.textContent = n.toLocaleString() + (n===1 ? ' view' : ' views');
    })
    .catch(function(){ el.style.display = 'none'; });
})();
