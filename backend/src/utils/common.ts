export function calculateMetaData (queryString: any, totalCount: number) {
    return {
        page: queryString?.page * 1 || 1,
        pageSize: queryString?.pageSize * 1 || 50,
        total: totalCount || 0
      };
}