export const selectAll = (list: any, key = "id") =>
  list.map((item: any) => item[key]);

export const selectOne = (selected: any, id: number) => {
  const selectedIndex = selected.indexOf(id);
  let newSelected: number[] = [];

  //-1 if not found , add to selected
  if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, id);

  } else if (selectedIndex === 0) {
    //if found at first index, remove from selected
    newSelected = newSelected.concat(selected.slice(1));

  } else if (selectedIndex === selected.length - 1) {
    // If the item is the last one, remove it from the list
    newSelected = newSelected.concat(selected.slice(0, -1));
  } else if (selectedIndex > 0) {
    // If the item is in the middle, remove it from the list
    newSelected = newSelected.concat(
      selected.slice(0, selectedIndex),
      selected.slice(selectedIndex + 1)
    );
  }

  return newSelected;
};
