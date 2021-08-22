const Ship = (type, hull) => {
  return {
    type: type,
    hull: [...hull],
    hits: [],
    hit: function (position) {
      this.hits.push(position);
    },
    isSunk: function () {
      if (this.hull.length === this.hits.length) {
        return true;
      } else return false;
    },
  };
};
export default Ship;
