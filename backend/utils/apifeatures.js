class ApiFeatures {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
    this.countExecuted = false; // Flag to track if count query has been executed
  }

  search() {
    

    const keyword = this.queryStr.keyword
      ? {
          name: {
            $regex: this.queryStr.keyword,
            $options: "i",
          },
        }
      : {};

    this.query = this.query.find({ ...keyword });
    return this;
  }

  filter() {
    
    const queryCopy = { ...this.queryStr };
    // Removing some fields for category
    const removeFields = ["keyword", "page", "limit"];

    removeFields.forEach((key) => delete queryCopy[key]);

    // Filter For Price and Rating

    let queryStr = JSON.stringify(queryCopy);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key) => `$${key}`);

    this.query = this.query.find(JSON.parse(queryStr));

    return this;
  }

  pagination(resultPerPage) {
    

    const currentPage = Number(this.queryStr.page) || 1;

    const skip = resultPerPage * (currentPage - 1);

    this.query = this.query.skip(skip).limit(resultPerPage);

    return this;
  }

  async countDocuments() {
    if (this.countExecuted) {
      return this; // Query has been executed, return instance
    }

    this.count = await this.query.countDocuments();
    this.countExecuted = true; // Set the flag to true after executing count query

    return this;
  }
}

module.exports = ApiFeatures;