
export const getUser = (req: any, res: any, next: any) => {
    res.status(200).json({
        status: 'success',
        data: {
            id: 1,
            name: 'Tung Le',
            email: 'ltt@gmail.com'
        }
    });
};
