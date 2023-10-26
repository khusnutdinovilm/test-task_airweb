function isWebp() {
  function isWebPSupported() {
    const elem = document.createElement("canvas");

    return elem.getContext && elem.getContext("2d")
      ? elem.toDataURL("image/webp").indexOf("data:image/webp") === 0
      : false;
  }

  let className = isWebPSupported() ? "webp" : "no-webp";
  document.documentElement.classList.add(className);
}

isWebp();
