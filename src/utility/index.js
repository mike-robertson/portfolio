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
