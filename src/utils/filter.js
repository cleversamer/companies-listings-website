const urlSearchParams = new URLSearchParams(location.search);

export const page = urlSearchParams.get("page");
export const limit = urlSearchParams.get("limit");
export const searchBy = urlSearchParams.get("searchBy");
export const searchValue = urlSearchParams.get("searchValue");
export const orderBy = urlSearchParams.get("orderBy");
export const sort = urlSearchParams.get("sort");
