export const calculateRelativeXY = ({ clientX, clientY, target }) => {
  const bounds = target.getBoundingClientRect();
  const x = Math.floor(clientX - bounds.left);
  const y = Math.floor(clientY - bounds.top);
  // let x = clientX + document.body.scrollLeft;
  // let y = clientY + document.body.scrollTop;
  //
  // if (currentTarget.offsetParent) {
  //   let off = currentTarget.offsetParent;
  //
  //   do {
  //     x -= off.offsetLeft;
  //     y -= off.offsetTop;
  //     off = off.offsetParent;
  //   } while (off);
  // }

  return { x, y };
};

export const getDistanceFromBottom = ({ clientY }) =>
  Math.floor(document.documentElement.clientHeight - clientY);

export const debounce = (func, wait) => {
  let timeout = null;
  return (...args) => {
    if (timeout === null) {
      if (timeout === null) {
        func(...args);
      }
      timeout = setTimeout(() => {
        timeout = null;
      }, wait);
    }
  };
};


export const blendColor = (
  { red: r1, green: g1, blue: b1, alpha: a1 = 1 },
  { red: r2, green: g2, blue: b2, alpha: a2 = 1 },
  percent,
) => {
  return ({
    red: Math.floor(((r2 - r1) * percent) + r1),
    green: Math.floor(((g2 - g1) * percent) + g1),
    blue: Math.floor(((b2 - b1) * percent) + b1),
    alpha: ((a2 - a1) * percent) + a1,
  });
};

export const objectifyRGB = (rgbString) => {
  // console.log(rgbString);
  // console.log(rgbString.replace(/\s/g, '').match(/rgba?\(([0-9]+),([0-9]+),([0-9]+),?([0-9]+?\.?[0-9]+?)?\)/));
  const [, red, green, blue, alpha = 1] = rgbString
    .replace(/\s/g, '')
    .match(/rgba?\(([0-9]+),([0-9]+),([0-9]+),?([0-9]?\.?[0-9]+)?\)/);

  return {
    red: Number(red),
    green: Number(green),
    blue: Number(blue),
    alpha: Number(alpha),
  };
};

export const stringifyRGB = ({ red, green, blue, alpha = 1 }) =>
  `rgba(${red},${green},${blue},${alpha})`;
