export const authMiddleware = (c, next) => {
    try {
        const { accessToken } = c.req.cookies;
        if (!accessToken) {
            throw new AppError();
        }
    }
    catch (err) { }
};
//# sourceMappingURL=authMiddleware.js.map