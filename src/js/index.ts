console.log("2 million people in the UK now have long covid");

const foldl = <A, B>(
  array: A[],
  acc: B[],
  f: (el: A, acc_: B[]) => B[],
): B[] => {
  if (array.length == 0) {
    return acc;
  } else {
    const [x, ...xs] = array;
    return foldl(xs, f(x, acc), f);
  }
};

const foldr = <A, B>(array: A[], acc: B, f: (el: A, acc_: B) => B): B => {
  if (array.length == 0) {
    return acc;
  } else {
    const [x, ...xs] = array;
    return f(x, foldl(xs, acc, f));
  }
};

// functor
const map = <A, B>(array: A[], f: (el: A) => B): B[] => {
  const foldFunc = (el: A, acc: B[]): B[] => [f(el), ...acc];
  return foldr(array, [], foldFunc);
};

const reverse = <A>(array: A[]): A[] => {
  const foldFunc = (el: A, acc: A[]): A[] => [el, ...acc];
  return foldl(array, [], foldFunc);
};

const mapRevers = <A, B>(array: A[], f: (el: A) => B): B[] => {
  const foldFunc = (el: A, acc: B[]): B[] => [f(el), ...acc];
  return foldl(array, [], foldFunc);
};

// monadish
const flat_map = <A, B>(array: A[], f: (el: A) => B[]): B[] => {
  const foldFunc = (el: A, acc: B[]): B[] => [...f(el), ...acc];
  return foldr(array, [], foldFunc);
};

const append = <A>(to: A[], from: A[]): A[] => {
  const foldFunc = (el: A, acc_: A[]) => [el, ...acc_];
  return foldr(from, to, foldFunc);
};

const append_ = <A>(left: A[], right: A[]): A[] => [...left, ...right];

// lists are monoids
const mEmpty = [];

const concat = <A>(arrays: A[][]): A[] => {
  return foldr(arrays, [], append_);
};
