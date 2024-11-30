import InvalidData from "../errors/InvalidData.js";

async function pagination(req, res, next) {
  try {
    let { itemPerPage = 5, page = 1, sorting = "_id:-1" } = req.query;
    let [sortingField, sort] = sorting.split(":");

    itemPerPage = parseInt(itemPerPage);
    page = parseInt(page);
    sort = parseInt(sort);

    const result = req.result;

    if (itemPerPage > 0 && page > 0) {
      const paginationResult = await result
        .find({})
        .sort({ [sortingField]: sort })
        .skip(itemPerPage * (page - 1))
        .limit(itemPerPage);
      res.status(200).json(paginationResult);
    } else {
      next(new InvalidData());
    }
  } catch (error) {
    next(error);
  }
}

export default pagination;
