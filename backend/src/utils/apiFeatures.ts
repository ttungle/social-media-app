class APIFeatures {
    public query: any;
    protected queryString: any;

    constructor (query: any, queryString: any) {
        this.query = query;
        this.queryString = queryString;
    }

    public paginate() {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.pageSize * 1 || 50;
        const skip = limit * (page - 1);

        this.query.skip(skip).limit(limit);

        return this;
    }
}

export default APIFeatures;