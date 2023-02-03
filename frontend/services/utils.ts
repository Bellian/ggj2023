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
