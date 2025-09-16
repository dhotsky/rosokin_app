// Compiles a dart2wasm-generated main module from `source` which can then
// instantiatable via the `instantiate` method.
//
// `source` needs to be a `Response` object (or promise thereof) e.g. created
// via the `fetch()` JS API.
export async function compileStreaming(source) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(
      await WebAssembly.compileStreaming(source, builtins), builtins);
}

// Compiles a dart2wasm-generated wasm modules from `bytes` which is then
// instantiatable via the `instantiate` method.
export async function compile(bytes) {
  const builtins = {builtins: ['js-string']};
  return new CompiledApp(await WebAssembly.compile(bytes, builtins), builtins);
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export async function instantiate(modulePromise, importObjectPromise) {
  var moduleOrCompiledApp = await modulePromise;
  if (!(moduleOrCompiledApp instanceof CompiledApp)) {
    moduleOrCompiledApp = new CompiledApp(moduleOrCompiledApp);
  }
  const instantiatedApp = await moduleOrCompiledApp.instantiate(await importObjectPromise);
  return instantiatedApp.instantiatedModule;
}

// DEPRECATED: Please use `compile` or `compileStreaming` to get a compiled app,
// use `instantiate` method to get an instantiated app and then call
// `invokeMain` to invoke the main function.
export const invoke = (moduleInstance, ...args) => {
  moduleInstance.exports.$invokeMain(args);
}

class CompiledApp {
  constructor(module, builtins) {
    this.module = module;
    this.builtins = builtins;
  }

  // The second argument is an options object containing:
  // `loadDeferredWasm` is a JS function that takes a module name matching a
  //   wasm file produced by the dart2wasm compiler and returns the bytes to
  //   load the module. These bytes can be in either a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`.
  // `loadDynamicModule` is a JS function that takes two string names matching,
  //   in order, a wasm file produced by the dart2wasm compiler during dynamic
  //   module compilation and a corresponding js file produced by the same
  //   compilation. It should return a JS Array containing 2 elements. The first
  //   should be the bytes for the wasm module in a format supported by
  //   `WebAssembly.compile` or `WebAssembly.compileStreaming`. The second
  //   should be the result of using the JS 'import' API on the js file path.
  async instantiate(additionalImports, {loadDeferredWasm, loadDynamicModule} = {}) {
    let dartInstance;

    // Prints to the console
    function printToConsole(value) {
      if (typeof dartPrint == "function") {
        dartPrint(value);
        return;
      }
      if (typeof console == "object" && typeof console.log != "undefined") {
        console.log(value);
        return;
      }
      if (typeof print == "function") {
        print(value);
        return;
      }

      throw "Unable to print message: " + value;
    }

    // A special symbol attached to functions that wrap Dart functions.
    const jsWrappedDartFunctionSymbol = Symbol("JSWrappedDartFunction");

    function finalizeWrapper(dartFunction, wrapped) {
      wrapped.dartFunction = dartFunction;
      wrapped[jsWrappedDartFunctionSymbol] = true;
      return wrapped;
    }

    // Imports
    const dart2wasm = {
            _3: (o, t) => typeof o === t,
      _4: (o, c) => o instanceof c,
      _7: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._7(f,arguments.length,x0) }),
      _8: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._8(f,arguments.length,x0,x1) }),
      _9: (o, a) => o + a,
      _19: (o, a) => o == a,
      _36: () => new Array(),
      _37: x0 => new Array(x0),
      _39: x0 => x0.length,
      _41: (x0,x1) => x0[x1],
      _42: (x0,x1,x2) => { x0[x1] = x2 },
      _43: x0 => new Promise(x0),
      _45: (x0,x1,x2) => new DataView(x0,x1,x2),
      _47: x0 => new Int8Array(x0),
      _48: (x0,x1,x2) => new Uint8Array(x0,x1,x2),
      _49: x0 => new Uint8Array(x0),
      _51: x0 => new Uint8ClampedArray(x0),
      _53: x0 => new Int16Array(x0),
      _55: x0 => new Uint16Array(x0),
      _57: x0 => new Int32Array(x0),
      _59: x0 => new Uint32Array(x0),
      _61: x0 => new Float32Array(x0),
      _63: x0 => new Float64Array(x0),
      _65: (x0,x1,x2) => x0.call(x1,x2),
      _67: (x0,x1) => x0.call(x1),
      _70: (decoder, codeUnits) => decoder.decode(codeUnits),
      _71: () => new TextDecoder("utf-8", {fatal: true}),
      _72: () => new TextDecoder("utf-8", {fatal: false}),
      _73: (s) => +s,
      _74: x0 => new Uint8Array(x0),
      _75: (x0,x1,x2) => x0.set(x1,x2),
      _76: (x0,x1) => x0.transferFromImageBitmap(x1),
      _78: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._78(f,arguments.length,x0) }),
      _79: x0 => new window.FinalizationRegistry(x0),
      _80: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _81: (x0,x1) => x0.unregister(x1),
      _82: (x0,x1,x2) => x0.slice(x1,x2),
      _83: (x0,x1) => x0.decode(x1),
      _84: (x0,x1) => x0.segment(x1),
      _85: () => new TextDecoder(),
      _87: x0 => x0.click(),
      _88: x0 => x0.buffer,
      _89: x0 => x0.wasmMemory,
      _90: () => globalThis.window._flutter_skwasmInstance,
      _91: x0 => x0.rasterStartMilliseconds,
      _92: x0 => x0.rasterEndMilliseconds,
      _93: x0 => x0.imageBitmaps,
      _120: x0 => x0.remove(),
      _121: (x0,x1) => x0.append(x1),
      _122: (x0,x1,x2) => x0.insertBefore(x1,x2),
      _123: (x0,x1) => x0.querySelector(x1),
      _125: (x0,x1) => x0.removeChild(x1),
      _203: x0 => x0.stopPropagation(),
      _204: x0 => x0.preventDefault(),
      _206: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _251: x0 => x0.unlock(),
      _252: x0 => x0.getReader(),
      _253: (x0,x1,x2) => x0.addEventListener(x1,x2),
      _254: (x0,x1,x2) => x0.removeEventListener(x1,x2),
      _255: (x0,x1) => x0.item(x1),
      _256: x0 => x0.next(),
      _257: x0 => x0.now(),
      _258: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._258(f,arguments.length,x0) }),
      _259: (x0,x1) => x0.addListener(x1),
      _260: (x0,x1) => x0.removeListener(x1),
      _261: (x0,x1) => x0.matchMedia(x1),
      _268: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._268(f,arguments.length,x0) }),
      _269: (x0,x1) => x0.getModifierState(x1),
      _270: (x0,x1) => x0.removeProperty(x1),
      _271: (x0,x1) => x0.prepend(x1),
      _272: x0 => x0.disconnect(),
      _273: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._273(f,arguments.length,x0) }),
      _274: (x0,x1) => x0.getAttribute(x1),
      _275: (x0,x1) => x0.contains(x1),
      _276: x0 => x0.blur(),
      _277: x0 => x0.hasFocus(),
      _278: (x0,x1) => x0.hasAttribute(x1),
      _279: (x0,x1) => x0.getModifierState(x1),
      _280: (x0,x1) => x0.appendChild(x1),
      _281: (x0,x1) => x0.createTextNode(x1),
      _282: (x0,x1) => x0.removeAttribute(x1),
      _283: x0 => x0.getBoundingClientRect(),
      _284: (x0,x1) => x0.observe(x1),
      _285: x0 => x0.disconnect(),
      _286: (x0,x1) => x0.closest(x1),
      _696: () => globalThis.window.flutterConfiguration,
      _697: x0 => x0.assetBase,
      _703: x0 => x0.debugShowSemanticsNodes,
      _704: x0 => x0.hostElement,
      _705: x0 => x0.multiViewEnabled,
      _706: x0 => x0.nonce,
      _708: x0 => x0.fontFallbackBaseUrl,
      _712: x0 => x0.console,
      _713: x0 => x0.devicePixelRatio,
      _714: x0 => x0.document,
      _715: x0 => x0.history,
      _716: x0 => x0.innerHeight,
      _717: x0 => x0.innerWidth,
      _718: x0 => x0.location,
      _719: x0 => x0.navigator,
      _720: x0 => x0.visualViewport,
      _721: x0 => x0.performance,
      _725: (x0,x1) => x0.getComputedStyle(x1),
      _726: x0 => x0.screen,
      _727: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._727(f,arguments.length,x0) }),
      _728: (x0,x1) => x0.requestAnimationFrame(x1),
      _733: (x0,x1) => x0.warn(x1),
      _736: x0 => globalThis.parseFloat(x0),
      _737: () => globalThis.window,
      _738: () => globalThis.Intl,
      _739: () => globalThis.Symbol,
      _742: x0 => x0.clipboard,
      _743: x0 => x0.maxTouchPoints,
      _744: x0 => x0.vendor,
      _745: x0 => x0.language,
      _746: x0 => x0.platform,
      _747: x0 => x0.userAgent,
      _748: (x0,x1) => x0.vibrate(x1),
      _749: x0 => x0.languages,
      _750: x0 => x0.documentElement,
      _751: (x0,x1) => x0.querySelector(x1),
      _754: (x0,x1) => x0.createElement(x1),
      _757: (x0,x1) => x0.createEvent(x1),
      _758: x0 => x0.activeElement,
      _761: x0 => x0.head,
      _762: x0 => x0.body,
      _764: (x0,x1) => { x0.title = x1 },
      _767: x0 => x0.visibilityState,
      _768: () => globalThis.document,
      _769: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._769(f,arguments.length,x0) }),
      _770: (x0,x1) => x0.dispatchEvent(x1),
      _778: x0 => x0.target,
      _780: x0 => x0.timeStamp,
      _781: x0 => x0.type,
      _783: (x0,x1,x2,x3) => x0.initEvent(x1,x2,x3),
      _790: x0 => x0.firstChild,
      _794: x0 => x0.parentElement,
      _796: (x0,x1) => { x0.textContent = x1 },
      _797: x0 => x0.parentNode,
      _799: x0 => x0.isConnected,
      _803: x0 => x0.firstElementChild,
      _805: x0 => x0.nextElementSibling,
      _806: x0 => x0.clientHeight,
      _807: x0 => x0.clientWidth,
      _808: x0 => x0.offsetHeight,
      _809: x0 => x0.offsetWidth,
      _810: x0 => x0.id,
      _811: (x0,x1) => { x0.id = x1 },
      _814: (x0,x1) => { x0.spellcheck = x1 },
      _815: x0 => x0.tagName,
      _816: x0 => x0.style,
      _818: (x0,x1) => x0.querySelectorAll(x1),
      _819: (x0,x1,x2) => x0.setAttribute(x1,x2),
      _820: x0 => x0.tabIndex,
      _821: (x0,x1) => { x0.tabIndex = x1 },
      _822: (x0,x1) => x0.focus(x1),
      _823: x0 => x0.scrollTop,
      _824: (x0,x1) => { x0.scrollTop = x1 },
      _825: x0 => x0.scrollLeft,
      _826: (x0,x1) => { x0.scrollLeft = x1 },
      _827: x0 => x0.classList,
      _829: (x0,x1) => { x0.className = x1 },
      _831: (x0,x1) => x0.getElementsByClassName(x1),
      _832: (x0,x1) => x0.attachShadow(x1),
      _835: x0 => x0.computedStyleMap(),
      _836: (x0,x1) => x0.get(x1),
      _842: (x0,x1) => x0.getPropertyValue(x1),
      _843: (x0,x1,x2,x3) => x0.setProperty(x1,x2,x3),
      _844: x0 => x0.offsetLeft,
      _845: x0 => x0.offsetTop,
      _846: x0 => x0.offsetParent,
      _848: (x0,x1) => { x0.name = x1 },
      _849: x0 => x0.content,
      _850: (x0,x1) => { x0.content = x1 },
      _868: (x0,x1) => { x0.nonce = x1 },
      _873: (x0,x1) => { x0.width = x1 },
      _875: (x0,x1) => { x0.height = x1 },
      _878: (x0,x1) => x0.getContext(x1),
      _940: (x0,x1) => x0.fetch(x1),
      _941: x0 => x0.status,
      _943: x0 => x0.body,
      _944: x0 => x0.arrayBuffer(),
      _947: x0 => x0.read(),
      _948: x0 => x0.value,
      _949: x0 => x0.done,
      _952: x0 => x0.x,
      _953: x0 => x0.y,
      _956: x0 => x0.top,
      _957: x0 => x0.right,
      _958: x0 => x0.bottom,
      _959: x0 => x0.left,
      _971: x0 => x0.height,
      _972: x0 => x0.width,
      _973: x0 => x0.scale,
      _974: (x0,x1) => { x0.value = x1 },
      _977: (x0,x1) => { x0.placeholder = x1 },
      _979: (x0,x1) => { x0.name = x1 },
      _980: x0 => x0.selectionDirection,
      _981: x0 => x0.selectionStart,
      _982: x0 => x0.selectionEnd,
      _985: x0 => x0.value,
      _987: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _988: x0 => x0.readText(),
      _989: (x0,x1) => x0.writeText(x1),
      _991: x0 => x0.altKey,
      _992: x0 => x0.code,
      _993: x0 => x0.ctrlKey,
      _994: x0 => x0.key,
      _995: x0 => x0.keyCode,
      _996: x0 => x0.location,
      _997: x0 => x0.metaKey,
      _998: x0 => x0.repeat,
      _999: x0 => x0.shiftKey,
      _1000: x0 => x0.isComposing,
      _1002: x0 => x0.state,
      _1003: (x0,x1) => x0.go(x1),
      _1005: (x0,x1,x2,x3) => x0.pushState(x1,x2,x3),
      _1006: (x0,x1,x2,x3) => x0.replaceState(x1,x2,x3),
      _1007: x0 => x0.pathname,
      _1008: x0 => x0.search,
      _1009: x0 => x0.hash,
      _1013: x0 => x0.state,
      _1020: x0 => new MutationObserver(x0),
      _1021: (x0,x1,x2) => x0.observe(x1,x2),
      _1022: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1022(f,arguments.length,x0,x1) }),
      _1025: x0 => x0.attributeName,
      _1026: x0 => x0.type,
      _1027: x0 => x0.matches,
      _1028: x0 => x0.matches,
      _1032: x0 => x0.relatedTarget,
      _1034: x0 => x0.clientX,
      _1035: x0 => x0.clientY,
      _1036: x0 => x0.offsetX,
      _1037: x0 => x0.offsetY,
      _1040: x0 => x0.button,
      _1041: x0 => x0.buttons,
      _1042: x0 => x0.ctrlKey,
      _1046: x0 => x0.pointerId,
      _1047: x0 => x0.pointerType,
      _1048: x0 => x0.pressure,
      _1049: x0 => x0.tiltX,
      _1050: x0 => x0.tiltY,
      _1051: x0 => x0.getCoalescedEvents(),
      _1054: x0 => x0.deltaX,
      _1055: x0 => x0.deltaY,
      _1056: x0 => x0.wheelDeltaX,
      _1057: x0 => x0.wheelDeltaY,
      _1058: x0 => x0.deltaMode,
      _1065: x0 => x0.changedTouches,
      _1068: x0 => x0.clientX,
      _1069: x0 => x0.clientY,
      _1072: x0 => x0.data,
      _1075: (x0,x1) => { x0.disabled = x1 },
      _1077: (x0,x1) => { x0.type = x1 },
      _1078: (x0,x1) => { x0.max = x1 },
      _1079: (x0,x1) => { x0.min = x1 },
      _1080: x0 => x0.value,
      _1081: (x0,x1) => { x0.value = x1 },
      _1082: x0 => x0.disabled,
      _1083: (x0,x1) => { x0.disabled = x1 },
      _1085: (x0,x1) => { x0.placeholder = x1 },
      _1087: (x0,x1) => { x0.name = x1 },
      _1089: (x0,x1) => { x0.autocomplete = x1 },
      _1090: x0 => x0.selectionDirection,
      _1092: x0 => x0.selectionStart,
      _1093: x0 => x0.selectionEnd,
      _1096: (x0,x1,x2) => x0.setSelectionRange(x1,x2),
      _1097: (x0,x1) => x0.add(x1),
      _1100: (x0,x1) => { x0.noValidate = x1 },
      _1101: (x0,x1) => { x0.method = x1 },
      _1102: (x0,x1) => { x0.action = x1 },
      _1128: x0 => x0.orientation,
      _1129: x0 => x0.width,
      _1130: x0 => x0.height,
      _1131: (x0,x1) => x0.lock(x1),
      _1150: x0 => new ResizeObserver(x0),
      _1153: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1153(f,arguments.length,x0,x1) }),
      _1161: x0 => x0.length,
      _1162: x0 => x0.iterator,
      _1163: x0 => x0.Segmenter,
      _1164: x0 => x0.v8BreakIterator,
      _1165: (x0,x1) => new Intl.Segmenter(x0,x1),
      _1166: x0 => x0.done,
      _1167: x0 => x0.value,
      _1168: x0 => x0.index,
      _1172: (x0,x1) => new Intl.v8BreakIterator(x0,x1),
      _1173: (x0,x1) => x0.adoptText(x1),
      _1174: x0 => x0.first(),
      _1175: x0 => x0.next(),
      _1176: x0 => x0.current(),
      _1182: x0 => x0.hostElement,
      _1183: x0 => x0.viewConstraints,
      _1186: x0 => x0.maxHeight,
      _1187: x0 => x0.maxWidth,
      _1188: x0 => x0.minHeight,
      _1189: x0 => x0.minWidth,
      _1190: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1190(f,arguments.length,x0) }),
      _1191: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1191(f,arguments.length,x0) }),
      _1192: (x0,x1) => ({addView: x0,removeView: x1}),
      _1193: x0 => x0.loader,
      _1194: () => globalThis._flutter,
      _1195: (x0,x1) => x0.didCreateEngineInitializer(x1),
      _1196: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1196(f,arguments.length,x0) }),
      _1197: f => finalizeWrapper(f, function() { return dartInstance.exports._1197(f,arguments.length) }),
      _1198: (x0,x1) => ({initializeEngine: x0,autoStart: x1}),
      _1199: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1199(f,arguments.length,x0) }),
      _1200: x0 => ({runApp: x0}),
      _1201: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1201(f,arguments.length,x0,x1) }),
      _1202: x0 => x0.length,
      _1295: (x0,x1) => x0.getItem(x1),
      _1297: (x0,x1,x2) => x0.setItem(x1,x2),
      _1312: (x0,x1) => x0.querySelector(x1),
      _1313: (x0,x1) => x0.createElement(x1),
      _1332: Date.now,
      _1334: s => new Date(s * 1000).getTimezoneOffset() * 60,
      _1335: s => {
        if (!/^\s*[+-]?(?:Infinity|NaN|(?:\.\d+|\d+(?:\.\d*)?)(?:[eE][+-]?\d+)?)\s*$/.test(s)) {
          return NaN;
        }
        return parseFloat(s);
      },
      _1336: () => {
        let stackString = new Error().stack.toString();
        let frames = stackString.split('\n');
        let drop = 2;
        if (frames[0] === 'Error') {
            drop += 1;
        }
        return frames.slice(drop).join('\n');
      },
      _1337: () => typeof dartUseDateNowForTicks !== "undefined",
      _1338: () => 1000 * performance.now(),
      _1339: () => Date.now(),
      _1340: () => {
        // On browsers return `globalThis.location.href`
        if (globalThis.location != null) {
          return globalThis.location.href;
        }
        return null;
      },
      _1341: () => {
        return typeof process != "undefined" &&
               Object.prototype.toString.call(process) == "[object process]" &&
               process.platform == "win32"
      },
      _1342: () => new WeakMap(),
      _1343: (map, o) => map.get(o),
      _1344: (map, o, v) => map.set(o, v),
      _1345: x0 => new WeakRef(x0),
      _1346: x0 => x0.deref(),
      _1347: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1347(f,arguments.length,x0) }),
      _1348: x0 => new FinalizationRegistry(x0),
      _1349: (x0,x1,x2,x3) => x0.register(x1,x2,x3),
      _1351: (x0,x1) => x0.unregister(x1),
      _1353: () => globalThis.WeakRef,
      _1354: () => globalThis.FinalizationRegistry,
      _1356: x0 => x0.call(),
      _1357: s => JSON.stringify(s),
      _1358: s => printToConsole(s),
      _1359: (o, p, r) => o.replaceAll(p, () => r),
      _1360: (o, p, r) => o.replace(p, () => r),
      _1361: Function.prototype.call.bind(String.prototype.toLowerCase),
      _1362: s => s.toUpperCase(),
      _1363: s => s.trim(),
      _1364: s => s.trimLeft(),
      _1365: s => s.trimRight(),
      _1366: (string, times) => string.repeat(times),
      _1367: Function.prototype.call.bind(String.prototype.indexOf),
      _1368: (s, p, i) => s.lastIndexOf(p, i),
      _1369: (string, token) => string.split(token),
      _1370: Object.is,
      _1371: o => o instanceof Array,
      _1372: (a, i) => a.push(i),
      _1376: a => a.pop(),
      _1377: (a, i) => a.splice(i, 1),
      _1378: (a, s) => a.join(s),
      _1379: (a, s, e) => a.slice(s, e),
      _1382: a => a.length,
      _1383: (a, l) => a.length = l,
      _1384: (a, i) => a[i],
      _1385: (a, i, v) => a[i] = v,
      _1387: o => {
        if (o instanceof ArrayBuffer) return 0;
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
          return 1;
        }
        return 2;
      },
      _1388: (o, offsetInBytes, lengthInBytes) => {
        var dst = new ArrayBuffer(lengthInBytes);
        new Uint8Array(dst).set(new Uint8Array(o, offsetInBytes, lengthInBytes));
        return new DataView(dst);
      },
      _1389: o => o instanceof DataView,
      _1390: o => o instanceof Uint8Array,
      _1391: (o, start, length) => new Uint8Array(o.buffer, o.byteOffset + start, length),
      _1392: o => o instanceof Int8Array,
      _1393: (o, start, length) => new Int8Array(o.buffer, o.byteOffset + start, length),
      _1394: o => o instanceof Uint8ClampedArray,
      _1395: (o, start, length) => new Uint8ClampedArray(o.buffer, o.byteOffset + start, length),
      _1396: o => o instanceof Uint16Array,
      _1397: (o, start, length) => new Uint16Array(o.buffer, o.byteOffset + start, length),
      _1398: o => o instanceof Int16Array,
      _1399: (o, start, length) => new Int16Array(o.buffer, o.byteOffset + start, length),
      _1400: o => o instanceof Uint32Array,
      _1401: (o, start, length) => new Uint32Array(o.buffer, o.byteOffset + start, length),
      _1402: o => o instanceof Int32Array,
      _1403: (o, start, length) => new Int32Array(o.buffer, o.byteOffset + start, length),
      _1405: (o, start, length) => new BigInt64Array(o.buffer, o.byteOffset + start, length),
      _1406: o => o instanceof Float32Array,
      _1407: (o, start, length) => new Float32Array(o.buffer, o.byteOffset + start, length),
      _1408: o => o instanceof Float64Array,
      _1409: (o, start, length) => new Float64Array(o.buffer, o.byteOffset + start, length),
      _1410: (t, s) => t.set(s),
      _1411: l => new DataView(new ArrayBuffer(l)),
      _1412: (o) => new DataView(o.buffer, o.byteOffset, o.byteLength),
      _1413: o => o.byteLength,
      _1414: o => o.buffer,
      _1415: o => o.byteOffset,
      _1416: Function.prototype.call.bind(Object.getOwnPropertyDescriptor(DataView.prototype, 'byteLength').get),
      _1417: (b, o) => new DataView(b, o),
      _1418: (b, o, l) => new DataView(b, o, l),
      _1419: Function.prototype.call.bind(DataView.prototype.getUint8),
      _1420: Function.prototype.call.bind(DataView.prototype.setUint8),
      _1421: Function.prototype.call.bind(DataView.prototype.getInt8),
      _1422: Function.prototype.call.bind(DataView.prototype.setInt8),
      _1423: Function.prototype.call.bind(DataView.prototype.getUint16),
      _1424: Function.prototype.call.bind(DataView.prototype.setUint16),
      _1425: Function.prototype.call.bind(DataView.prototype.getInt16),
      _1426: Function.prototype.call.bind(DataView.prototype.setInt16),
      _1427: Function.prototype.call.bind(DataView.prototype.getUint32),
      _1428: Function.prototype.call.bind(DataView.prototype.setUint32),
      _1429: Function.prototype.call.bind(DataView.prototype.getInt32),
      _1430: Function.prototype.call.bind(DataView.prototype.setInt32),
      _1433: Function.prototype.call.bind(DataView.prototype.getBigInt64),
      _1434: Function.prototype.call.bind(DataView.prototype.setBigInt64),
      _1435: Function.prototype.call.bind(DataView.prototype.getFloat32),
      _1436: Function.prototype.call.bind(DataView.prototype.setFloat32),
      _1437: Function.prototype.call.bind(DataView.prototype.getFloat64),
      _1438: Function.prototype.call.bind(DataView.prototype.setFloat64),
      _1451: (ms, c) =>
      setTimeout(() => dartInstance.exports.$invokeCallback(c),ms),
      _1452: (handle) => clearTimeout(handle),
      _1453: (ms, c) =>
      setInterval(() => dartInstance.exports.$invokeCallback(c), ms),
      _1454: (handle) => clearInterval(handle),
      _1455: (c) =>
      queueMicrotask(() => dartInstance.exports.$invokeCallback(c)),
      _1456: () => Date.now(),
      _1461: o => Object.keys(o),
      _1462: (x0,x1) => x0.postMessage(x1),
      _1464: x0 => new Worker(x0),
      _1466: x0 => x0.getDirectory(),
      _1467: x0 => ({create: x0}),
      _1468: (x0,x1,x2) => x0.getFileHandle(x1,x2),
      _1469: x0 => x0.createSyncAccessHandle(),
      _1470: x0 => x0.close(),
      _1473: x0 => x0.close(),
      _1476: (x0,x1,x2) => x0.open(x1,x2),
      _1482: x0 => x0.start(),
      _1483: x0 => x0.close(),
      _1484: x0 => x0.terminate(),
      _1485: (x0,x1) => new SharedWorker(x0,x1),
      _1486: (x0,x1,x2) => x0.postMessage(x1,x2),
      _1487: (x0,x1,x2) => x0.postMessage(x1,x2),
      _1488: () => new MessageChannel(),
      _1491: x0 => x0.arrayBuffer(),
      _1494: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1494(f,arguments.length,x0) }),
      _1495: x0 => x0.continue(),
      _1496: () => globalThis.indexedDB,
      _1498: x0 => x0.sqlite3_initialize,
      _1500: (x0,x1,x2,x3,x4) => x0.sqlite3_open_v2(x1,x2,x3,x4),
      _1501: (x0,x1) => x0.sqlite3_close_v2(x1),
      _1502: (x0,x1,x2) => x0.sqlite3_extended_result_codes(x1,x2),
      _1503: (x0,x1) => x0.sqlite3_extended_errcode(x1),
      _1504: (x0,x1) => x0.sqlite3_errmsg(x1),
      _1505: (x0,x1) => x0.sqlite3_errstr(x1),
      _1506: x0 => x0.sqlite3_error_offset,
      _1510: (x0,x1) => x0.sqlite3_last_insert_rowid(x1),
      _1511: (x0,x1) => x0.sqlite3_changes(x1),
      _1512: (x0,x1,x2,x3,x4,x5) => x0.sqlite3_exec(x1,x2,x3,x4,x5),
      _1515: (x0,x1,x2,x3,x4,x5,x6) => x0.sqlite3_prepare_v3(x1,x2,x3,x4,x5,x6),
      _1516: (x0,x1) => x0.sqlite3_finalize(x1),
      _1517: (x0,x1) => x0.sqlite3_step(x1),
      _1518: (x0,x1) => x0.sqlite3_reset(x1),
      _1519: (x0,x1) => x0.sqlite3_stmt_isexplain(x1),
      _1521: (x0,x1) => x0.sqlite3_column_count(x1),
      _1522: (x0,x1) => x0.sqlite3_bind_parameter_count(x1),
      _1524: (x0,x1,x2) => x0.sqlite3_column_name(x1,x2),
      _1525: (x0,x1,x2,x3,x4,x5) => x0.sqlite3_bind_blob64(x1,x2,x3,x4,x5),
      _1526: (x0,x1,x2,x3) => x0.sqlite3_bind_double(x1,x2,x3),
      _1527: (x0,x1,x2,x3) => x0.sqlite3_bind_int64(x1,x2,x3),
      _1528: (x0,x1,x2) => x0.sqlite3_bind_null(x1,x2),
      _1529: (x0,x1,x2,x3,x4,x5) => x0.sqlite3_bind_text(x1,x2,x3,x4,x5),
      _1530: (x0,x1,x2) => x0.sqlite3_column_blob(x1,x2),
      _1531: (x0,x1,x2) => x0.sqlite3_column_double(x1,x2),
      _1532: (x0,x1,x2) => x0.sqlite3_column_int64(x1,x2),
      _1533: (x0,x1,x2) => x0.sqlite3_column_text(x1,x2),
      _1534: (x0,x1,x2) => x0.sqlite3_column_bytes(x1,x2),
      _1535: (x0,x1,x2) => x0.sqlite3_column_type(x1,x2),
      _1536: (x0,x1) => x0.sqlite3_value_blob(x1),
      _1537: (x0,x1) => x0.sqlite3_value_double(x1),
      _1538: (x0,x1) => x0.sqlite3_value_type(x1),
      _1539: (x0,x1) => x0.sqlite3_value_int64(x1),
      _1540: (x0,x1) => x0.sqlite3_value_text(x1),
      _1541: (x0,x1) => x0.sqlite3_value_bytes(x1),
      _1544: (x0,x1) => x0.sqlite3_user_data(x1),
      _1545: (x0,x1,x2,x3,x4) => x0.sqlite3_result_blob64(x1,x2,x3,x4),
      _1546: (x0,x1,x2) => x0.sqlite3_result_double(x1,x2),
      _1547: (x0,x1,x2,x3) => x0.sqlite3_result_error(x1,x2,x3),
      _1548: (x0,x1,x2) => x0.sqlite3_result_int64(x1,x2),
      _1549: (x0,x1) => x0.sqlite3_result_null(x1),
      _1550: (x0,x1,x2,x3,x4) => x0.sqlite3_result_text(x1,x2,x3,x4),
      _1551: x0 => x0.sqlite3_result_subtype,
      _1570: (x0,x1) => x0.dart_sqlite3_malloc(x1),
      _1571: (x0,x1) => x0.dart_sqlite3_free(x1),
      _1572: (x0,x1,x2,x3) => x0.dart_sqlite3_register_vfs(x1,x2,x3),
      _1573: (x0,x1,x2,x3,x4,x5) => x0.dart_sqlite3_create_scalar_function(x1,x2,x3,x4,x5),
      _1576: x0 => x0.dart_sqlite3_updates,
      _1577: x0 => x0.dart_sqlite3_commits,
      _1578: x0 => x0.dart_sqlite3_rollbacks,
      _1582: x0 => ({initial: x0}),
      _1583: x0 => new WebAssembly.Memory(x0),
      _1584: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1584(f,arguments.length,x0) }),
      _1585: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1585(f,arguments.length,x0,x1,x2,x3,x4) }),
      _1586: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1586(f,arguments.length,x0,x1,x2) }),
      _1587: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1587(f,arguments.length,x0,x1,x2,x3) }),
      _1588: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1588(f,arguments.length,x0,x1,x2,x3) }),
      _1589: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1589(f,arguments.length,x0,x1,x2) }),
      _1590: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1590(f,arguments.length,x0,x1) }),
      _1591: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1591(f,arguments.length,x0,x1) }),
      _1592: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1592(f,arguments.length,x0) }),
      _1593: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1593(f,arguments.length,x0) }),
      _1594: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1594(f,arguments.length,x0,x1,x2,x3) }),
      _1595: f => finalizeWrapper(f, function(x0,x1,x2,x3) { return dartInstance.exports._1595(f,arguments.length,x0,x1,x2,x3) }),
      _1596: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1596(f,arguments.length,x0,x1) }),
      _1597: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1597(f,arguments.length,x0,x1) }),
      _1598: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1598(f,arguments.length,x0,x1) }),
      _1599: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1599(f,arguments.length,x0,x1) }),
      _1600: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1600(f,arguments.length,x0,x1) }),
      _1601: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1601(f,arguments.length,x0,x1) }),
      _1602: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1602(f,arguments.length,x0,x1,x2) }),
      _1603: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1603(f,arguments.length,x0,x1,x2) }),
      _1604: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1604(f,arguments.length,x0,x1,x2) }),
      _1605: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1605(f,arguments.length,x0) }),
      _1606: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1606(f,arguments.length,x0) }),
      _1607: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1607(f,arguments.length,x0) }),
      _1608: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1608(f,arguments.length,x0,x1,x2,x3,x4) }),
      _1609: f => finalizeWrapper(f, function(x0,x1,x2,x3,x4) { return dartInstance.exports._1609(f,arguments.length,x0,x1,x2,x3,x4) }),
      _1610: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1610(f,arguments.length,x0) }),
      _1611: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1611(f,arguments.length,x0) }),
      _1612: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1612(f,arguments.length,x0,x1) }),
      _1613: f => finalizeWrapper(f, function(x0,x1) { return dartInstance.exports._1613(f,arguments.length,x0,x1) }),
      _1614: f => finalizeWrapper(f, function(x0,x1,x2) { return dartInstance.exports._1614(f,arguments.length,x0,x1,x2) }),
      _1616: (x0,x1,x2,x3) => x0.call(x1,x2,x3),
      _1621: x0 => new URL(x0),
      _1622: (x0,x1) => new URL(x0,x1),
      _1623: (x0,x1) => globalThis.fetch(x0,x1),
      _1625: (x0,x1) => ({i: x0,p: x1}),
      _1626: (x0,x1) => ({c: x0,r: x1}),
      _1627: x0 => x0.i,
      _1628: x0 => x0.p,
      _1629: x0 => x0.c,
      _1630: x0 => x0.r,
      _1631: x0 => new SharedArrayBuffer(x0),
      _1632: x0 => ({at: x0}),
      _1633: x0 => x0.getSize(),
      _1634: (x0,x1) => x0.truncate(x1),
      _1635: x0 => x0.flush(),
      _1638: x0 => x0.synchronizationBuffer,
      _1639: x0 => x0.communicationBuffer,
      _1640: (x0,x1,x2,x3) => ({clientVersion: x0,root: x1,synchronizationBuffer: x2,communicationBuffer: x3}),
      _1641: (x0,x1) => globalThis.IDBKeyRange.bound(x0,x1),
      _1642: x0 => ({autoIncrement: x0}),
      _1643: (x0,x1,x2) => x0.createObjectStore(x1,x2),
      _1644: x0 => ({unique: x0}),
      _1645: (x0,x1,x2,x3) => x0.createIndex(x1,x2,x3),
      _1646: (x0,x1) => x0.createObjectStore(x1),
      _1647: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1647(f,arguments.length,x0) }),
      _1648: (x0,x1,x2) => x0.transaction(x1,x2),
      _1649: (x0,x1) => x0.objectStore(x1),
      _1651: (x0,x1) => x0.index(x1),
      _1652: x0 => x0.openKeyCursor(),
      _1653: (x0,x1) => x0.getKey(x1),
      _1654: (x0,x1) => ({name: x0,length: x1}),
      _1655: (x0,x1) => x0.put(x1),
      _1656: (x0,x1) => x0.get(x1),
      _1657: (x0,x1) => x0.openCursor(x1),
      _1658: x0 => globalThis.IDBKeyRange.only(x0),
      _1659: (x0,x1,x2) => x0.put(x1,x2),
      _1660: (x0,x1) => x0.update(x1),
      _1661: (x0,x1) => x0.delete(x1),
      _1662: x0 => x0.name,
      _1663: x0 => x0.length,
      _1666: x0 => globalThis.BigInt(x0),
      _1667: x0 => globalThis.Number(x0),
      _1674: () => globalThis.navigator,
      _1675: (x0,x1) => x0.read(x1),
      _1676: (x0,x1,x2) => x0.read(x1,x2),
      _1677: (x0,x1) => x0.write(x1),
      _1678: (x0,x1,x2) => x0.write(x1,x2),
      _1679: x0 => ({create: x0}),
      _1680: (x0,x1,x2) => x0.getDirectoryHandle(x1,x2),
      _1681: x0 => new BroadcastChannel(x0),
      _1682: x0 => globalThis.Array.isArray(x0),
      _1683: (x0,x1) => x0.postMessage(x1),
      _1685: (x0,x1) => ({kind: x0,table: x1}),
      _1686: x0 => x0.kind,
      _1687: x0 => x0.table,
      _1693: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1693(f,arguments.length,x0) }),
      _1694: f => finalizeWrapper(f, function(x0) { return dartInstance.exports._1694(f,arguments.length,x0) }),
      _1695: (x0,x1,x2,x3) => x0.addEventListener(x1,x2,x3),
      _1696: (x0,x1,x2,x3) => x0.removeEventListener(x1,x2,x3),
      _1702: x0 => x0.exports,
      _1703: (x0,x1) => globalThis.WebAssembly.instantiateStreaming(x0,x1),
      _1704: x0 => x0.instance,
      _1706: x0 => x0.buffer,
      _1710: (x0,x1) => x0.key(x1),
      _1719: (s, m) => {
        try {
          return new RegExp(s, m);
        } catch (e) {
          return String(e);
        }
      },
      _1720: (x0,x1) => x0.exec(x1),
      _1721: (x0,x1) => x0.test(x1),
      _1722: x0 => x0.pop(),
      _1724: o => o === undefined,
      _1726: o => typeof o === 'function' && o[jsWrappedDartFunctionSymbol] === true,
      _1728: o => {
        const proto = Object.getPrototypeOf(o);
        return proto === Object.prototype || proto === null;
      },
      _1729: o => o instanceof RegExp,
      _1730: (l, r) => l === r,
      _1731: o => o,
      _1732: o => o,
      _1733: o => o,
      _1734: b => !!b,
      _1735: o => o.length,
      _1737: (o, i) => o[i],
      _1738: f => f.dartFunction,
      _1739: () => ({}),
      _1740: () => [],
      _1742: () => globalThis,
      _1743: (constructor, args) => {
        const factoryFunction = constructor.bind.apply(
            constructor, [null, ...args]);
        return new factoryFunction();
      },
      _1744: (o, p) => p in o,
      _1745: (o, p) => o[p],
      _1746: (o, p, v) => o[p] = v,
      _1747: (o, m, a) => o[m].apply(o, a),
      _1749: o => String(o),
      _1750: (p, s, f) => p.then(s, (e) => f(e, e === undefined)),
      _1751: o => {
        if (o === undefined) return 1;
        var type = typeof o;
        if (type === 'boolean') return 2;
        if (type === 'number') return 3;
        if (type === 'string') return 4;
        if (o instanceof Array) return 5;
        if (ArrayBuffer.isView(o)) {
          if (o instanceof Int8Array) return 6;
          if (o instanceof Uint8Array) return 7;
          if (o instanceof Uint8ClampedArray) return 8;
          if (o instanceof Int16Array) return 9;
          if (o instanceof Uint16Array) return 10;
          if (o instanceof Int32Array) return 11;
          if (o instanceof Uint32Array) return 12;
          if (o instanceof Float32Array) return 13;
          if (o instanceof Float64Array) return 14;
          if (o instanceof DataView) return 15;
        }
        if (o instanceof ArrayBuffer) return 16;
        // Feature check for `SharedArrayBuffer` before doing a type-check.
        if (globalThis.SharedArrayBuffer !== undefined &&
            o instanceof SharedArrayBuffer) {
            return 17;
        }
        return 18;
      },
      _1752: o => [o],
      _1753: (o0, o1) => [o0, o1],
      _1754: (o0, o1, o2) => [o0, o1, o2],
      _1755: (o0, o1, o2, o3) => [o0, o1, o2, o3],
      _1756: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI8ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1757: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI8ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1760: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmI32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1761: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmI32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1762: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF32ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1763: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF32ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1764: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const getValue = dartInstance.exports.$wasmF64ArrayGet;
        for (let i = 0; i < length; i++) {
          jsArray[jsArrayOffset + i] = getValue(wasmArray, wasmArrayOffset + i);
        }
      },
      _1765: (jsArray, jsArrayOffset, wasmArray, wasmArrayOffset, length) => {
        const setValue = dartInstance.exports.$wasmF64ArraySet;
        for (let i = 0; i < length; i++) {
          setValue(wasmArray, wasmArrayOffset + i, jsArray[jsArrayOffset + i]);
        }
      },
      _1766: x0 => new ArrayBuffer(x0),
      _1767: s => {
        if (/[[\]{}()*+?.\\^$|]/.test(s)) {
            s = s.replace(/[[\]{}()*+?.\\^$|]/g, '\\$&');
        }
        return s;
      },
      _1769: x0 => x0.index,
      _1770: x0 => x0.groups,
      _1771: x0 => x0.flags,
      _1772: x0 => x0.multiline,
      _1773: x0 => x0.ignoreCase,
      _1774: x0 => x0.unicode,
      _1775: x0 => x0.dotAll,
      _1776: (x0,x1) => { x0.lastIndex = x1 },
      _1777: (o, p) => p in o,
      _1778: (o, p) => o[p],
      _1779: (o, p, v) => o[p] = v,
      _1781: (x0,x1,x2) => globalThis.Atomics.wait(x0,x1,x2),
      _1783: (x0,x1,x2) => globalThis.Atomics.notify(x0,x1,x2),
      _1784: (x0,x1,x2) => globalThis.Atomics.store(x0,x1,x2),
      _1785: (x0,x1) => globalThis.Atomics.load(x0,x1),
      _1786: () => globalThis.Int32Array,
      _1788: () => globalThis.Uint8Array,
      _1790: () => globalThis.DataView,
      _1792: x0 => x0.byteLength,
      _1793: x0 => x0.random(),
      _1794: (x0,x1) => x0.getRandomValues(x1),
      _1795: () => globalThis.crypto,
      _1796: () => globalThis.Math,
      _1797: Function.prototype.call.bind(Number.prototype.toString),
      _1798: Function.prototype.call.bind(BigInt.prototype.toString),
      _1799: Function.prototype.call.bind(Number.prototype.toString),
      _1800: (d, digits) => d.toFixed(digits),
      _3681: () => globalThis.window,
      _3744: x0 => x0.navigator,
      _4008: x0 => x0.localStorage,
      _4114: x0 => x0.geolocation,
      _4117: x0 => x0.mediaDevices,
      _4119: x0 => x0.permissions,
      _4120: x0 => x0.maxTouchPoints,
      _4130: x0 => x0.platform,
      _4146: x0 => x0.storage,
      _4184: x0 => x0.data,
      _4214: x0 => x0.port1,
      _4215: x0 => x0.port2,
      _4217: (x0,x1) => { x0.onmessage = x1 },
      _4295: x0 => x0.port,
      _4330: x0 => x0.length,
      _6346: () => globalThis.document,
      _6766: (x0,x1) => { x0.id = x1 },
      _6793: x0 => x0.children,
      _10251: x0 => x0.result,
      _10252: x0 => x0.error,
      _10263: (x0,x1) => { x0.onupgradeneeded = x1 },
      _10265: x0 => x0.oldVersion,
      _10344: x0 => x0.key,
      _10345: x0 => x0.primaryKey,
      _10347: x0 => x0.value,

    };

    const baseImports = {
      dart2wasm: dart2wasm,
      Math: Math,
      Date: Date,
      Object: Object,
      Array: Array,
      Reflect: Reflect,
      S: new Proxy({}, { get(_, prop) { return prop; } }),

    };

    const jsStringPolyfill = {
      "charCodeAt": (s, i) => s.charCodeAt(i),
      "compare": (s1, s2) => {
        if (s1 < s2) return -1;
        if (s1 > s2) return 1;
        return 0;
      },
      "concat": (s1, s2) => s1 + s2,
      "equals": (s1, s2) => s1 === s2,
      "fromCharCode": (i) => String.fromCharCode(i),
      "length": (s) => s.length,
      "substring": (s, a, b) => s.substring(a, b),
      "fromCharCodeArray": (a, start, end) => {
        if (end <= start) return '';

        const read = dartInstance.exports.$wasmI16ArrayGet;
        let result = '';
        let index = start;
        const chunkLength = Math.min(end - index, 500);
        let array = new Array(chunkLength);
        while (index < end) {
          const newChunkLength = Math.min(end - index, 500);
          for (let i = 0; i < newChunkLength; i++) {
            array[i] = read(a, index++);
          }
          if (newChunkLength < chunkLength) {
            array = array.slice(0, newChunkLength);
          }
          result += String.fromCharCode(...array);
        }
        return result;
      },
      "intoCharCodeArray": (s, a, start) => {
        if (s === '') return 0;

        const write = dartInstance.exports.$wasmI16ArraySet;
        for (var i = 0; i < s.length; ++i) {
          write(a, start++, s.charCodeAt(i));
        }
        return s.length;
      },
      "test": (s) => typeof s == "string",
    };


    

    dartInstance = await WebAssembly.instantiate(this.module, {
      ...baseImports,
      ...additionalImports,
      
      "wasm:js-string": jsStringPolyfill,
    });

    return new InstantiatedApp(this, dartInstance);
  }
}

class InstantiatedApp {
  constructor(compiledApp, instantiatedModule) {
    this.compiledApp = compiledApp;
    this.instantiatedModule = instantiatedModule;
  }

  // Call the main function with the given arguments.
  invokeMain(...args) {
    this.instantiatedModule.exports.$invokeMain(args);
  }
}
