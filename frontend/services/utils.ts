export const betterAddEventListener = <K extends keyof WindowEventMap>(
  type: K,
  listener: (this: Window, ev: WindowEventMap[K]) => any,
  scope = window as any,
  options?: AddEventListenerOptions
): Function => {
  const controller = new AbortController();
  scope.addEventListener(type, listener, {
    capture: true,
    passive: true,
    signal: controller.signal,
    ...options,
  });
  return () => {
    controller.abort();
  };
};

export const execFuncArray = (funcArray: Array<Function>) => {
  funcArray.forEach((func) => func());
};

export const getImageSize = (name, cb) => {
  const spriteImage = new Image();
  spriteImage.src = `/sprites/${name}.png`;
  const loadSpriteImageEvent = betterAddEventListener(
    'load',
    (event) => {
      cb(spriteImage.naturalWidth, spriteImage.naturalHeight);
    },
    spriteImage
  );
  return loadSpriteImageEvent;
};

// https://stackoverflow.com/a/30800715/4563136
export const downloadObjectAsJson = (exportObj, exportName) => {
  var dataStr =
    'data:text/json;charset=utf-8,' +
    encodeURIComponent(JSON.stringify(exportObj));
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
