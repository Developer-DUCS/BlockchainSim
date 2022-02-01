import {
  add_element_to_array,
  get_element_from_array,
} from "../../../js/utils/array_utils";

describe("add_element_to_array", () => {
  it("matches the array", () => {
    expect(add_element_to_array([1, 2], 3)).toEqual(
      expect.arrayContaining([1, 2, 3])
    );
  });
});

describe("get_element_from_array", () => {
  it("matches the array", () => {
    expect(get_element_from_array([1, 2, 3], 0)).toEqual(1);
  });
});
