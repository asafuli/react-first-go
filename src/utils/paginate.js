import _ from 'lodash'

export function paginate(items, currPage, pageSize){
  const startingIndex = (currPage - 1) * pageSize;
  return _(items).slice(startingIndex).take(pageSize).value();
}