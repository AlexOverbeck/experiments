import { helper } from '@ember/component/helper';

function eq([a, b]) {
  return a === b;
}

export default helper(eq);