// Paywandi two-tab test harness (dev only, not loaded by the page). Paste into a tab's console, or
// inject with a browser automation tool, on paywandi.html?debug=1#<room>. It replaces the camera and
// microphone with a canvas and a pure tone so a call can be measured without real devices.
window.__pw = {
  async join(freq) {
    const ac = new AudioContext();
    navigator.mediaDevices.getUserMedia = async c => {
      const tr = [];
      if (c.audio) { const o = ac.createOscillator(); o.frequency.value = freq; const d = ac.createMediaStreamDestination(); o.connect(d); o.start(); tr.push(...d.stream.getAudioTracks()); }
      if (c.video) { const cv = document.createElement('canvas'); cv.width = 320; cv.height = 240; const x = cv.getContext('2d');
        setInterval(() => { x.fillStyle = 'hsl(' + (Date.now() / 20 % 360) + ',60%,50%)'; x.fillRect(0, 0, 320, 240); }, 66);
        tr.push(...cv.captureStream(15).getVideoTracks()); }
      return new MediaStream(tr);
    };
    navigator.mediaDevices.enumerateDevices = async () => [{ kind: 'audioinput', deviceId: 'a', label: 'tone', groupId: 'g' }, { kind: 'videoinput', deviceId: 'v', label: 'canvas', groupId: 'g' }];
    await openLobby(); await new Promise(r => setTimeout(r, 700));
    document.getElementById('joinBtn').click();
  },
  // what this tab hears from each peer, and which connection objects carry it
  async measure() {
    const out = [];
    for (const r of __paywandi.peers.values()) {
      let rms = null, hz = null;
      try {
        const t = r.audio.captureStream().getAudioTracks()[0];
        const ac = new AudioContext(); const an = ac.createAnalyser(); an.fftSize = 8192;
        ac.createMediaStreamSource(new MediaStream([t])).connect(an);
        await new Promise(x => setTimeout(x, 600));
        const buf = new Float32Array(an.fftSize); an.getFloatTimeDomainData(buf);
        rms = +Math.sqrt(buf.reduce((s, y) => s + y * y, 0) / buf.length).toFixed(3);
        const f = new Float32Array(an.frequencyBinCount); an.getFloatFrequencyData(f);
        let bi = 0; for (let i = 1; i < f.length; i++) if (f[i] > f[bi]) bi = i; hz = Math.round(bi * ac.sampleRate / an.fftSize);
        ac.close();
      } catch (e) { rms = 'err ' + e.message; }
      out.push({ seat: r.seat, rms, hz, conn: r.conn?.connectionId || null, connOpen: !!r.conn?.open, call: r.call?.connectionId || null,
                 ice: r.call?.peerConnection?.iceConnectionState || null });
    }
    return { mySeat: __paywandi.mySeat?.() ?? null, status: document.getElementById('callStatus').textContent, peers: out };
  },
};
